"use client";
import { useEffect, useRef, useState } from "react";
import { useWeb3Modal, useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { rebase } from "../API/Stake";
import { contracts } from "../Data/Contracts";
import { getTokenInfo } from "../API/ERC20Helpers";
import { IToken } from "../Data/Tokens";
import { useDao } from "../../context/DAO";

const RebasePage = () => {
  const container = useRef < HTMLDivElement | null > (null);
  const [selectedLink, setSelectedLink] = useState('bond');
  const [actionTitle, setActionTitle] = useState('connect wallet');
  const [tokenInfo, setTokenInfo] = useState<IToken | null>(null);
  const { walletProvider } = useWeb3ModalProvider()
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { selectedDao, setSelectedDao } = useDao();

  let tokenAddress = '';

  useEffect(() => {
    const fetchQueryParam = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const myParam = urlParams.get('ca');
      console.log("token address:", myParam);
      if(myParam) tokenAddress = myParam;
    };
    const fetchTokenInfo = async () => {
      if(!tokenAddress) return;
      setTokenInfo(await getTokenInfo(tokenAddress, address ?? ""));
    }

    if(selectedDao && selectedDao.OHM){//user came from the directory
      console.log('already have token info from directory');
      setTokenInfo(selectedDao.OHM);
    }
    else{//user navigated directly to the page
      console.log('user navigated directly, missing dao/token info');
      fetchQueryParam();
      fetchTokenInfo();
    }

  }, [address])

  useEffect(() => {
      console.log('updating actiontitle...');
      if (isConnected && tokenInfo) {
          setActionTitle(`rebase ${tokenInfo.symbol || "ERR"}`);
      } else {
          setActionTitle('connect wallet');
      }
  }, [isConnected, tokenInfo]);

  async function onActionClick() {
    if (!isConnected) {
      const { open } = useWeb3Modal()
      open();
    }else{
      _rebase();
    }
  }

  async function _rebase() {
    if(!walletProvider || !address) return;
    const tx = await rebase(
      selectedDao?.staking || "",
      walletProvider
    )
  }

  return (
    <div className="flex  items-center justify-center  gap-16 text-white mt-12 mb-28 2xl:h-[80vh] lg:h-[90vh] h-[90vh] P-[50PX]">
      <div className="w-full md:w-[470px] 2xl:w-[36%] pb-4">
        <div className="border px-[1.5rem] pt-[2rem] pb-[2.5rem] 2xl:p-8 rounded-[6px] bg-[#0D0E17]">
          <div className="flex items-center gap-2 ">
            <img src="/images/star2.png" className="w-[14px]" alt="" />
            <h3 className="text-[13px] text-[#fff] dmsans">
              Rebase {" "}
              <span className="text-[#03F0FF] font-bold text-[13px]">{tokenInfo?.symbol || ""}</span>
            </h3>
          </div>

          <h3 className="text-white text-[14px]  mt-[11px] dmsans ">
            {tokenInfo?.symbol || ""} needs your help rebasing!
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
            <button onClick={onActionClick}
              className="text-center text-white text-[20px] font-[700]"
            >
              [ {actionTitle} ]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RebasePage;
