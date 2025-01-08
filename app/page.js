"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Contract, JsonRpcProvider, formatUnits } from "ethers";
import { chains } from './Data/Chains';
import { contracts } from './Data/Contracts';
import YieldBondingCurveFactoryABI from './abis/BondingCurveFactory.json';
import YieldBondingCurveABI from './abis/YieldBondingCurve.json';

export default function Home() {
  const [latestCurve, setLatestCurve] = useState({
    address: "",
    name: "",
    symbol: "",
    marketCap: "0",
    holders: "0",
    nextRebase: "TBD"
  });

  useEffect(() => {
    const fetchLatestCurve = async () => {
      try {
        const chainId = 8453; // Base chain
        const provider = new JsonRpcProvider(chains[chainId].rpc[0]);
        const factory = new Contract(contracts[chainId].BondingCurveFactory, YieldBondingCurveFactoryABI, provider);

        // Get total number of presales
        const count = await factory.getPresalesCount();
        if (count === 0n) return;

        // Get the latest presale address
        const latestPresaleAddress = await factory.getPresaleAt(count - 1n);
        
        // Get the presale details
        const filter = factory.filters.PresaleCreated(latestPresaleAddress);
        const events = await factory.queryFilter(filter);
        if (events.length === 0) return;

        const event = events[0];
        const name = event.args?.[2];
        const symbol = event.args?.[3];
        
        // Get market cap
        const curveContract = new Contract(latestPresaleAddress, YieldBondingCurveABI, provider);
        const tokenAddress = await curveContract.claimToken();
        const tokenContract = new Contract(
          tokenAddress,
          [
            "function totalSupply() view returns (uint256)",
            "function decimals() view returns (uint8)",
            "function balanceOf(address) view returns (uint256)"
          ],
          provider
        );

        const [totalSupply, decimals, currentPrice] = await Promise.all([
          tokenContract.totalSupply(),
          tokenContract.decimals(),
          curveContract.getCurrentPrice()
        ]);

        // Get ETH price
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        const ethPrice = data.ethereum.usd;

        // Convert BigInt values to numbers before multiplication
        const priceInUsd = Number(formatUnits(currentPrice, 18)) * ethPrice;
        const totalSupplyFormatted = Number(formatUnits(totalSupply, Number(decimals)));
        const marketCap = totalSupplyFormatted * priceInUsd;

        // Get holders count (this is a simplified version)
        const holderFilter = curveContract.filters.Purchase();
        const purchaseEvents = await curveContract.queryFilter(holderFilter);
        const uniqueHolders = new Set(purchaseEvents.map(e => e.args?.[0])).size;

        setLatestCurve({
          address: latestPresaleAddress,
          name,
          symbol,
          marketCap: marketCap.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
          }),
          holders: uniqueHolders.toString(),
          nextRebase: "TBD"
        });
      } catch (error) {
        console.error("Error fetching latest curve:", error);
      }
    };

    fetchLatestCurve();
  }, []);

  return (
    <section>
      <Link className="text-white flex justify-center" href="/Create">
        [ create new vault ]
      </Link>

      <div className="flex flex-col md:flex-row gap-5 mt-7 mb-8">
        <Link href={`/DAO?ca=${latestCurve.address}`} className="home-cardBg h-[469px] 2xl:h-[700px] w-full p-5">
          <div className="flex text-white items-center text-[11px] gap-[5px]">
            <img src="/images/Star.png" alt="" />
            <p>Featured</p>
          </div>
          <div className="mt-[265px] 2xl:mt-[487px]">
            <img src="/images/mlogo.png" alt="" className="w-[39px]" />
            <div className="text-white flex justify-between items-end">
              <div>
                <div className="mb-2">
                  <h2 className="text-2xl">{latestCurve.name || "juice dao"}</h2>
                  <p className="text-sm text-gray-400">({latestCurve.symbol || "JUICE"})</p>
                </div>
                <div className="flex gap-8">
                  <p>Market cap: {latestCurve.marketCap}</p>
                  <p>Holders: {latestCurve.holders}</p>
                </div>
              </div>
              <div>
                <p>next rebase in {latestCurve.nextRebase}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row justify-normal lg:justify-between gap-5 lg:gap-0">
        <div className="w-full lg:w-[58%] border rounded-[6px] p-5 bg-[#0000007c] overflow-auto">
          <p className="text-white">
            <strong className="text-[#FFDE30] text-xl">Trending</strong> 24hr
          </p>
          <table className="border-separate border-spacing-y-2">
            <thead className="text-xs 2xl:text-xl">
              <tr>
                <td className="px-5"></td>
                <td className="pr-10 2xl:pr-20 text-[#949494] text-left">
                  Vault (Coin)
                </td>
                <td className="pr-10 2xl:pr-20 text-[#949494]">Market Cap</td>
                <td className="pr-10 2xl:pr-20 text-[#949494]">5D Change</td>
                <td className="pr-10 2xl:pr-20 text-[#949494]">Daily Volume</td>
                <td className="pr-10 2xl:pr-20 text-[#949494]">Holders</td>
                <td className="pr-10 2xl:pr-20 text-[#949494]">Bond Premium</td>
              </tr>
            </thead>
            <tbody className="text-white text-xs 2xl:text-xl">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => (
                <tr key={`trending-row-${idx}`}>
                  <td className=" text-[#FFDE30]">#{idx + 1}</td>
                  <td className=" flex items-center text-white gap-1">
                    <img className="w-[17px]" src="/images/image.png" alt="" />
                    <p>cosmic dao</p>
                  </td>
                  <td className=" ">$201,069,780</td>
                  <td className=" text-[#64FF4A]">+72%</td>
                  <td className=" ">$44,002,532 USD</td>
                  <td className=" ">11,792</td>
                  <td className=" ">+4%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className=" lg:w-[40%] border rounded-[6px] p-5 bg-[#0000007c]">
          <p className="text-white mb-5">
            <strong className="text-xl">Transactions</strong> (Most Recent)
          </p>

          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => (
            <p key={`transaction-${idx}`} className="flex items-center gap-2 text-white text-[14px] 2xl:text-xl mb-2 2xl:mb-3">
              mikah <span className="text-[#03F0FF]">bought</span> 5.7 ETH of
              ngl <img className="w-[17px]" src="/images/image.png" alt="" />{" "}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
