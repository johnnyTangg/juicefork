"use client";
import Link from "next/link";
import React from "react";

import ConnectButton from "./ConnectButton";
const Navbar = () => {
  return (

      <div className="px-2 md:px-6 mb-3 md:mb-0">
        <div className="flex justify-between">
          <div>
            <Link href="/">
              <img src="/images/logo.png" alt="" />
            </Link>
            <div className="text-white">
              <Link className="underline" href="/DIRECTORY">
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
            <ConnectButton />
          </div>
        </div>
      </div>    
  );
};

export default Navbar;
