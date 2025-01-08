"use client"
import React, { useEffect, useState } from "react";
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract, formatUnits, parseUnits, JsonRpcProvider } from "ethers"
import { chains } from "../Data/Chains";
import YieldBondingCurveABI from '../abis/YieldBondingCurve.json';
import { getTokenInfo } from "../API/ERC20Helpers";
import type { IToken } from "../Data/Tokens";

const GENESISPOOL = () => {
  const [bondingCurveAddress, setBondingCurveAddress] = useState("");
  const [tokenInfo, setTokenInfo] = useState<IToken | null>(null);
  const [claimableAmount, setClaimableAmount] = useState("0");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalClaimed, setTotalClaimed] = useState("0");
  const [totalClaimable, setTotalClaimable] = useState("0");

  const { walletProvider } = useWeb3ModalProvider()
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  useEffect(() => {
    const fetchQueryParam = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const myParam = urlParams.get('ca');
      if (myParam) setBondingCurveAddress(myParam);
    };

    const fetchTokenInfo = async () => {
      if (!bondingCurveAddress || !chainId) return;
      
      try {
        const provider = new JsonRpcProvider(chains[chainId].rpc[0]);
        const curveContract = new Contract(bondingCurveAddress, YieldBondingCurveABI, provider);
        const claimTokenAddress = await curveContract.claimToken();
        setTokenInfo(await getTokenInfo(claimTokenAddress, chainId, address ?? ""));
      } catch (error) {
        console.error("Error fetching token info:", error);
        setError("Failed to fetch token info");
      }
    }

    const fetchClaimableAmount = async () => {
      if (!bondingCurveAddress || !chainId || !address) return;

      try {
        const provider = new JsonRpcProvider(chains[chainId].rpc[0]);
        const curveContract = new Contract(bondingCurveAddress, YieldBondingCurveABI, provider);
        
        const [claimable, claimed, total] = await Promise.all([
          curveContract.claimableAmount(address),
          curveContract.claimed(address),
          curveContract.claimableAmount("0x0000000000000000000000000000000000000000")
        ]);

        setClaimableAmount(claimable.toString());
        setTotalClaimed(claimed.toString());
        setTotalClaimable(total.toString());
      } catch (error) {
        console.error("Error fetching claimable amount:", error);
        setError("Failed to fetch claimable amount");
      }
    }

    fetchQueryParam();
    fetchTokenInfo();
    fetchClaimableAmount();
  }, [address, chainId, bondingCurveAddress]);

  const handleClaim = async () => {
    try {
      setError("");
      setLoading(true);

      if (!isConnected) {
        setError("Please connect your wallet");
        return;
      }
      if (!chainId) {
        setError("Chain ID not available");
        return;
      }
      if (!bondingCurveAddress) {
        setError("Bonding curve address not available");
        return;
      }
      if (!walletProvider) {
        setError("Wallet provider not available");
        return;
      }

      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const curveContract = new Contract(
        bondingCurveAddress,
        YieldBondingCurveABI,
        signer
      );

      const tx = await curveContract.getReward();
      await tx.wait();
      
      // Refresh claimable amount
      const provider = new JsonRpcProvider(chains[chainId].rpc[0]);
      const viewContract = new Contract(bondingCurveAddress, YieldBondingCurveABI, provider);
      const [claimable, claimed] = await Promise.all([
        viewContract.claimableAmount(address),
        viewContract.claimed(address)
      ]);
      setClaimableAmount(claimable.toString());
      setTotalClaimed(claimed.toString());
      
    } catch (error) {
      console.error("Claim error:", error);
      setError("Failed to claim tokens");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] text-white">
      <div className="w-full max-w-md bg-[#0D0E17] rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-8 text-center">Genesis Pool</h1>
        
        <div className="mb-6">
          <p className="text-sm mb-2">Token: {tokenInfo?.symbol || ""}</p>
          <p className="text-sm mb-2">Total Claimable: {Number(formatUnits(totalClaimable, 18)).toFixed(5)} {tokenInfo?.symbol || ""}</p>
          <p className="text-sm mb-2">Your Claimed: {Number(formatUnits(totalClaimed, 18)).toFixed(5)} {tokenInfo?.symbol || ""}</p>
          <p className="text-sm mb-4">Claimable Amount: {Number(formatUnits(claimableAmount, 18)).toFixed(5)} {tokenInfo?.symbol || ""}</p>
        </div>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <button 
          onClick={handleClaim}
          disabled={loading || !isConnected || BigInt(claimableAmount) === BigInt(0)}
          className="w-full bg-white text-black py-2 rounded-lg font-bold disabled:opacity-50"
        >
          {loading ? "Claiming..." : isConnected ? "Claim" : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default GENESISPOOL;
