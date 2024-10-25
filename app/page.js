import Link from "next/link";

export default function Home() {
  return (
    <section>
      <Link className="text-white flex justify-center" href="/Create">
        [ create new vault ]
      </Link>

      <div className="flex flex-col md:flex-row gap-5 mt-7 mb-8">
        <div className="home-cardBg h-[469px] 2xl:h-[700px] w-full p-5">
          <div className="flex text-white items-center text-[11px] gap-[5px]">
            <img src="/images/Star.png" alt="" />
            <p>Featured</p>
          </div>
          <div className="mt-[265px] 2xl:mt-[487px]">
            <img src="/images/mlogo.png" alt="" className="w-[39px]" />
            <div className="text-white flex justify-between items-end">
              <div>
                <img src="/images/images2.png" alt="" />
                <div className="flex gap-8">
                  <p>Market cap: $20,069,780</p>
                  <p>Holders: 8,120</p>
                </div>
              </div>
              <div>
                <p>next rebase in 3h 29m</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative bg-gradient-to-b from-black from-80% to-transparent to-95% h-[469px] 2xl:h-[700px] md:w-[455px] 2xl:w-[40%] rounded-[6px] border border-white px-[17px] py-[14px]">
          <div className="text-white flex justify-between">
            <p className="flex items-center gap-1 leading-none">
              Chat <img src="/images/gDot.png" alt="" />
            </p>
            <p>100+ users</p>
          </div>

          <div className="absolute bottom-5 right-5 left-5">
            <p className="text-white mb-2">bald is typing...</p>
            <div className="relative w-full">
              <input
                className="w-full lg:w-[302px] 2xl:w-full h-[35px] text-white rounded border p-2 bg-transparent"
                type="text"
                name=""
                id=""
                placeholder="looking for alpha..."
              />
              <button className="absolute right-3 top-0 bottom-0 my-auto text-white">
                send
              </button>
            </div>
          </div>
        </div>
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
                <td className="pr-10 2xl:pr-20 text-[#949494] text-left">Vault (Coin)</td>
                <td className="pr-10 2xl:pr-20 text-[#949494]">Market Cap</td>
                <td className="pr-10 2xl:pr-20 text-[#949494]">5D Change</td>
                <td className="pr-10 2xl:pr-20 text-[#949494]">Daily Volume</td>
                <td className="pr-10 2xl:pr-20 text-[#949494]">Holders</td>
                <td className="pr-10 2xl:pr-20 text-[#949494]">Bond Premium</td>
              </tr>
            </thead>
            <tbody className="text-white text-xs 2xl:text-xl">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => (
                <tr className="">
                  <td className=" text-[#FFDE30]">#{idx + 1}</td>
                  <td className=" flex items-center text-white gap-1">
                    <img className="w-[17px]" src="/images/mlogo.png" alt="" />
                    <p>juice DAO</p>
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
          <p className="text-white mb-5" >
            <strong className="text-xl">Transactions</strong> (Most Recent)
          </p>

          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => (
            <p className="flex items-center gap-2 text-white text-[14px] 2xl:text-xl mb-2 2xl:mb-3">
              mikah <span className="text-[#03F0FF]">bought</span> 5.7 ETH of ngl{" "}
              <img className="w-[17px]" src="/images/image.png" alt="" />{" "}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
