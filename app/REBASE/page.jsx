import Link from "next/link";

const RebasePage = () => {
  return (
    <div className="flex  items-center justify-center  gap-16 text-white mt-12 mb-28 2xl:h-[80vh] lg:h-[90vh] h-[90vh] P-[50PX]">
      <div className="w-full md:w-[470px] 2xl:w-[36%] pb-4">
        <div className="border px-[1.5rem] pt-[2rem] pb-[2.5rem] 2xl:p-8 rounded-[6px] bg-[#0D0E17]">
          <div className="flex items-center gap-2 ">
            <img src="/images/star2.png" className="w-[14px]" alt="" />
            <h3 className="text-[13px] text-[#fff] dmsans">
              Rebase{" "}
              <span className="text-[#03F0FF] font-bold text-[13px]">$SPX</span>
            </h3>
          </div>

          <h3 className="text-white text-[14px]  mt-[11px] dmsans ">
            SPX needs your help rebasing!
            <br />
          </h3>
          <h3 className="text-white text-[14px]  mt-[11px] dmsans">
            Click the button below to manually{" "}
            <span className="text-[#FF1DE8] text-[14px]  mt-[11px]">
              execute a rebase transaction onchain.
            </span>
          </h3>
          <br />
          <br />
          <h3 className="text-white text-[14px]  mt-[11px] dmsans">
            You’ll receive{" "}
            <span className="text-[#03F0FF] text-[14px]  mt-[11px]">
              incentive points{" "}
            </span>
            to do so.
          </h3>
          <h4 className="text-white text-[13px]  mt-[11px] dmsans">
            All incentive points are sent to the caller’s wallet{" "}
            <b>on the base blockchain</b>
          </h4>
          <div className="flex items-center justify-center mt-[37px]">
            <img
              src="/images/image1.png"
              alt=""
              className="w-[65px] h-[64px]"
            />
          </div>
          <div className="text-center mt-[30px]">
            <Link
              href={"/"}
              className="text-center text-white text-[20px] font-[700]"
            >
              [ rebase ]
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RebasePage;
