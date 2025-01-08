"use client";
import * as React from "react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useWeb3Modal, useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import BigNumber from "bignumber.js";
import { approvalNeeded, approve, getTokenInfo } from "../API/ERC20Helpers";
import type { IToken } from "../Data/Tokens";
import { getUserClaimInfo, unstake } from "../API/Stake";
import { contracts } from "../Data/Contracts";
import { useDao } from "../../context/DAO";
import { stake } from "../API/Stake";
import { chains } from "../Data/Chains";
import { Contract, JsonRpcProvider, formatUnits, EventLog } from "ethers";
import YieldBondingCurveABI from '../abis/YieldBondingCurve.json';
import TradingViewWidget from "../../components/TradingViewWidget.jsx";

interface PriceDataPoint {
  x: number;
  o: number;
  h: number;
  l: number;
  c: number;
}

const STAKE = () => {
  const [stakeStatus, setStakeStatus] = useState(true);
  const [symbol, _] = useState("ETHUSD");
  const [selectedLink, setSelectedLink] = useState('bond');
  const [inputValue, setInputValue] = useState('');
  const [tokenInfo, setTokenInfo] = useState<IToken | null>(null);
  const [userClaimInfo, setUserClaimInfo] = useState<any>(null);
  const [bondingCurveAddress, setBondingCurveAddress] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [priceData, setPriceData] = useState<PriceDataPoint[]>([]);
  const [marketCap, setMarketCap] = useState("TBD");

  const { selectedDao, setSelectedDao } = useDao();

  let isMatured = false;
  let formattedUserWalletBalance = BigNumber(0);

  const { walletProvider } = useWeb3ModalProvider()
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const calculatePricePoints = async () => {
    if (!bondingCurveAddress || !chainId) return;

    try {
      const provider = new JsonRpcProvider(chains[chainId].rpc[0]);
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
      let ethPrice = 2000; // Fallback ETH price in USD
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        ethPrice = data.ethereum.usd;
      } catch (e) {
        console.warn("Using fallback ETH price:", e);
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
        const now = Math.floor(Date.now() / 1000);
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
            x: (now - (numPoints - i) * 60) * 1000,
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
          const price = Number(formatUnits(eventLog.args?.[3], 18));
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
            x: timestamp * 1000,
            o: lastMarketCap || marketCap,
            h: Math.max(lastMarketCap || marketCap, marketCap),
            l: Math.min(lastMarketCap || marketCap, marketCap),
            c: marketCap
          });
          lastMarketCap = marketCap;
        }
        
        // Add current time point
        const currentPrice = await curveContract.getCurrentPrice();
        const currentPriceUsd = Number(formatUnits(currentPrice, 18)) * ethPrice;
        const currentMarketCap = Number(formatUnits(totalSupply, decimals)) * currentPriceUsd;
        
        const currentTime = Math.floor(Date.now() / 1000);
        points.push({
          x: (currentTime + sameTimestampOffset + 1) * 1000,
          o: lastMarketCap,
          h: Math.max(lastMarketCap, currentMarketCap),
          l: Math.min(lastMarketCap, currentMarketCap),
          c: currentMarketCap
        });
        
        setPriceData(points);
        
        // Update market cap display
        setMarketCap(currentMarketCap.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0
        }));
      }
    } catch (error) {
      console.error("Error calculating price points from events:", error);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  async function onMaxClick(percentage: number) {
    if(!isConnected || !chainId) return;
    if(!tokenInfo?.walletBalance){
      setTokenInfo(await getTokenInfo(selectedDao?.OHM.address || '', chainId, address ?? ""));
    }
    if(stakeStatus){
      setInputValue(BigNumber(tokenInfo?.walletBalance || 0).times(percentage / 100).div(10**9).toFixed(6))
    }else{
      setInputValue(BigNumber(userClaimInfo.gons || 0).times(percentage / 100).div(10**9).toFixed(6))
    }
  }

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
    if(walletProvider && chainId){
      getUserClaimInfo(contracts['OlympusStaking'], chainId, walletProvider).then((v) => setUserClaimInfo(v));
    }
    calculatePricePoints();
  }, [address, chainId, bondingCurveAddress]);

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
          <div>APY: TBD%</div>
          <div>TVL: $TBD</div>
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
          <p>stake</p>
          <p>next rebase in TBD</p>
        </div>

        <div className="border p-3 2xl:p-8 rounded-[6px] bg-[#0D0E17]">
          <p className="text-[10px] 2xl:text-xl text-center mb-5">
            You can stake {tokenInfo?.symbol || ""} to earn rebase rewards.{" "}
            <br />
            To learn more, read our docs.
          </p>

          <p className="flex items-center gap-1 justify-center mb-2 text-xl 2xl:text-2xl">
            {tokenInfo?.symbol || ""} <img className="w-[21px]" src="/images/image.png" alt="" />
          </p>

          <div className="flex justify-center gap-20 text-center mb-4 text-base 2xl:text-xl">
            <div>
              <p className="text-[#949494]">APY</p>
              <p>TBD%</p>
            </div>
            <div>
              <p className="text-[#949494]">TVL</p>
              <p>$TBD</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-14">
            <button
              className={`h-10 2xl:h-16 ${
                stakeStatus ? "bg-[#999999]" : "bg-[#0F1013] border"
              } relative rounded`}
              onClick={() => setStakeStatus(true)}
            >
              <span
                className={`${
                  stakeStatus
                    ? "bg-white text-black "
                    : "bg-[#0F1013] text-white border"
                } absolute top-0 right-0 left-0 h-8 2xl:h-12 flex items-center justify-center rounded text-lg 2xl:text-2xl`}
              >
                STAKE
              </span>
            </button>
            <button
              className={`h-10 2xl:h-16 ${
                !stakeStatus ? "bg-[#999999]" : "bg-[#0F1013] border"
              } relative rounded`}
              onClick={() => setStakeStatus(false)}
            >
              <span
                className={`${
                  !stakeStatus
                    ? "bg-white text-black "
                    : "bg-[#0F1013] text-white border"
                } absolute top-0 right-0 left-0 h-8 2xl:h-12 flex items-center justify-center rounded text-lg 2xl:text-2xl`}
              >
                UNSTAKE
              </span>
            </button>
          </div>

          <div className="relative">
            <input
              className="w-full bg-[#ffffff10] h-[35px] 2xl:h-14 border rounded-[6px] pl-2 pr-16 text-base 2xl:text-2xl"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.currentTarget.value)}
              placeholder={"0.0"}
            />
            <button className="flex items-center gap-1 absolute top-0 bottom-0 my-auto right-2 text-base 2xl:text-xl">
              {tokenInfo?.symbol || ""}
              <img src="/images/eth.png" className="w-[21px]" alt="" />
            </button>
          </div>
          <div className="text-[10px] 2xl:text-2xl flex gap-5 mt-2 2xl:mt-4">
            <button onClick={() => onMaxClick(25)} className="underline">25%</button>
            <button onClick={() => onMaxClick(50)} className="underline">50%</button>
            <button onClick={() => onMaxClick(75)} className="underline">75%</button>
            <button onClick={() => onMaxClick(100)} className="underline">100%</button>
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">
              {error}
            </div>
          )}

          <button
            className="w-[90%] flex justify-center mx-auto mb-5 h-10 2xl:h-16 bg-[#999999] relative rounded mt-[20px]"
          >
            <span className="bg-white text-black absolute top-0 right-0 left-0 h-8 2xl:h-12 flex items-center justify-center rounded text-lg 2xl:text-2xl">
              {stakeStatus ? "STAKE" : "UNSTAKE"}
            </span>
          </button>
        </div>

        <div className="text-base 2xl:text-2xl font-bold flex justify-center gap-1 mt-2 2xl:mt-4">
          <Link href={`/BOND?ca=${bondingCurveAddress}`}>[bond {tokenInfo?.symbol || ""}]</Link>
          <p className="text-[#818181]">[stake {tokenInfo?.symbol || ""}]</p>
          <Link href={`/DAO?ca=${bondingCurveAddress}`}>[trade {tokenInfo?.symbol || ""}]</Link>
        </div>
      </div>
    </div>
  );
};

export default STAKE;
