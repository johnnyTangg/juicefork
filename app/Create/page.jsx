import React from "react";

const Create = () => {
  return (
    <div className="text-white">
      <div className="border bg-[#0000007e] rounded-[6px] w-[479px] mx-auto px-4 py-3">
        <div className="flex items-center gap-[6px]">
          <img className="w-[14px]" src="/images/Star.png" alt="" />
          <p className="text-xs text-white">
            Embark on a <span className="text-[#03F0FF]">new journey...</span>
          </p>
        </div>

        <p className="my-3 text-[13px]">
          juice allows anyone to create a new token and spin up a decentralized
          reserve currency, or “dao”.
        </p>

        <p className="text-[13px] mb-[10px]">
          Cost: 0.01 eth (+gas & deployment fees)
        </p>

        <div className="grid grid-cols-2 gap-y-3 gap-x-10 mb-9">
          <div>
            <label className="text-[11px]" htmlFor="name">
              name
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
              twitter link (optional)
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
              ticker
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
              telegram link (optional)
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
              description
            </label>
            <textarea
              type="text"
              className="w-[181px] block border rounded bg-[#ffffff11]"
              name=""
              id=""
            />
          </div>
          <div>
            <label className="text-[11px]" htmlFor="name">
              website link (optional)
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
              token logo (png - 500x500px)
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
        <p className="text-xs mb-5">
          Once these parameters are filled, press “launch”.
        </p>
        <p className="text-xs mb-9">
          Your coin will then be{" "}
          <span className="text-[#03F0FF]">launched on Ethereum</span>, and you
          can then setup your{" "}
          <span className="text-[#03F0FF]">vault settings.</span>
        </p>
        <div className="mb-10 flex flex-col justify-center">
          <button className="text-xl">[ launch ]</button>
          <p className="text-xs text-center">Cost: 0.01 eth (+gas & deployment fees)</p>
        </div>
      </div>
    </div>
  );
};

export default Create;
