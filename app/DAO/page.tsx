"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { IToken } from "../Data/Tokens";
import { useWeb3Modal, useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { getTokenInfo } from "../API/ERC20Helpers";
import { useDao } from "../../context/DAO";
import TradingViewWidget from "../../components/TradingViewWidget"; // Adjust the path as needed

const DAO = () => {
  const container = useRef();
  const [buyOrSell, setBuyOrSell] = useState(true);
  const [tokenInfo, setTokenInfo] = useState < IToken | null > (null);
  const [symbol, setSymbol] = useState("ETHUSD");

  const { walletProvider } = useWeb3ModalProvider()
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { selectedDao, setSelectedDao } = useDao();

  let tokenAddress = '';

  useEffect(() => {
    if (!walletProvider) return;
    const fetchQueryParam = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const myParam = urlParams.get('ca');
      console.log("token address:", myParam);
      if (myParam) tokenAddress = myParam;
    };
    const fetchTokenInfo = async () => {
      if (!address) return;
      setTokenInfo(await getTokenInfo(tokenAddress, address ?? ""));
    }

    fetchQueryParam();
    if(selectedDao && selectedDao.token){//user came from the directory
      console.log('already have token info from directory');
      setTokenInfo(selectedDao.token);
    }
    else{//user navigated directly to the page
      console.log('user navigated directly, missing dao/token info');
      fetchTokenInfo();
    }
  }, [address]);

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-normal 2xl:justify-between gap-5 text-white mt-12 mb-28">
      <div className="w-full 2xl:w-[67%]">
        <div className="flex items-end flex-wrap gap-10">
          <h5 className="text-[46px] leading-none">
            {tokenInfo?.name || ""}
            <span className="text-xl translate-x-[10px] -translate-y-[24px] inline-block ">
              ({tokenInfo?.symbol || ""})
            </span>
          </h5>
          <p className="text-[11px] 2xl:text-xl">Market cap: $TBD</p>
          <p className="text-[11px] 2xl:text-xl">
            CA: {tokenInfo?.address || "???"}
          </p>
        </div>

        <div className="h-[500px] overflow-hidden mt-2">
          {/* Use the TradingViewWidget component and pass the symbol prop */}
          <TradingViewWidget symbol={symbol} />
        </div>
        <div className="flex gap-x-6 md:gap-x-11 gap-y-2 md:gap-y-4 flex-wrap mt-6">
          <div className="text-lg md:text-[32px] leading-5 md:leading-9">
            <p className="text-[#949494]">apy</p>
            <p>TBD%</p>
          </div>
          <div className="text-lg md:text-[32px] leading-5 md:leading-9">
            <p className="text-[#949494]">total value deposited</p>
            <p>$TBD</p>
          </div>
          <div className="text-lg md:text-[32px] leading-5 md:leading-9">
            <p className="text-[#949494]">current index</p>
            <p>TBD {tokenInfo?.symbol || ""}</p>
          </div>
          <div className="text-lg md:text-[32px] leading-5 md:leading-9">
            <p className="text-[#949494]">bond wait time</p>
            <p>TBD</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[496px] 2xl:w-[32%]">
        <div className="flex items-end justify-between text-sm 2xl:text-xl mt-7 2xl:mt-5 mb-1">
          <p>trade</p>
          <p>next rebase in TBD</p>
        </div>

        <div className="border p-3 2xl:p-8 rounded-[6px] bg-[#0D0E17]">
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

          <div className="relative">
            <input
              className="w-full bg-[#ffffff10] h-[35px] 2xl:h-14 border rounded-[6px] pl-2 pr-16 text-base 2xl:text-2xl"
              type="text"
              name=""
              id=""
              defaultValue={"117"}
            />
            <button className="flex items-center gap-1 absolute top-0 bottom-0 my-auto right-2 text-base 2xl:text-xl">
              ETH
              <img src="/images/eth.png" alt="" />
            </button>
          </div>
          <div className="text-[10px] 2xl:text-2xl flex gap-5 mt-2 2xl:mt-4">
            <p className="underline">25%</p>
            <p className="underline">50%</p>
            <p className="underline">75%</p>
            <p className="underline">100%</p>
          </div>
          <p className="text-[10px] 2xl:text-xl mt-2 2xl:mt-4 mb-9">
            You will receive TBD ({tokenInfo?.symbol || ""})
          </p>
          <button className="w-[90%] flex justify-center mx-auto mb-5 h-10 2xl:h-16 bg-[#999999] relative rounded ">
            <span className="bg-white text-black absolute top-0 right-0 left-0 h-8 2xl:h-12 flex items-center justify-center rounded  text-lg 2xl:text-2xl">
              SWAP
            </span>
          </button>
        </div>

        <div className="text-base 2xl:text-2xl font-bold flex justify-center gap-1 mt-2 2xl:mt-4">
          <Link href={`/BOND?ca=${tokenInfo?.address}`}>[bond {tokenInfo?.symbol || ""}]</Link>
          <Link href={`/STAKE?ca=${tokenInfo?.address}`}>[stake {tokenInfo?.symbol || ""}]</Link>
          <p className="text-[#818181]">[trade {tokenInfo?.symbol || ""}]</p>
        </div>

        <div className="flex items-center gap-5 mt-12">
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
    </div>
  );
};

export default DAO;
