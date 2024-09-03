import React from "react";

const Vault = () => {
  return (
    <div className="text-white my-10 md:my-16">
      <div className="border bg-[#0000007e] rounded-[6px] w-full md:w-[479px] 2xl:w-[800px] mx-auto px-4 2xl:px-6 py-3 2xl:py-5">
        <div className="flex items-center gap-[6px]">
          <img className="w-[14px] 2xl:w-[20px]" src="/images/Star.png" alt="" />
          <p className="text-xs 2xl:text-xl text-[#03F0FF]">Vault</p>
        </div>

        <p className="my-3 text-[13px] 2xl:text-xl">Edit your vault parameters here.</p>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 2xl:gap-y-6 gap-x-10 mb-9">
            <div>
              <label className="text-[11px] 2xl:text-lg" htmlFor="name">
                total token supply
              </label>
              <input
                type="text"
                className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="text-[11px] 2xl:text-lg" htmlFor="name">
                how many days to payout bonds?
              </label>
              <input
                type="text"
                className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="text-[11px] 2xl:text-lg" htmlFor="name">
                null
              </label>
              <input
                type="text"
                className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="text-[11px] 2xl:text-lg" htmlFor="name">
                null
              </label>
              <input
                type="text"
                className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="text-[11px] 2xl:text-lg" htmlFor="name">
                marketing wallet (you control)
              </label>
              <input
                type="text"
                className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="text-[11px] 2xl:text-lg" htmlFor="name">
                null
              </label>
              <input
                type="text"
                className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="text-[11px] 2xl:text-lg" htmlFor="name">
                null
              </label>
              <input
                type="text"
                className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="text-[11px] 2xl:text-lg" htmlFor="name">
                null
              </label>
              <input
                type="text"
                className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
                name=""
                id=""
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] 2xl:text-lg" htmlFor="name">
              custom background image (optional, 0.2 ETH)
            </label>
            <input
              type="image"
              className="block rounded h-auto 2xl:h-7"
              name=""
              id=""
              src="/images/imgInp.png"
            />
          </div>
        </div>
        <p className="text-[13px] 2xl:text-lg mb-5  mt-9">
          Each token is launched on{" "}
          <span className="text-[#FB30FF]">Uniswap v3</span>, and collects 1%
          pool fees to fuel your token rewards. (staker & treasury funding)
        </p>
        <p className="text-[8px] 2xl:text-sm mb-9">
          Juice takes 0.2% of new bond buys + new stakes & 3% of the LP tokens
          to help keep the lights on.
        </p>
        <div className="mb-10 flex flex-col justify-center">
          <button className="text-xl 2xl:text-3xl">[ save ]</button>
        </div>
      </div>
    </div>
  );
};

export default Vault;
