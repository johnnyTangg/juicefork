"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getClonesByPage } from "../API/CloneYard";
import { contracts } from "../Data/Contracts";
import type { DAO } from "../Data/CloneYard";
import { useDao } from "../../context/DAO";
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { Contract, JsonRpcProvider, formatUnits, parseUnits } from "ethers";
import { chains } from "../Data/Chains";
import YieldBondingCurveFactoryABI from '../abis/BondingCurveFactory.json';
import YieldBondingCurveABI from '../abis/YieldBondingCurve.json';
import { getTokenInfo } from "../API/ERC20Helpers";
import { EventLog } from "ethers";
import { getIpfsUrl } from '../utils/ipfs';

interface BondingCurveInfo {
  address: string;
  token: {
    name: string;
    symbol: string;
    address: string;
    decimals: number;
  };
  targetRaise: string;
  totalRaised: string;
  metadata: any;
}

const DirectoryPage = () => {
  const { selectedDao, setSelectedDao } = useDao();
  const [expandedRow, setExpandedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [allDaos, setAllDaos] = useState<DAO[]>([]);
  const [bondingCurves, setBondingCurves] = useState<BondingCurveInfo[]>([]);
  const [error, setError] = useState<string>("");
  const { chainId } = useWeb3ModalAccount();

  useEffect(() => {
    fetchAllDaos(page);
    fetchBondingCurves();
  }, [page, chainId]);

  const fetchMetadata = async (metadataHash: string) => {
    try {
      const response = await fetch(getIpfsUrl(metadataHash));
      if (!response.ok) throw new Error('Failed to fetch metadata');
      const data = await response.json();
      console.log('Fetched metadata:', data);
      return data;
    } catch (error) {
      console.error('Error fetching metadata:', error);
      return null;
    }
  };

  const fetchBondingCurves = async () => {
    try {
      if (!chainId) {
        console.log("Chain ID not available");
        return;
      }

      const factoryAddress = contracts[chainId]?.BondingCurveFactory;
      if (!factoryAddress) {
        console.log(`BondingCurveFactory not found on chain ${chainId}`);
        return;
      }

      console.log("Fetching bonding curves from factory:", factoryAddress);
      const provider = new JsonRpcProvider(chains[chainId].rpc[0]);
      const factory = new Contract(factoryAddress, YieldBondingCurveFactoryABI, provider);

      // Get PresaleCreated events
      const filter = factory.filters.PresaleCreated();
      const events = await factory.queryFilter(filter);
      console.log("Found events:", events);

      const curves: BondingCurveInfo[] = [];
      
      for (const event of events) {
        try {
          const eventLog = event as EventLog;
          console.log('Processing event:', eventLog);
          
          const decodedEvent = factory.interface.parseLog({
            topics: eventLog.topics,
            data: eventLog.data
          });
          console.log('Decoded event:', decodedEvent);

          if (!decodedEvent) {
            console.log('Failed to decode event');
            continue;
          }

          const presaleAddress = decodedEvent.args.presale;
          const tokenAddress = decodedEvent.args.token;
          const name = decodedEvent.args.name;
          const symbol = decodedEvent.args.symbol;
          const metadataHash = decodedEvent.args.metadataHash;

          if (!presaleAddress || !tokenAddress) {
            console.log('Missing presale or token address');
            continue;
          }

          console.log("Processing presale:", {
            presaleAddress,
            tokenAddress,
            name,
            symbol,
            metadataHash
          });

          // Fetch metadata if available
          let metadata = null;
          if (metadataHash) {
            console.log('Found metadata hash:', metadataHash);
            metadata = await fetchMetadata(metadataHash);
            console.log('Fetched metadata:', metadata);
          }

          // Create contract instance for the presale contract
          const presaleContract = new Contract(presaleAddress, YieldBondingCurveABI, provider);
          
          // Fetch target raise and total raised
          let targetRaise = "0";
          let totalRaised = "0";
          
          try {
            // Use hardcoded target raise value
            targetRaise = parseUnits("6.29", 18).toString();
            totalRaised = await presaleContract.totalRaised();
          } catch (error) {
            console.error("Error fetching presale info:", error);
            continue;
          }

          curves.push({
            address: presaleAddress,
            token: {
              name: name || "Unknown",
              symbol: symbol || "???",
              address: tokenAddress,
              decimals: 18
            },
            targetRaise: targetRaise.toString(),
            totalRaised: totalRaised.toString(),
            metadata
          });
        } catch (error) {
          console.error("Error processing curve:", error);
          continue;
        }
      }

      console.log("Processed curves:", curves);
      setBondingCurves(curves);
    } catch (error) {
      console.error("Error fetching bonding curves:", error);
      setError("Failed to fetch bonding curves");
    }
  };

  const fetchAllDaos = async (page: number) => {
    try {
      setError("");
      
      if (!chainId) {
        setError("Please connect your wallet");
        return;
      }

      const cloneYardAddress = contracts[chainId]?.CloneYard;
      if (!cloneYardAddress) {
        setError(`CloneYard contract not found on chain ${chainId}`);
        return;
      }

      console.log(`Fetching DAOs from CloneYard on chain ${chainId}:`, cloneYardAddress);
      const daos = await getClonesByPage(page, cloneYardAddress, chainId);
      setAllDaos(daos);
    } catch (error) {
      console.error("Error fetching DAOs:", error);
      setError("Failed to fetch DAOs");
    }
  }

  const handleRowClick = (index: any) => {
    if (expandedRow !== index) {
      setSelectedDao(allDaos[index]);
    }
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleNextPageClick = () => {
    setPage((_)=>{return page + 1})
  }
  const handlePreviousPageClick = () => {
    setPage((_)=>{return page - 1})
  }

  return (
    <>
      <div className="mx-auto lg:px-4 sm:px-4 px-4 border rounded-lg my-[40px] overflow-x-auto w-[100%] max-w-[857px]">
        <div className="py-8">
          <h3 className="text-[22px] text-white font-[700] mb-8">
            Active Presales{" "}
            <span className="text-[12px] text-white font-[400]">
              (bonding curves)
            </span>
          </h3>

          <div className="lg:mx-4 sm:-mx-8 px-4 sm:px-2 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg relative overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="py-3 px-4 lg:px-0 2xl:px-0 bg-transparent text-left text-[13px] text-[#949494] capitalize tracking-wider"></th>
                    <th className="py-3 px-4 lg:px-0 2xl:px-0 bg-transparent text-left text-[13px] text-[#949494] capitalize tracking-wider">
                      Token
                    </th>
                    <th className="py-3 px-4 lg:px-0 2xl:px-0 text-left text-[13px] text-[#949494] capitalize tracking-wider">
                      Target Raise
                    </th>
                    <th className="py-3 px-4 lg:px-0 2xl:px-0 text-left text-[13px] text-[#949494] capitalize tracking-wider">
                      Total Raised
                    </th>
                    <th className="py-3 px-4 lg:px-0 2xl:px-0 text-left text-[13px] text-[#949494] capitalize tracking-wider">
                      Progress
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bondingCurves && bondingCurves.length > 0 ? (
                    bondingCurves.map((curve, index) => (
                      <React.Fragment key={curve.address}>
                        <tr onClick={() => handleRowClick(index)} className="cursor-pointer">
                          <td>
                            <span className="text-[13px] text-[#FFDE30]">
                              #{index + 1}
                            </span>
                          </td>
                          <td className="py-2 px-4 lg:px-0 2xl:px-0 bg-transparent text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-[22px] h-[22px]">
                                {curve.metadata?.image && typeof curve.metadata.image === 'string' ? (
                                  <img
                                    className="w-full h-full rounded-full object-cover"
                                    src={getIpfsUrl(curve.metadata.image)}
                                    alt={curve.token.name}
                                  />
                                ) : (
                                  <img
                                    className="w-full h-full rounded-full"
                                    src={`https://robohash.org/${curve.token.address}`}
                                    alt={curve.token.name}
                                  />
                                )}
                              </div>
                              <div className="ml-3">
                                <h4 className="text-white text-[12px]">
                                  {curve.token.name} ({curve.token.symbol})
                                </h4>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 px-4 lg:px-0 2xl:px-0 bg-transparent text-sm">
                            <h4 className="text-white text-[12px]">
                              {Number(formatUnits(curve.targetRaise, 18)).toFixed(2)} ETH
                            </h4>
                          </td>
                          <td className="py-2 px-4 lg:px-0 2xl:px-0 bg-transparent text-sm">
                            <h4 className="text-white text-[12px]">
                              {Number(formatUnits(curve.totalRaised, 18)).toFixed(2)} ETH
                            </h4>
                          </td>
                          <td className="py-2 px-4 lg:px-0 2xl:px-0 bg-transparent text-sm">
                            <div className="flex flex-col gap-1">
                              <h4 className="text-white text-[12px]">
                                {(Number(formatUnits(curve.totalRaised, 18)) / Number(formatUnits(curve.targetRaise, 18)) * 100).toFixed(1)}%
                              </h4>
                              <div className="w-32 bg-[#1a1b1f] rounded h-2">
                                <div 
                                  className="bg-[#FFDE30] h-2 rounded transition-all duration-500" 
                                  style={{ 
                                    width: `${Math.min((Number(formatUnits(curve.totalRaised, 18)) / Number(formatUnits(curve.targetRaise, 18)) * 100), 100)}%`
                                  }}
                                ></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        {expandedRow === index && (
                          <tr>
                            <td colSpan={5} className="py-2 px-4">
                              <div className="flex justify-start space-x-2">
                                <Link href={`/DAO?ca=${curve.address}`} className="bg-blue-500 text-white px-3 py-1 rounded">
                                  Trade
                                </Link>
                                <Link href={`/STAKE?ca=${curve.address}`} className="bg-green-500 text-white px-3 py-1 rounded">
                                  Stake
                                </Link>
                                <Link href={`/BOND?ca=${curve.address}`} className="bg-red-500 text-white px-3 py-1 rounded">
                                  Bond
                                </Link>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-white text-center">
                        No active presales
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>
    </>
  );
};

export default DirectoryPage;
