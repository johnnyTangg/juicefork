"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Contract, JsonRpcProvider, formatUnits } from "ethers";
import { chains } from './Data/Chains';
import { contracts } from './Data/Contracts';
import YieldBondingCurveFactoryABI from './abis/BondingCurveFactory.json';
import YieldBondingCurveABI from './abis/YieldBondingCurve.json';

export default function Home() {
  const [latestCurve, setLatestCurve] = useState({
    address: "",
    name: "",
    symbol: "",
    marketCap: "0",
    holders: "0",
    nextRebase: "TBD",
    metadata: null,
    targetRaise: "0",
    totalRaised: "0"
  });

  const [recentCurves, setRecentCurves] = useState([]);

  const getIpfsUrl = (ipfsUrl) => {
    if (!ipfsUrl) return '';
    // Handle both ipfs:// and direct hash formats
    const hash = ipfsUrl.replace('ipfs://', '').replace('https://ipfs.io/ipfs/', '');
    return `https://ipfs.io/ipfs/${hash}`;
  };

  const fetchMetadata = async (metadataHash) => {
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

  useEffect(() => {
    const fetchCurves = async () => {
      try {
        const chainId = 8453; // Base chain
        const provider = new JsonRpcProvider(chains[chainId].rpc[0]);
        const factory = new Contract(contracts[chainId].BondingCurveFactory, YieldBondingCurveFactoryABI, provider);

        // Get total number of presales
        const count = await factory.getPresalesCount();
        if (count === 0n) return;

        // Get the last 6 presale addresses (or less if there aren't 6 yet)
        const numToFetch = Math.min(6, Number(count));
        const curves = [];

        for (let i = 0; i < numToFetch; i++) {
          const presaleAddress = await factory.getPresaleAt(count - 1n - BigInt(i));
          
          // Get the presale details
          const filter = factory.filters.PresaleCreated(presaleAddress);
          const events = await factory.queryFilter(filter);
          if (events.length === 0) continue;

          const event = events[0];
          const decodedEvent = factory.interface.parseLog({
            topics: event.topics,
            data: event.data
          });
          const name = decodedEvent.args.name;
          const symbol = decodedEvent.args.symbol;
          const metadataHash = decodedEvent.args.metadataHash;
          
          // Fetch metadata if available
          let metadata = null;
          if (metadataHash) {
            console.log('Found metadata hash:', metadataHash);
            metadata = await fetchMetadata(metadataHash);
          }
          
          // Get market cap and other info
          const curveContract = new Contract(presaleAddress, YieldBondingCurveABI, provider);
          const tokenAddress = await curveContract.claimToken();
          const tokenContract = new Contract(
            tokenAddress,
            [
              "function totalSupply() view returns (uint256)",
              "function decimals() view returns (uint8)",
              "function balanceOf(address) view returns (uint256)"
            ],
            provider
          );

          const [totalSupply, decimals, currentPrice, targetRaise, totalRaised] = await Promise.all([
            tokenContract.totalSupply(),
            tokenContract.decimals(),
            curveContract.getCurrentPrice(),
            curveContract.targetRaise(),
            curveContract.totalRaised()
          ]);

          // Get ETH price with fallback and retry logic
          let ethPrice = 2000; // Default fallback price
          try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd', {
              headers: {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
              },
              timeout: 5000 // 5 second timeout
            });
            
            if (response.ok) {
              const data = await response.json();
              if (data?.ethereum?.usd) {
                ethPrice = data.ethereum.usd;
              }
            } else {
              console.warn('Failed to fetch ETH price, using fallback price');
            }
          } catch (error) {
            console.warn('Error fetching ETH price, using fallback price:', error);
          }

          // Convert BigInt values to numbers before multiplication
          const priceInUsd = Number(formatUnits(currentPrice, 18)) * ethPrice;
          const totalSupplyFormatted = Number(formatUnits(totalSupply, Number(decimals)));
          const marketCap = totalSupplyFormatted * priceInUsd;

          // Get holders count
          const holderFilter = curveContract.filters.Purchase();
          const purchaseEvents = await curveContract.queryFilter(holderFilter);
          const uniqueHolders = new Set(purchaseEvents.map(e => e.args?.[0])).size;

          const curve = {
            address: presaleAddress,
            name,
            symbol,
            marketCap: marketCap.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0
            }),
            holders: uniqueHolders.toString(),
            metadata,
            targetRaise,
            totalRaised
          };

          if (i === 0) {
            setLatestCurve(curve);
          }
          curves.push(curve);
        }

        setRecentCurves(curves);
      } catch (error) {
        console.error("Error fetching curves:", error);
      }
    };

    fetchCurves();
  }, []);

  return (
    <section>
      <Link className="text-white flex justify-center" href="/Create">
        [ create new vault ]
      </Link>

      <div className="flex flex-col md:flex-row gap-5 mt-7 mb-8">
        <Link href={`/DAO?ca=${latestCurve.address}`} className="home-cardBg h-[469px] 2xl:h-[700px] w-full p-5">
          <div className="flex text-white items-center text-[11px] gap-[5px]">
            <img src="/images/Star.png" alt="" />
            <p>Featured</p>
          </div>
          <div className="mt-[265px] 2xl:mt-[487px]">
            {latestCurve.metadata?.image ? (
              <img 
                src={getIpfsUrl(latestCurve.metadata.image)} 
                alt={latestCurve.name} 
                className="w-[39px] h-[39px] max-w-[39px] max-h-[39px] object-cover rounded"
              />
            ) : (
              <img src="/images/mlogo.png" alt="" className="w-[39px] max-w-[39px]" />
            )}
            <div className="text-white flex justify-between items-end">
              <div>
                <div className="mb-2">
                  <h2 className="text-2xl">{latestCurve.name || "juice dao"}</h2>
                  <p className="text-sm text-gray-400">({latestCurve.symbol || "JUICE"})</p>
                </div>
                <div className="flex gap-8">
                  <p>Market cap: {latestCurve.marketCap}</p>
                  <p>Holders: {latestCurve.holders}</p>
                </div>
              </div>
              <div>
                <p>next rebase in {latestCurve.nextRebase}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="text-white text-xl mb-4">Recently Deployed</h2>
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
            {recentCurves.map((curve, index) => (
              <Link 
                key={curve.address} 
                href={`/DAO?ca=${curve.address}`} 
                className="border border-white bg-[#0D0E17] rounded-lg p-3 hover:bg-[#1A1B23] transition-colors w-[300px]"
              >
                <div className="flex items-center gap-2 mb-3">
                  {curve.metadata?.image ? (
                    <img 
                      src={getIpfsUrl(curve.metadata.image)} 
                      alt={curve.name} 
                      className="w-10 h-10 max-w-[40px] max-h-[40px] rounded-full object-cover"
                    />
                  ) : (
                    <img 
                      src="/images/mlogo.png" 
                      alt="" 
                      className="w-10 h-10 max-w-[40px] max-h-[40px] rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="text-white text-base">{curve.name || "Unknown"}</h3>
                    <p className="text-gray-400 text-xs">{curve.symbol || "???"}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-white">
                    <span>Progress</span>
                    <span>{(Number(formatUnits(curve.totalRaised, 18)) / Number(formatUnits(curve.targetRaise, 18)) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-[#1a1b1f] rounded h-2">
                    <div 
                      className="bg-[#FFDE30] h-2 rounded transition-all duration-500" 
                      style={{ 
                        width: `${Math.min((Number(formatUnits(curve.totalRaised, 18)) / Number(formatUnits(curve.targetRaise, 18)) * 100), 100)}%`
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{Number(formatUnits(curve.totalRaised, 18)).toFixed(2)} ETH</span>
                    <span className="text-gray-400">{Number(formatUnits(curve.targetRaise, 18)).toFixed(2)} ETH</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between text-sm text-gray-400">
                  <span>Market Cap: {curve.marketCap}</span>
                  <span>Holders: {curve.holders}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
