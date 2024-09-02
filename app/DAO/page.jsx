"use client";
import React, { useEffect, useRef, memo } from "react";

const DAO = () => {
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
    <div className="flex gap-5 text-white mt-12 mb-28">
      <div className="w-full">
        <div className="flex items-end gap-3">
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
        <div className="flex gap-x-11 gap-y-4 flex-wrap mt-6">
          <div className="text-[32px] leading-9">
            <p className="text-[#949494]">apy</p>
            <p>40,015.9%</p>
          </div>
          <div className="text-[32px] leading-9">
            <p className="text-[#949494]">total value deposited</p>
            <p>$1.56M</p>
          </div>
          <div className="text-[32px] leading-9">
            <p className="text-[#949494]">current index</p>
            <p>9,206 CD</p>
          </div>
          <div className="text-[32px] leading-9">
            <p className="text-[#949494]">bond wait time</p>
            <p>5 days</p>
          </div>
        </div>
      </div>
      <div className="w-[496px]">
        <div className="flex items-end justify-between text-sm mt-7 mb-1">
          <p>trade</p>
          <p>next rebase in 3h 29m</p>
        </div>

        <div className="border p-3 rounded-[6px]">
          <div className="grid grid-cols-2 gap-3 mb-14">
            <button className="h-10 bg-[#999999] relative rounded">
              <span className="bg-white text-black absolute top-0 right-0 left-0 h-8 flex items-center justify-center rounded">
                BUY
              </span>
            </button>
            <button className="h-10 bg-[#0F1013] relative rounded border">
              <span className="bg-[#0F1013] text-white absolute top-0 right-0 left-0 h-8 flex items-center justify-center rounded border">
                SELL
              </span>
            </button>
          </div>

          <div className="relative">
            <input
              className="w-full bg-[#ffffff10] h-[35px] border rounded-[6px] pl-2 pr-16"
              type="text"
              name=""
              id=""
              defaultValue={"117"}
            />
            <button className="flex items-center gap-1 absolute top-0 bottom-0 my-auto right-2">
              ETH
              <img src="/images/eth.png" alt="" />
            </button>
          </div>
          <div className="text-[10px] flex gap-5 mt-2">
            <p className="underline">25%</p>
            <p className="underline">50%</p>
            <p className="underline">75%</p>
            <p className="underline">100%</p>
          </div>
          <p className="text-[10px] mt-2 mb-9">
            You will receive 220,794,432 CD
          </p>
          <button className="w-[90%] flex justify-center mx-auto mb-5 h-10 bg-[#999999] relative rounded">
            <span className="bg-white text-black absolute top-0 right-0 left-0 h-8 flex items-center justify-center rounded">
              SWAP
            </span>
          </button>
        </div>

        <div className="text-base font-bold flex gap-1 mt-2">
          <p>[ bond CD ]</p>
          <p>[ stake CD ]</p>
          <p className="text-[#818181]">[ trade CD ]</p>
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

export default DAO;
