"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { IToken } from "../Data/Tokens";
import { useWeb3Modal, useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract, formatUnits, parseUnits, JsonRpcProvider, EventLog, Interface, ethers } from "ethers"
import { getTokenInfo } from "../API/ERC20Helpers";
import { useDao } from "../../context/DAO";
import TradingViewWidget from "../../components/TradingViewWidget.jsx";
import { contracts } from "../Data/Contracts";
import { chains } from "../Data/Chains";
import YieldBondingCurveABI from '../abis/YieldBondingCurve.json';
import BondingCurveFactoryABI from '../abis/BondingCurveFactory.json';
import { getIpfsUrl } from '../utils/ipfs';

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
  const [targetRaise, setTargetRaise] = useState("0");
  const [raisedAmount, setRaisedAmount] = useState("0");
  const [rawRaisedAmount, setRawRaisedAmount] = useState<bigint>(BigInt(0));
  const [rawTargetRaise, setRawTargetRaise] = useState<bigint>(BigInt(0));
  const [priceData, setPriceData] = useState<PriceDataPoint[]>([]);
  const [marketCap, setMarketCap] = useState("0");
  const [metadata, setMetadata] = useState<any>(null);
  const [holders, setHolders] = useState<{ address: string; balance: string }[]>([]);

  const { walletProvider } = useWeb3ModalProvider()
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { selectedDao, setSelectedDao } = useDao();

  const fetchMetadata = async (metadataHash) => {
    try {
      console.log('Metadata hash:', metadataHash);
      const ipfsUrl = getIpfsUrl(metadataHash);
      console.log('Fetching metadata from:', ipfsUrl);
      
      const response = await fetch(ipfsUrl);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error text:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const metadata = await response.json();
      console.log('Fetched metadata:', metadata);
      setMetadata(metadata);
    } catch (error) {
      console.error('Error fetching metadata:', error);
      throw error;
    }
  };

  const updateBalances = async () => {
    if (!address || !walletProvider || !chainId || !bondingCurveAddress) return;

    try {
      // Get ETH balance
      const balance = await walletProvider.request({
        method: 'eth_getBalance',
        params: [address]
      });
      setEthBalance(formatUnits(balance as string, 18));

      // Get token balance from token contract
      const provider = new JsonRpcProvider(chains[chainId].rpc[0]);
      const curveContract = new Contract(bondingCurveAddress, YieldBondingCurveABI, provider);
      const tokenAddress = await curveContract.token();
      
      // Create token contract instance
      const tokenContract = new Contract(
        tokenAddress,
        [
          "function balanceOf(address) view returns (uint256)",
          "function decimals() view returns (uint8)"
        ],
        provider
      );

      const balance2 = await tokenContract.balanceOf(address);
      setTokenBalance(formatUnits(balance2, 9));
    } catch (error) {
      console.error("Error fetching balances:", error);
    }
  };

  const updateContractInfo = async () => {
    if (!bondingCurveAddress || !chainId) return;

    try {
      const provider = new JsonRpcProvider(chains[chainId].rpc[0]);
      const curveContract = new Contract(bondingCurveAddress, YieldBondingCurveABI, provider);
      
      // Get total raised from contract, but use hardcoded target raise
      const raisedAmountValue = await curveContract.totalRaised();
      const hardcodedTargetRaise = parseUnits("6.29", 18);

      // Store raw values for comparison
      setRawRaisedAmount(raisedAmountValue);
      setRawTargetRaise(hardcodedTargetRaise);

      // Store formatted values for display
      setTargetRaise(formatUnits(hardcodedTargetRaise, 18));
      setRaisedAmount(formatUnits(raisedAmountValue, 18));

      console.log("Target Raise:", formatUnits(hardcodedTargetRaise, 18));
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
      const tokenAddress = await curveContract.token();
      const tokenContract = new Contract(
        tokenAddress,
        [
          "function totalSupply() view returns (uint256)",
          "function decimals() view returns (uint8)"
        ],
        provider
      );
      
      // Get ETH price in USD with retries and fallback
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
          const price = Number(formatUnits(eventLog.args?.[3], 18)); // ETH price in 18 decimals
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
          const marketCap = Number(formatUnits(totalSupply, 9)) * priceInUsd; // Token uses 9 decimals
          
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
        const currentPriceUsd = Number(formatUnits(currentPrice, 18)) * ethPrice; // ETH price in 18 decimals
        const currentMarketCap = Number(formatUnits(totalSupply, 9)) * currentPriceUsd; // Token uses 9 decimals
        
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

  const fetchHolders = async () => {
    if (!bondingCurveAddress || !chainId) return;

    try {
      const provider = new JsonRpcProvider(chains[chainId].rpc[0]);
      const curveContract = new Contract(bondingCurveAddress, YieldBondingCurveABI, provider);
      const tokenAddress = await curveContract.token();

      // Get token contract with ERC20 ABI
      const tokenContract = new Contract(
        tokenAddress,
        [
          "function balanceOf(address) view returns (uint256)",
          "event Transfer(address indexed from, address indexed to, uint256 value)"
        ],
        provider
      );

      // Get Transfer events
      const filter = {
        address: tokenAddress,
        topics: [
          ethers.id("Transfer(address,address,uint256)")
        ]
      };
      const events = await provider.getLogs({
        ...filter,
        fromBlock: 0,
        toBlock: 'latest'
      });

      // Get unique addresses from events
      const addresses = new Set<string>();
      events.forEach(event => {
        // Remove padding and ensure proper 0x prefix
        const from = '0x' + event.topics[1].slice(26);
        const to = '0x' + event.topics[2].slice(26);
        addresses.add(from.toLowerCase());
        addresses.add(to.toLowerCase());
      });

      // Remove zero address
      addresses.delete('0x0000000000000000000000000000000000000000');

      // Get balances for all addresses
      const holdersWithBalances = await Promise.all(
        Array.from(addresses).map(async (address) => {
          try {
            // Call balanceOf directly without any ENS resolution
            const data = tokenContract.interface.encodeFunctionData('balanceOf', [address]);
            const balance = await provider.call({
              to: tokenAddress,
              data
            });
            const [parsedBalance] = tokenContract.interface.decodeFunctionResult('balanceOf', balance);
            return {
              address,
              balance: formatUnits(parsedBalance, 9)
            };
          } catch (error) {
            console.warn(`Failed to get balance for ${address}:`, error);
            return {
              address,
              balance: "0"
            };
          }
        })
      );

      // Filter out zero balances and sort by balance
      const filteredHolders = holdersWithBalances
        .filter(holder => Number(holder.balance) > 0)
        .sort((a, b) => Number(b.balance) - Number(a.balance));

      setHolders(filteredHolders);
    } catch (error) {
      console.error("Error fetching holders:", error);
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
      try {
        if (!bondingCurveAddress || !chainId) return;

        const provider = new JsonRpcProvider(chains[chainId].rpc[0]);
        const curveContract = new Contract(bondingCurveAddress, YieldBondingCurveABI, provider);

        // Get the token address
        const tokenAddress = await curveContract.token();
        console.log('Token address:', tokenAddress);

        // Get metadata hash directly from the contract
        try {
          const metadataHash = await curveContract.metadataHash();
          console.log('Metadata hash from contract:', metadataHash);
          if (metadataHash) {
            await fetchMetadata(metadataHash);
          }
        } catch (error) {
          console.error('Error getting metadata hash from contract, falling back to event:', error);
          
          // Fallback to getting metadata from event
          const factoryContract = new Contract(contracts[chainId].BondingCurveFactory, BondingCurveFactoryABI, provider);
          const filter = factoryContract.filters.PresaleCreated(bondingCurveAddress);
          const events = await factoryContract.queryFilter(filter);
          
          if (events.length > 0) {
            const event = events[0] as EventLog;
            console.log('Found PresaleCreated event:', event);
            
            const decodedEvent = factoryContract.interface.parseLog({
              topics: event.topics,
              data: event.data
            });
            
            if (decodedEvent) {
              console.log('Decoded event:', decodedEvent);
              const metadataHash = decodedEvent.args.metadataHash;
              
              if (metadataHash) {
                console.log('Found metadata hash from event:', metadataHash);
                await fetchMetadata(metadataHash);
              }
            }
          }
        }

        // Get token info
        const tokenInfo = await getTokenInfo(tokenAddress, chainId, address ?? "");
        setTokenInfo(tokenInfo);

        // Get total raised
        const totalRaised = await curveContract.totalRaised();
        setRaisedAmount(formatUnits(totalRaised, 18));

        // Get target raise (hardcoded to 6.29 ETH)
        const targetRaise = parseUnits("6.29", 18);
        setTargetRaise(formatUnits(targetRaise, 18));

        // Get token balance
        if (address) {
          const tokenContract = new Contract(tokenAddress, ["function balanceOf(address) view returns (uint256)"], provider);
          const balance = await tokenContract.balanceOf(address);
          setTokenBalance(formatUnits(balance, 9));
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching token info:', error);
        setError('Error fetching token info: ' + error.message);
        setLoading(false);
      }
    };

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
            console.log('New events detected:', {
              purchases: purchaseEvents.length,
              sells: sellEvents.length
            });

            let totalRaisedChange = BigInt(0);

            // Log purchase events and update total raised
            purchaseEvents.forEach((event, index) => {
              const eventLog = event as EventLog;
              const ethAmount = BigInt(eventLog.args?.[1].toString()); // Ensure BigInt conversion
              totalRaisedChange += ethAmount;
              
              console.log(`Purchase Event ${index + 1}:`, {
                buyer: eventLog.args?.[0],
                ethAmount: formatUnits(ethAmount, 18),
                tokenAmount: formatUnits(eventLog.args?.[2], 9),
                price: formatUnits(eventLog.args?.[3], 18),
                blockNumber: eventLog.blockNumber,
                transactionHash: eventLog.transactionHash
              });
            });

            // Log sell events and update total raised
            sellEvents.forEach((event, index) => {
              const eventLog = event as EventLog;
              const ethAmount = BigInt(eventLog.args?.[2].toString()); // Ensure BigInt conversion
              totalRaisedChange -= ethAmount;
              
              console.log(`Sell Event ${index + 1}:`, {
                seller: eventLog.args?.[0],
                tokenAmount: formatUnits(eventLog.args?.[1], 9),
                ethAmount: formatUnits(ethAmount, 18),
                price: formatUnits(eventLog.args?.[3], 18),
                blockNumber: eventLog.blockNumber,
                transactionHash: eventLog.transactionHash
              });
            });
            
            // Update raised amount based on events
            const currentRaised = BigInt(parseUnits(raisedAmount, 18)); // Convert current raised to BigInt with proper decimals
            const newRaisedAmount = currentRaised + totalRaisedChange;
            setRaisedAmount(formatUnits(newRaisedAmount, 18));
            console.log('Updated raised amount:', formatUnits(newRaisedAmount, 18));
            
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
        try {
          const [tokenAmount] = await curveContract.calculatePurchase(parseUnits(value, 18));
          setOutputAmount(formatUnits(tokenAmount, 9));
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
          const parsedAmount = parseUnits(value, 9);
          console.log("Parsed amount:", parsedAmount.toString());
          
          // Get token balance from token contract
          const tokenAddress = await curveContract.token();
          const tokenContract = new Contract(
            tokenAddress,
            [
              "function balanceOf(address) view returns (uint256)",
              "function decimals() view returns (uint8)"
            ],
            provider
          );
          const tokenBalance = await tokenContract.balanceOf(address);
          console.log("Token balance:", formatUnits(tokenBalance, 9));
          
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
    const amount = (Number(balance) * percentage / 100).toFixed(18);
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

      const parsedAmount = buyOrSell ? parseUnits(inputAmount, 18) : parseUnits(inputAmount, 9);

      let tx;
      if (buyOrSell) {
        // Buy tokens
        tx = await curveContract.purchase({
          value: parsedAmount
        });
      } else {
        // Sell tokens
        // Check allowance before selling
        const tokenAddress = await curveContract.token();
        const tokenContract = new Contract(
          tokenAddress,
          [
            "function allowance(address owner, address spender) view returns (uint256)",
            "function approve(address spender, uint256 amount) returns (bool)"
          ],
          signer
        );

        const allowance = await tokenContract.allowance(address, bondingCurveAddress);
        
        if (allowance < parsedAmount) {
          console.log('Insufficient allowance, requesting approval...');
          try {
            const approveTx = await tokenContract.approve(
              bondingCurveAddress,
              parsedAmount
            );
            console.log('Approval transaction sent:', approveTx.hash);
            await approveTx.wait();
            console.log('Approval confirmed');
          } catch (approvalError) {
            console.error('Approval failed:', approvalError);
            setError('Failed to approve tokens. Please try again.');
            return;
          }
        }

        tx = await curveContract.sell(parsedAmount);
      }

      console.log('Transaction sent:', tx.hash);
      await tx.wait();
      console.log('Transaction confirmed');

      // Update balances and other info
      updateBalances();
      updateContractInfo();
      calculatePricePoints();
      updateMarketCap();

      setLoading(false);
    } catch (error) {
      console.error("Error in swap:", error);
      setError(error.message || "Transaction failed");
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
        curveContract.token(),
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

  const renderAboutSection = () => (
    <div className="bg-[#0D0E17] p-6 rounded-lg mt-4">
      <div className="flex flex-col md:flex-row items-start gap-6">
        {metadata?.image && (
          <div className="w-full md:w-1/3">
            <img 
              src={getIpfsUrl(metadata.image)} 
              alt={metadata?.name || "Token"} 
              className="w-full aspect-square object-cover rounded-lg"
            />
          </div>
        )}
        <div className="w-full md:w-2/3 space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">About {metadata?.name || tokenInfo?.name}</h3>
            <p className="text-gray-300">
              {metadata?.description || "Welcome to the S&P6900, an advanced blockchain cryptography token with limitless possibilities and scientific utilization."}
            </p>
          </div>
          {metadata?.attributes && (
            <div>
              <h4 className="text-lg font-semibold mb-2">Properties</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {metadata.attributes.map((attr: any, index: number) => (
                  <div key={index} className="bg-[#1A1B23] p-3 rounded">
                    <div className="text-gray-400 text-sm">{attr.trait_type}</div>
                    <div className="text-white">{attr.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {metadata?.external_url && (
            <div>
              <h4 className="text-lg font-semibold mb-2">Links</h4>
              <a 
                href={metadata.external_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Project Website
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    fetchHolders();
  }, [bondingCurveAddress, chainId]);

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
          ) : rawRaisedAmount >= rawTargetRaise ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <h3 className="text-2xl text-white">Migration in Progress</h3>
              <button
                onClick={async () => {
                  try {
                    if (!isConnected || !walletProvider || !chainId) {
                      setError("Please connect your wallet");
                      return;
                    }

                    const ethersProvider = new BrowserProvider(walletProvider);
                    const signer = await ethersProvider.getSigner();
                    const curveContract = new Contract(
                      bondingCurveAddress,
                      YieldBondingCurveABI,
                      signer
                    );

                    const tx = await curveContract.migrateToV3();
                    await tx.wait();
                    console.log('Migration transaction completed');
                  } catch (error) {
                    console.error('Migration error:', error);
                    setError('Failed to migrate: ' + (error.message || 'Unknown error'));
                  }
                }}
                className="px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
              >
                Migrate to V3
              </button>
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
          <div>Target Raise: {Number(targetRaise).toFixed(5)} ETH</div>
          <div className="flex flex-col items-center gap-1 flex-grow mx-8">
            <div className="w-full bg-[#1a1b1f] rounded h-2">
              <div 
                className="bg-[#FFDE30] h-2 rounded transition-all duration-500" 
                style={{ 
                  width: `${Math.min((Number(raisedAmount) / Number(targetRaise) * 100), 100)}%`
                }}
              ></div>
            </div>
            <div className="text-center">
              {(Number(raisedAmount) / Number(targetRaise) * 100).toFixed(1)}%
            </div>
          </div>
          <div>Raised: {Number(raisedAmount).toFixed(5)} ETH</div>
        </div>

        {renderAboutSection()}

        <div className="bg-[#0D0E17] p-4 rounded-lg mt-4">
          <h3 className="text-lg font-semibold mb-4">Token Holders</h3>
          <div className="max-h-[300px] overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-[#0D0E17]">
                <tr>
                  <th className="text-left py-2">Address</th>
                  <th className="text-right py-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {holders.map((holder, index) => (
                  <tr key={holder.address} className="border-t border-[#ffffff20]">
                    <td className="py-2">
                      <a
                        href={`${chains[chainId]?.blockExplorer}/address/${holder.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#03F0FF] hover:underline"
                      >
                        {holder.address.slice(0, 6)}...{holder.address.slice(-4)}
                      </a>
                    </td>
                    <td className="text-right py-2">
                      {Number(holder.balance).toFixed(2)} {tokenInfo?.symbol || ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[32%]">
        <div className="flex items-end justify-between text-sm 2xl:text-xl mb-1">
          <p>trade</p>
          <p>next rebase in TBD</p>
        </div>

        <div className="border p-3 2xl:p-8 rounded-[6px] bg-[#0D0E17]">
          {rawRaisedAmount >= rawTargetRaise ? (
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
