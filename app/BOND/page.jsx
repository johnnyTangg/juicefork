"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const STAKE = () => {
  const container = useRef();

  const [isMatured, setIsMatured] = useState(false);

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
          "theme": "dark",
          "backgroundColor": "#0B0B12",
          "style": "1",
          "locale": "en",
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-normal 2xl:justify-between gap-5 text-white mt-12 mb-28">
      <div className="w-full 2xl:w-[67%]">
        <div className="flex items-end flex-wrap gap-10">
          <h5 className="text-[46px] leading-none">
            SPXDAO
            <span className="text-xl translate-x-[10px] -translate-y-[24px] inline-block ">
              (SPX)
            </span>
          </h5>
          <p className="text-[11px] 2xl:text-xl">Market cap: $20,069,780</p>
          <p className="text-[11px] 2xl:text-xl">
            CA: 2tgwKyAM1rg2wSnBHcotZMA9QvY6dL2NBNDMbjgapump
          </p>
        </div>

        <div className="h-[500px] 2xl:h-[850px] overflow-hidden mt-2">
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
            <p>9,206 SPX</p>
          </div>
          <div className="text-lg md:text-[32px] leading-5 md:leading-9">
            <p className="text-[#949494]">bond wait time</p>
            <p>5 days</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[496px] 2xl:w-[32%]">
        <div className="flex items-end justify-between text-sm 2xl:text-xl mt-7 2xl:mt-5 mb-1">
          <p>bond</p>
          <Link href="/REBASE">
            <p>
              click here to <b>rebase</b>
            </p>
          </Link>
        </div>

        <div className="border p-3 2xl:p-8 rounded-[6px] bg-[#0D0E17]">
          <p className="text-[10px] 2xl:text-xl text-center mb-5">
            You can buy SPX bonds with ETHER that reach maturity in 5 days.{" "}
            <br />
            To learn more, read our docs.
          </p>

          <p className="flex items-center gap-1 justify-center mb-2 text-xl 2xl:text-2xl">
            SPX <img className="w-[21px]" src="/images/image.png" alt="" />
          </p>

          <div className="flex justify-center gap-20 text-center mb-4 text-base 2xl:text-xl">
            <div>
              <p className="text-[#949494]">Bond Price</p>
              <p>$176.64</p>
            </div>
            <div>
              <p className="text-[#949494]">Market Price</p>
              <p>$184</p>
            </div>
          </div>

          <p className="text-center mb-7 text-base 2xl:text-xl">
            Current discount: 4%
          </p>

          <div className="relative">
            <input
              className="w-full bg-[#ffffff10] h-[35px] 2xl:h-14 border rounded-[6px] pl-2 pr-16 text-base 2xl:text-2xl"
              type="text"
              name=""
              id=""
              defaultValue={"25.4"}
            />
            <button className="flex items-center gap-1 absolute top-0 bottom-0 my-auto right-2 text-base 2xl:text-xl">
              Eth
              <img src="/images/eth.png" className="w-[21px]" alt="" />
            </button>
          </div>
          <div className="text-[10px] 2xl:text-2xl flex gap-5 mt-2 2xl:mt-4">
            <p className="underline">25%</p>
            <p className="underline">50%</p>
            <p className="underline">75%</p>
            <p className="underline">100%</p>
          </div>

          <p className="text-[10px] 2xl:text-base mt-2 mb-9">
            You will receive ~25 ETH worth of locked SPX
          </p>

          <button className="w-[90%] flex justify-center mx-auto mb-5 h-10 2xl:h-16 bg-[#999999] relative rounded ">
            <span className="bg-white text-black absolute top-0 right-0 left-0 h-8 2xl:h-12 flex items-center justify-center rounded  text-lg 2xl:text-2xl">
              BUY BOND
            </span>
          </button>
          <div className="text-base 2xl:text-xl">
            <p className="flex justify-between">
              Your bonded tokens <span>5,325,623 SPX</span>
            </p>
            <p className="flex justify-between">
              Time until payout <span>2d 6h</span>
            </p>
          </div>
          <div className="text-center my-[40px]">
            <p className="text-[12px] text-white">
              Claim your bond tokens <b>here, at the end of the bond term</b>
            </p>
            <button
              disabled={!isMatured}
              className={`w-[210PX] flex justify-center mx-auto mb-5 h-10 2xl:h-16  relative rounded mt-[20px] ${
                isMatured ? "bg-[#999999]" : "bg-[#484848]"
              }`}
            >
              <span
                className={` absolute top-0 right-0 left-0 h-8 2xl:h-12 flex items-center justify-center rounded  text-lg 2xl:text-2xl text-[700] ${
                  isMatured
                    ? "bg-[#ffffff] text-[#000000]"
                    : "bg-[#666666] text-[#909090] "
                }`}
              >
                REDEEM BONDS
              </span>
            </button>
          </div>
        </div>

        <div className="text-base 2xl:text-2xl font-bold flex gap-1 mt-2 2xl:mt-4">
          <p className="text-[#818181]">[ bond SPX ]</p>
          <Link href="/STAKE">[ stake SPX ]</Link>
          <Link href="/DAO">[ trade SPX ]</Link>
        </div>

        <div className="flex items-center gap-5 mt-12">
          <img src="/images/image1.png" alt="" />
          <div className="text-sm 2xl:text-2xl">
            <p className="mb-2">about</p>
            <p>
              Welcome to the S&P6900, an advanced blockchain cryptography token
              with limitless possibilities and scientific utilization
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default STAKE;
