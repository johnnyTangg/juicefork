"use client";
import Link from "next/link";
import React, { useEffect, useRef, memo } from "react";

const STAKE = () => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "NASDAQ:AAPL",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div  className="flex flex-col lg:flex-row items-center lg:items-start gap-5 text-white mt-12 mb-28">
      <div className="w-full">
        <div className="flex items-end flex-wrap gap-3">
          <h5 className="text-[46px] leading-none">
            cosmic dao<sup className="text-xl">(CD)</sup>
          </h5>
          <p className="text-[11px]">Market cap: $20,069,780</p>
          <p className="text-[11px]">
            CA: 2tgwKyAM1rg2wSnBHcotZMA9QvY6dL2NBNDMbjgapump
          </p>
        </div>

        <div className="h-[500px] overflow-hidden mt-2">
          <div
            className="tradingview-widget-container"
            ref={container}
            style={{ height: "100%", width: "100%" }}
          ></div>
        </div>
        <div className="flex gap-x-6 md:gap-x-11 gap-y-2 md:gap-y-4 flex-wrap mt-6">
          <div className="text-lg md:text-[32px] leading-5 md:leading-9">
            <p className="text-[#949494]">apy</p>
            <p>40,015.9%</p>
          </div>
          <div className="text-lg md:text-[32px] leading-5 md:leading-9">
            <p className="text-[#949494]">total value deposited</p>
            <p>$1.56M</p>
          </div>
          <div className="text-lg md:text-[32px] leading-5 md:leading-9">
            <p className="text-[#949494]">current index</p>
            <p>9,206 CD</p>
          </div>
          <div className="text-lg md:text-[32px] leading-5 md:leading-9">
            <p className="text-[#949494]">bond wait time</p>
            <p>5 days</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[496px]">
        <div className="flex items-end justify-between text-sm mt-7 mb-1">
          <p>bond</p>
          <p>next rebase in 3h 29m</p>
        </div>

        <div className="border p-3 rounded-[6px] bg-[#0D0E17]">
          <p className="text-[10px] text-center mb-5">
            You can buy CD bonds with ETHER that reach maturity in 5 days.{" "}
            <br />
            To learn more, read our docs.
          </p>

          <p className="flex items-center gap-1 justify-center mb-2">
            CD <img className="w-[21px]" src="/images/image.png" alt="" />
          </p>

          <div className="flex justify-center gap-20 text-center mb-4">
            <div>
              <p className="text-[#949494]">Bond Price</p>
              <p>$176.64</p>
            </div>
            <div>
              <p className="text-[#949494]">Market Price</p>
              <p>$184</p>
            </div>
          </div>

          <p className="text-center mb-7">Current premium: 4%</p>

          <div className="relative">
            <input
              className="w-full bg-[#ffffff10] h-[35px] border rounded-[6px] pl-2 pr-16"
              type="text"
              name=""
              id=""
              defaultValue={"1,000,000"}
            />
            <button className="flex items-center gap-1 absolute top-0 bottom-0 my-auto right-2">
              Eth
              <img src="/images/eth.png" className="w-[21px]" alt="" />
            </button>
          </div>
          <div className="text-[10px] flex gap-5 mt-2 mb-4">
            <p className="underline">25%</p>
            <p className="underline">50%</p>
            <p className="underline">75%</p>
            <p className="underline">100%</p>
          </div>

          <p className="text-[10px] mt-2 mb-9">
            You will receive ~25 ETH worth of locked CD
          </p>

          <button className="w-[90%] flex justify-center mx-auto mb-5 h-10 bg-[#999999] relative rounded">
            <span className="bg-white text-black absolute top-0 right-0 left-0 h-8 flex items-center justify-center rounded">
              BUY BOND
            </span>
          </button>
          <div>
            <p className="flex justify-between">
              Your bonded tokens <span>5,325,623 CD</span>
            </p>
            <p className="flex justify-between">
              Next reward amount <span>220,503 CD</span>
            </p>
          </div>
        </div>

        <div className="text-base font-bold flex gap-1 mt-2">
          <p className="text-[#818181]">[ bond CD ]</p>
          <Link href="/STAKE">[ stake CD ]</Link>
          <Link href="/DAO">[ trade CD ]</Link> 
        </div>

        <div className="flex items-center gap-5 mt-12">
          <img src="/images/image1.png" alt="" />
          <div className="text-sm">
            <p className="mb-2">about</p>
            <p>
              Cosmic Dao is a community-led incubation DAO building
              edge-of-the-edge Web3 projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default STAKE;
