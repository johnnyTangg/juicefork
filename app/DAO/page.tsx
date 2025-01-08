"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { IToken } from "../Data/Tokens";
import { useWeb3Modal, useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract, formatUnits, parseUnits, JsonRpcProvider, EventLog } from "ethers"
import { getTokenInfo } from "../API/ERC20Helpers";
import { useDao } from "../../context/DAO";
import TradingViewWidget from "../../components/TradingViewWidget.jsx";
import { contracts } from "../Data/Contracts";
import { chains } from "../Data/Chains";
import YieldBondingCurveABI from '../abis/YieldBondingCurve.json';

interface PriceDataPoint {
  x: number;
  o: number;
  h: number;
  l: number;
  c: number;
}

const DAO = () => {
  const [isClient, setIsClient] = useState(false);
  const [buyOrSell, setBuyOrSell] = useState(true);
  const [tokenInfo, setTokenInfo] = useState<IToken | null>(null);
  const [symbol, setSymbol] = useState("ETHUSD");
  const [inputAmount, setInputAmount] = useState("");
  const [outputAmount, setOutputAmount] = useState("0");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [bondingCurveAddress, setBondingCurveAddress] = useState("");
  const [ethBalance, setEthBalance] = useState("0");
  const [tokenBalance, setTokenBalance] = useState("0");
  const [maxPurchase, setMaxPurchase] = useState("0");
  const [targetRaise, setTargetRaise] = useState("0");
  const [raisedAmount, setRaisedAmount] = useState("0");
  const [priceData, setPriceData] = useState<PriceDataPoint[]>([]);
  const [marketCap, setMarketCap] = useState("0");

  const { walletProvider } = useWeb3ModalProvider()
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { selectedDao, setSelectedDao } = useDao();

  const updateBalances = async () => {
    if (!address || !walletProvider || !chainId || !bondingCurveAddress) return;

    try {
      // Get ETH balance
      const balance = await walletProvider.request({
        method: 'eth_getBalance',
        params: [address]
      });
      setEthBalance(formatUnits(balance as string, 18));

      // Get token balance from bonding curve contract
      const provider = new JsonRpcProvider(chains[chainId].rpc[0]);
      const curveContract = new Contract(bondingCurveAddress, YieldBondingCurveABI, provider);
      const balance2 = await curveContract.balanceOf(address);
      setTokenBalance(formatUnits(balance2, 18));
    } catch (error) {
      console.error("Error fetching balances:", error);
    }
  };

  const updateContractInfo = async () => {
    if (!bondingCurveAddress || !chainId) return;

    try {
      const provider = new JsonRpcProvider(chains[chainId].rpc[0]);
      const curveContract = new Contract(bondingCurveAddress, YieldBondingCurveABI, provider);
      
      const [maxPurchaseAmount, targetRaiseAmount, raisedAmountValue] = await Promise.all([
        curveContract.maxPurchase(),
        curveContract.targetRaise(),
        curveContract.totalRaised()
      ]);

      setMaxPurchase(maxPurchaseAmount.toString());
      setTargetRaise(targetRaiseAmount.toString());
      setRaisedAmount(raisedAmountValue.toString());

      console.log("Max Purchase:", formatUnits(maxPurchaseAmount, 18));
      console.log("Target Raise:", formatUnits(targetRaiseAmount, 18));
      console.log("Total Raised:", formatUnits(raisedAmountValue, 18));
    } catch (error) {
      console.error("Error fetching contract info:", error);
      setError("Failed to fetch contract info");
    }
  };

  const tryRpcUrls = async (chainId: number, attempt: number = 0): Promise<JsonRpcProvider> => {
    const rpcUrls = chains[chainId].rpc;
    if (attempt >= rpcUrls.length) {
      throw new Error("All RPC URLs failed");
    }
    
    try {
      const provider = new JsonRpcProvider(rpcUrls[attempt]);
      // Test the provider with a simple call
      await provider.getBlockNumber();
      return provider;
    } catch (error) {
      console.log(`RPC URL ${rpcUrls[attempt]} failed, trying next one...`);
      return tryRpcUrls(chainId, attempt + 1);
    }
  };

  const calculatePricePoints = async () => {
    if (!bondingCurveAddress || !chainId) return;

    try {
      const provider = await tryRpcUrls(chainId);
      const curveContract = new Contract(bondingCurveAddress, YieldBondingCurveABI, provider);
      
      // Get token contract
      const tokenAddress = await curveContract.claimToken();
      const tokenContract = new Contract(
        tokenAddress,
        [
          "function totalSupply() view returns (uint256)",
          "function decimals() view returns (uint8)"
        ],
        provider
      );
      
      // Get ETH price in USD
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const data = await response.json();
      const ethPrice = data.ethereum.usd;

      // Get Purchase and Sell events
      const filter = curveContract.filters.Purchase();
      const sellFilter = curveContract.filters.Sell();
      const events = await curveContract.queryFilter(filter);
      const sellEvents = await curveContract.queryFilter(sellFilter);
      
      // Combine and sort events by block number
      const allEvents = [...events, ...sellEvents].sort((a, b) => b.blockNumber - a.blockNumber);
      
      if (allEvents.length === 0) {
        // If no events, calculate theoretical points
        const targetRaise = await curveContract.targetRaise();
        const points: PriceDataPoint[] = [];
        const numPoints = 100;
        const now = Math.floor(Date.now() / 1000); // Convert to seconds for consistency
        const [totalSupply, decimals] = await Promise.all([
          tokenContract.totalSupply(),
          tokenContract.decimals()
        ]);
        
        for (let i = 0; i <= numPoints; i++) {
          const ethAmount = (BigInt(targetRaise) * BigInt(i)) / BigInt(numPoints);
          const price = await curveContract.getCurrentPrice();
          const priceInUsd = Number(formatUnits(price, 18)) * ethPrice;
          const marketCap = Number(formatUnits(totalSupply, decimals)) * priceInUsd;
          
          points.push({
            x: (now - (numPoints - i) * 60) * 1000, // Convert to ms after calculation
            o: marketCap,
            h: marketCap * 1.01,
            l: marketCap * 0.99,
            c: marketCap
          });
        }
        
        setPriceData(points);
      } else {
        // Use actual event data
        const points: PriceDataPoint[] = [];
        let lastMarketCap = 0;
        
        // Get block timestamps for all events
        const timestamps = await Promise.all(
          allEvents.map(event => provider.getBlock(event.blockNumber))
        );
        
        const [totalSupply, decimals] = await Promise.all([
          tokenContract.totalSupply(),
          tokenContract.decimals()
        ]);
        
        // Process events in chronological order (oldest first)
        let lastTimestamp = 0;
        let sameTimestampOffset = 0;
        
        for (let i = allEvents.length - 1; i >= 0; i--) {
          const eventLog = allEvents[i] as EventLog;
          const price = Number(formatUnits(eventLog.args?.[3], 18)); // price from event
          let timestamp = timestamps[i]?.timestamp || 0;
          
          // Handle multiple events in the same block
          if (timestamp === lastTimestamp) {
            sameTimestampOffset += 1;
          } else {
            sameTimestampOffset = 0;
            lastTimestamp = timestamp;
          }
          
          // Add offset to ensure unique timestamps
          timestamp = timestamp + sameTimestampOffset;
          
          const priceInUsd = price * ethPrice;
          const marketCap = Number(formatUnits(totalSupply, decimals)) * priceInUsd;
          
          points.push({
            x: timestamp * 1000, // Convert to milliseconds
            o: lastMarketCap || marketCap,
            h: Math.max(lastMarketCap || marketCap, marketCap),
            l: Math.min(lastMarketCap || marketCap, marketCap),
            c: marketCap
          });
          lastMarketCap = marketCap;
        }
        
        // Add current time point if there are events
        const currentPrice = await curveContract.getCurrentPrice();
        const currentPriceUsd = Number(formatUnits(currentPrice, 18)) * ethPrice;
        const currentMarketCap = Number(formatUnits(totalSupply, decimals)) * currentPriceUsd;
        
        const currentTime = Math.floor(Date.now() / 1000);
        points.push({
          x: (currentTime + sameTimestampOffset + 1) * 1000, // Ensure it's after any events
          o: lastMarketCap,
          h: Math.max(lastMarketCap, currentMarketCap),
          l: Math.min(lastMarketCap, currentMarketCap),
          c: currentMarketCap
        });
        
        // No need to reverse since we processed in chronological order
        setPriceData(points);
      }
    } catch (error) {
      console.error("Error calculating price points from events:", error);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchQueryParam = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const myParam = urlParams.get('ca');
      if (myParam) setBondingCurveAddress(myParam);
    };

    const fetchTokenInfo = async () => {
      if (!bondingCurveAddress || !chainId) return;
      
      try {
        const provider = new JsonRpcProvider(chains[chainId].rpc[0]);
        const curveContract = new Contract(bondingCurveAddress, YieldBondingCurveABI, provider);
        const claimTokenAddress = await curveContract.claimToken();
        setTokenInfo(await getTokenInfo(claimTokenAddress, chainId, address ?? ""));
      } catch (error) {
        console.error("Error fetching token info:", error);
        setError("Failed to fetch token info");
      }
    }

    fetchQueryParam();
    if(selectedDao && selectedDao.OHM){
      setTokenInfo(selectedDao.OHM);
    }
    else{
      fetchTokenInfo();
    }
    updateBalances();
    updateContractInfo();
    calculatePricePoints();
    updateMarketCap();

    // Set up polling for events
    if (bondingCurveAddress && chainId) {
      let lastBlock = 0;
      const pollEvents = async () => {
        try {
          const provider = new JsonRpcProvider(chains[chainId].rpc[0]);
          const curveContract = new Contract(bondingCurveAddress, YieldBondingCurveABI, provider);
          
          const currentBlock = await provider.getBlockNumber();
          if (lastBlock === 0) {
            lastBlock = currentBlock - 1;
          }

          // Get Purchase and Sell events
          const [purchaseEvents, sellEvents] = await Promise.all([
            curveContract.queryFilter(curveContract.filters.Purchase(), lastBlock + 1, currentBlock),
            curveContract.queryFilter(curveContract.filters.Sell(), lastBlock + 1, currentBlock)
          ]);

          // Process events
          if (purchaseEvents.length > 0 || sellEvents.length > 0) {
            const raised = await curveContract.totalRaised();
            setRaisedAmount(raised.toString());
            
            // Update price data and chart
            await calculatePricePoints();
            updateMarketCap();
            updateBalances();
          }

          lastBlock = currentBlock;
        } catch (error) {
          console.error("Error polling events:", error);
        }
      };

      const intervalId = setInterval(pollEvents, 3000); // Poll every 3 seconds

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [address, chainId, bondingCurveAddress]);

  // Also update balances after a successful swap
  useEffect(() => {
    if (!loading) {
      updateBalances();
    }
  }, [loading]);

  const handleInputChange = async (value: string) => {
    try {
      setInputAmount(value);
      if (!value || isNaN(Number(value))) {
        setOutputAmount("0");
        return;
      }

      if (!bondingCurveAddress || !chainId) return;

      const provider = new JsonRpcProvider(chains[chainId].rpc[0]);
      const curveContract = new Contract(bondingCurveAddress, YieldBondingCurveABI, provider);

      if (buyOrSell) {
        // Buy - input is ETH
        if (Number(value) > Number(formatUnits(maxPurchase, 18))) {
          setError("Amount exceeds max purchase");
          setOutputAmount("0");
          return;
        }
        try {
          const [tokenAmount] = await curveContract.calculatePurchase(parseUnits(value, 18));
          setOutputAmount(formatUnits(tokenAmount, 18));
          setError("");
        } catch (error) {
          console.error("Error calculating purchase output:", error);
          setError("Error calculating purchase amount");
          setOutputAmount("0");
        }
      } else {
        // Sell - input is token
        try {
          console.log("Calculating sell amount for:", value, "tokens");
          const parsedAmount = parseUnits(value, 18);
          console.log("Parsed amount:", parsedAmount.toString());
          
          // Check token balance
          const tokenBalance = await curveContract.balanceOf(address);
          console.log("Token balance:", formatUnits(tokenBalance, 18));
          if (parsedAmount > tokenBalance) {
            setError("Insufficient token balance");
            setOutputAmount("0");
            return;
          }

          const [ethAmount] = await curveContract.calculateSell(parsedAmount);
          console.log("Calculated ETH amount:", formatUnits(ethAmount, 18));
          setOutputAmount(formatUnits(ethAmount, 18));
          setError("");
        } catch (error) {
          console.error("Error calculating sell output:", error);
          if (error instanceof Error) {
            setError(`Error calculating sell amount: ${error.message}`);
          } else {
            setError("Error calculating sell amount");
          }
          setOutputAmount("0");
        }
      }
    } catch (error) {
      console.error("Error in handleInputChange:", error);
      setError("Error calculating output amount");
      setOutputAmount("0");
    }
  };

  const handlePercentageClick = (percentage: number) => {
    if (!isConnected) return;
    
    const balance = buyOrSell ? ethBalance : tokenBalance;
    const maxAmount = buyOrSell ? formatUnits(maxPurchase, 18) : balance;
    
    const amount = (Number(maxAmount) * percentage / 100).toFixed(18);
    handleInputChange(amount);
  };

  const handleSwap = async () => {
    try {
      setError("");
      setLoading(true);

      if (!isConnected) {
        setError("Please connect your wallet");
        return;
      }
      if (!chainId) {
        setError("Chain ID not available");
        return;
      }
      if (!bondingCurveAddress) {
        setError("Bonding curve address not available");
        return;
      }
      if (!inputAmount) {
        setError("Please enter an amount");
        return;
      }
      if (!walletProvider) {
        setError("Wallet provider not available");
        return;
      }

      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const curveContract = new Contract(
        bondingCurveAddress,
        YieldBondingCurveABI,
        signer
      );

      const parsedAmount = parseUnits(inputAmount, 18);
      let tx;
      
      if (buyOrSell) {
        // Buy tokens
        tx = await curveContract.purchase({ value: parsedAmount });
      } else {
        // Sell tokens
        tx = await curveContract.sell(parsedAmount);
      }

      await tx.wait();
      setInputAmount("");
      setOutputAmount("0");
      
    } catch (error) {
      console.error("Swap error:", error);
      setError("Failed to execute swap");
    } finally {
      setLoading(false);
    }
  };

  const updateMarketCap = async () => {
    if (!bondingCurveAddress || !chainId) return;

    try {
      const provider = new JsonRpcProvider(chains[chainId].rpc[0]);
      const curveContract = new Contract(bondingCurveAddress, YieldBondingCurveABI, provider);
      
      // Get token address and current price
      const [tokenAddress, priceInEth] = await Promise.all([
        curveContract.claimToken(),
        curveContract.getCurrentPrice()
      ]);

      // Get total supply from token contract
      const tokenContract = new Contract(
        tokenAddress,
        [
          "function totalSupply() view returns (uint256)",
          "function decimals() view returns (uint8)"
        ],
        provider
      );
      const [totalSupply, decimals] = await Promise.all([
        tokenContract.totalSupply(),
        tokenContract.decimals()
      ]);
      
      let ethPrice = 2000; // Fallback ETH price in USD
      try {
        // Try to get ETH price from CoinGecko with retries
        for (let i = 0; i < 3; i++) {
          try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd', {
              headers: {
                'Accept': 'application/json',
              }
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            ethPrice = data.ethereum.usd;
            break;
          } catch (e) {
            if (i === 2) console.warn("Failed to fetch ETH price, using fallback price:", e);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
          }
        }
      } catch (e) {
        console.warn("Using fallback ETH price due to API error:", e);
      }
      
      // Calculate market cap in USD
      const priceInUsd = Number(formatUnits(priceInEth, 18)) * ethPrice;
      const marketCapUsd = Number(formatUnits(totalSupply, decimals)) * priceInUsd;

      setMarketCap(marketCapUsd.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }));
    } catch (error) {
      console.error("Error calculating market cap:", error);
      setMarketCap("TBD");
    }
  };

  // Update market cap after successful swap
  useEffect(() => {
    if (!loading) {
      updateMarketCap();
    }
  }, [loading]);

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-normal 2xl:justify-between gap-5 text-white mt-12 mb-28">
      <div className="w-full lg:w-[67%]">
        <div className="flex items-end flex-wrap gap-10">
          <h5 className="text-[46px] leading-none">
            {tokenInfo?.name || ""}
            <span className="text-xl translate-x-[10px] -translate-y-[24px] inline-block ">
              ({tokenInfo?.symbol || ""})
            </span>
          </h5>
          <p className="text-[11px] 2xl:text-xl">Market cap: {marketCap}</p>
          <p className="text-[11px] 2xl:text-xl">
            CA: {tokenInfo?.address || "???"}
          </p>
        </div>

        <div className="h-[500px] overflow-hidden mt-2 bg-[#0D0E17] p-4 rounded-lg">
          {!isClient ? (
            <div className="w-full h-full flex items-center justify-center">
              Loading...
            </div>
          ) : BigInt(raisedAmount) >= BigInt(targetRaise) ? (
            <div className="w-full h-full flex items-center justify-center">
              <h3 className="text-2xl text-white">Migration in Progress</h3>
            </div>
          ) : priceData.length > 0 ? (
            <div className="w-full h-full">
              <TradingViewWidget 
                symbol={tokenInfo?.symbol || "TOKEN"} 
                data={priceData}
                theme="dark"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              Calculating price curve...
            </div>
          )}
        </div>

        <div className="flex justify-between mt-4 mb-4 text-sm bg-[#0D0E17] p-4 rounded-lg">
          <div>Target Raise: {Number(formatUnits(targetRaise, 18)).toFixed(5)} ETH</div>
          <div>Raised: {Number(formatUnits(raisedAmount, 18)).toFixed(5)} ETH</div>
        </div>

        <div className="text-base 2xl:text-2xl font-bold flex justify-center gap-1 mb-8">
          <Link href={`/GENESISPOOL?ca=${bondingCurveAddress}`}>[claim {tokenInfo?.symbol || ""}]</Link>
        </div>

        <div className="flex items-center gap-5">
          <img src="/images/image1.png" alt="" />
          <div className="text-sm 2xl:text-2xl">
            <p className="mb-2">about</p>
            <p>
              Welcome to the S&P6900, an advanced blockchain cryptography token
              with limitless possibilities and scientific utilization.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[32%]">
        <div className="flex items-end justify-between text-sm 2xl:text-xl mb-1">
          <p>trade</p>
          <p>next rebase in TBD</p>
        </div>

        <div className="border p-3 2xl:p-8 rounded-[6px] bg-[#0D0E17]">
          {BigInt(raisedAmount) >= BigInt(targetRaise) ? (
            <div className="text-center py-20">
              <h3 className="text-2xl text-white mb-2">Migration in Progress</h3>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 mb-14">
                <button
                  className={`h-10 2xl:h-16 ${
                    buyOrSell ? "bg-[#999999]" : "bg-[#0F1013] border"
                  } relative rounded`}
                  onClick={() => setBuyOrSell(true)}
                >
                  <span
                    className={`${
                      buyOrSell
                        ? "bg-white text-black "
                        : "bg-[#0F1013] text-white border"
                    } absolute top-0 right-0 left-0 h-8 2xl:h-12 flex items-center justify-center rounded text-lg 2xl:text-2xl`}
                  >
                    BUY
                  </span>
                </button>
                <button
                  className={`h-10 2xl:h-16 ${
                    !buyOrSell ? "bg-[#999999]" : "bg-[#0F1013] border"
                  } relative rounded`}
                  onClick={() => setBuyOrSell(false)}
                >
                  <span
                    className={`${
                      !buyOrSell
                        ? "bg-white text-black "
                        : "bg-[#0F1013] text-white border"
                    } absolute top-0 right-0 left-0 h-8 2xl:h-12 flex items-center justify-center rounded text-lg 2xl:text-2xl`}
                  >
                    SELL
                  </span>
                </button>
              </div>

              <div className="flex justify-between mb-4 text-sm">
                <div>Balance: {Number(ethBalance).toFixed(5)} ETH</div>
                <div>Balance: {Number(tokenBalance).toFixed(5)} {tokenInfo?.symbol || ""}</div>
              </div>

              {buyOrSell && (
                <div className="text-sm text-center mb-4">
                  Max Purchase: {Number(formatUnits(maxPurchase, 18)).toFixed(5)} ETH
                </div>
              )}

              <div className="relative">
                <input
                  className="w-full bg-[#ffffff10] h-[35px] 2xl:h-14 border rounded-[6px] pl-2 pr-16 text-base 2xl:text-2xl"
                  type="text"
                  value={inputAmount}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={"0.0"}
                />
                <button className="flex items-center gap-1 absolute top-0 bottom-0 my-auto right-2 text-base 2xl:text-xl">
                  {buyOrSell ? "ETH" : tokenInfo?.symbol || ""}
                  <img src="/images/eth.png" className="w-[21px]" alt="" />
                </button>
              </div>

              <div className="text-[10px] 2xl:text-2xl flex gap-5 mt-2 2xl:mt-4">
                <button onClick={() => handlePercentageClick(25)} className="underline">25%</button>
                <button onClick={() => handlePercentageClick(50)} className="underline">50%</button>
                <button onClick={() => handlePercentageClick(75)} className="underline">75%</button>
                <button onClick={() => handlePercentageClick(100)} className="underline">100%</button>
              </div>

              <p className="text-[10px] 2xl:text-xl mt-2 2xl:mt-4 mb-9">
                You will receive {Number(outputAmount).toFixed(5)} {buyOrSell ? tokenInfo?.symbol : "ETH"}
              </p>

              {error && (
                <div className="text-red-500 text-sm mb-4 text-center">
                  {error}
                </div>
              )}

              <button 
                onClick={handleSwap}
                disabled={loading || !isConnected}
                className="w-[90%] flex justify-center mx-auto mb-5 h-10 2xl:h-16 bg-[#999999] relative rounded"
              >
                <span className="bg-white text-black absolute top-0 right-0 left-0 h-8 2xl:h-12 flex items-center justify-center rounded text-lg 2xl:text-2xl">
                  {loading ? "Loading..." : isConnected ? "SWAP" : "CONNECT WALLET"}
                </span>
              </button>
            </>
          )}
        </div>

        <div className="text-base 2xl:text-2xl font-bold flex justify-center gap-1 mt-2 2xl:mt-4">
          <Link href={`/BOND?ca=${bondingCurveAddress}`}>[bond {tokenInfo?.symbol || ""}]</Link>
          <Link href={`/STAKE?ca=${bondingCurveAddress}`}>[stake {tokenInfo?.symbol || ""}]</Link>
          <p className="text-[#818181]">[trade {tokenInfo?.symbol || ""}]</p>
        </div>
      </div>
    </div>
  );
};

export default DAO;
