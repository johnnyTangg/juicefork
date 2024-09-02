import React from "react";

const Vault = () => {
  return (
    <div className="text-white">
      <div className="border bg-[#0000007e] rounded-[6px] w-[479px] mx-auto px-4 py-3">
        <div className="flex items-center gap-[6px]">
          <img className="w-[14px]" src="/images/Star.png" alt="" />
          <p className="text-xs text-[#03F0FF]">Vault</p>
        </div>

        <p className="my-3 text-[13px]">Edit your vault parameters here.</p>

        <div>
          <div className="grid grid-cols-2 gap-y-3 gap-x-10 mb-3">
            <div>
              <label className="text-[11px]" htmlFor="name">
                total token supply
              </label>
              <input
                type="text"
                className="w-[181px] block border rounded bg-[#ffffff11]"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="text-[11px]" htmlFor="name">
                how many days to payout bonds?
              </label>
              <input
                type="text"
                className="w-[181px] block border rounded bg-[#ffffff11]"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="text-[11px]" htmlFor="name">
                null
              </label>
              <input
                type="text"
                className="w-[181px] block border rounded bg-[#ffffff11]"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="text-[11px]" htmlFor="name">
                null
              </label>
              <input
                type="text"
                className="w-[181px] block border rounded bg-[#ffffff11]"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="text-[11px]" htmlFor="name">
                marketing wallet (you control)
              </label>
              <input
                type="text"
                className="w-[181px] block border rounded bg-[#ffffff11]"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="text-[11px]" htmlFor="name">
                null
              </label>
              <input
                type="text"
                className="w-[181px] block border rounded bg-[#ffffff11]"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="text-[11px]" htmlFor="name">
                null
              </label>
              <input
                type="text"
                className="w-[181px] block border rounded bg-[#ffffff11]"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="text-[11px]" htmlFor="name">
                null
              </label>
              <input
                type="text"
                className="w-[181px] block border rounded bg-[#ffffff11]"
                name=""
                id=""
              />
            </div>
          </div>
          <div>
            <label className="text-[11px]" htmlFor="name">
              custom background image (optional, 0.2 ETH)
            </label>
            <input
              type="image"
              className="block rounded"
              name=""
              id=""
              src="/images/imgInp.png"
            />
          </div>
        </div>
        <p className="text-[13px] mb-5  mt-9">
          Each token is launched on{" "}
          <span className="text-[#FB30FF]">Uniswap v3</span>, and collects 1%
          pool fees to fuel your token rewards. (staker & treasury funding)
        </p>
        <p className="text-[8px] mb-9">
          Juice takes 0.2% of new bond buys + new stakes & 3% of the LP tokens
          to help keep the lights on.
        </p>
        <div className="mb-10 flex flex-col justify-center">
          <button className="text-xl">[ save ]</button>
        </div>
      </div>
    </div>
  );
};

export default Vault;
