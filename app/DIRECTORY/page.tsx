"use client"
import React, { useState } from "react";
import { testDaos } from "../Data/TestData";
import Link from "next/link";

const DirectoryPage = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const allDaos = testDaos;

  const handleRowClick = (index: any) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <>
      <div className="mx-auto lg:px-4 sm:px-4 px-4 border rounded-lg my-[40px] overflow-x-auto w-[100%] max-w-[857px]">
        <div className="py-8">
          <h3 className="text-[22px] text-white font-[700]">
            Directory{" "}
            <span className="text-[12px] text-white font-[400]">
              (all daos)
            </span>
          </h3>
          <div className="lg:mx-4 sm:-mx-8 px-4 sm:px-2 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg relative overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="py-3 px-4 lg:px-0 2xl:px-0 bg-transparent text-left text-[13px] text-[#949494] capitalize tracking-wider"></th>
                    <th className="py-3 px-4 lg:px-0 2xl:px-0 bg-transparent text-left text-[13px] text-[#949494] capitalize tracking-wider">
                      Vault (Coin)
                    </th>
                    <th className="py-3 px-4 lg:px-0 2xl:px-0 text-left text-[13px] text-[#949494] capitalize tracking-wider">
                      Market Cap
                    </th>
                    <th className="py-3 px-4 lg:px-0 2xl:px-0 text-left text-[13px] text-[#949494] capitalize tracking-wider">
                      5D Change
                    </th>
                    <th className="py-3 px-4 lg:px-0 2xl:px-0 text-left text-[13px] text-[#949494] capitalize tracking-wider">
                      Daily Volume
                    </th>
                    <th className="py-3 px-4 lg:px-0 2xl:px-0 text-left text-[13px] text-[#949494] capitalize tracking-wider">
                      Holders
                    </th>
                    <th className="py-3 px-4 lg:px-0 2xl:px-0 text-left text-[13px] text-[#949494] capitalize tracking-wider">
                      Bond Discount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allDaos && allDaos.length > 0 ? (
                    allDaos.map((dao, index) => (
                      <React.Fragment key={`${dao.id}-${index}`}>
                        <tr onClick={() => handleRowClick(index)} className="cursor-pointer">
                          <td>
                            <span className="text-[13px] text-[#FFDE30]">
                              #{index + 1}
                            </span>
                          </td>
                          <td className="py-2 px-4 lg:px-0 2xl:px-0 bg-transparent text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-[22px] h-[22px]">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={dao.image}
                                  alt={dao.name}
                                />
                              </div>
                              <div className="ml-3">
                                <h4 className="text-white text-[12px]">
                                  {dao.name}
                                </h4>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 px-4 lg:px-0 2xl:px-0 bg-transparent text-sm">
                            <h4 className="text-white text-[12px]">
                              {dao.marketcap}
                            </h4>
                          </td>
                          <td className="py-2 px-4 lg:px-0 2xl:px-0 bg-transparent text-sm">
                            <h4 className="text-[#64FF4A] text-[12px]">
                              {dao.change5D}
                            </h4>
                          </td>
                          <td className="py-2 px-4 lg:px-0 2xl:px-0 bg-transparent text-sm">
                            <h4 className="text-white text-[12px]">
                              {dao.dailyVolume}
                            </h4>
                          </td>
                          <td className="py-2 px-4 lg:px-0 2xl:px-0 bg-transparent text-sm">
                            <h4 className="text-white text-[12px]">
                              {dao.holders}
                            </h4>
                          </td>
                          <td className="py-2 px-4 lg:px-0 2xl:px-0 bg-transparent text-sm">
                            <h4 className="text-white text-[12px]">
                              {dao.bondDiscount}
                            </h4>
                          </td>
                        </tr>
                        {expandedRow === index && (
                          <tr>
                            <td colSpan={7} className="py-2 px-4">
                              <div className="flex justify-start space-x-2">
                                <Link href={`/STAKE?ca=${dao.tokenAddress}`} className="bg-blue-500 text-white px-3 py-1 rounded">
                                  Stake
                                </Link>
                                <Link href={`/REBASE?ca=${dao.tokenAddress}`} className="bg-green-500 text-white px-3 py-1 rounded">
                                  Rebase
                                </Link>
                                <Link href="/BOND" className="bg-red-500 text-white px-3 py-1 rounded">
                                  Buy Bond
                                </Link>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-white text-center">
                        No DAOs available
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
