import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="px-2 md:px-6 mb-3 md:mb-0">
      <div className="flex justify-between">
        <div>
          <Link href="/">
            <img src="/images/logo.png" alt="" />
          </Link>
          <div className="text-white">
            <Link className="underline" href="https://www.juice.fun/">
              daos
            </Link>
            <Link className="underline ml-[11px]" href="https://x.com/juicedotfun">
              twitter
            </Link>
            <Link className="underline ml-[11px]" href="https://t.me/juicedotfun">
              telegram
            </Link>
            <Link className="underline block" href="https://docs.juice.fun/">
              documentation
            </Link>
          </div>
        </div>
        <div className="mt-6">
          <Link className="text-white" href="/">
            [ connect wallet ]
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
