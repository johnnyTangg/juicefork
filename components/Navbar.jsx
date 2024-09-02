import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="px-6">
      <div className="flex justify-between">
        <div>
          <img src="/images/logo.png" alt="" />
          <div className="text-white">
            <Link className="underline" href="/">
              daos
            </Link>
            <Link className="underline ml-[11px]" href="/">
              twitter
            </Link>
            <Link className="underline ml-[11px]" href="/">
              telegram
            </Link>
            <Link className="underline block" href="/">
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
