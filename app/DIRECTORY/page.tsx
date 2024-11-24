"use client"
import React, { useEffect, useState } from "react";
// import { testDaos } from "../Data/TestData";
import Link from "next/link";
import { getClonesByPage } from "../API/CloneYard";
import { contracts } from "../Data/Contracts";
import type { DAO } from "../Data/CloneYard";
import { useDao } from "../../context/DAO";
import type { IToken } from "../Data/Tokens";

const DirectoryPage = () => {
  const { selectedDao, setSelectedDao } = useDao();
  const [expandedRow, setExpandedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [allDaos, setAllDaos] = useState<DAO[]>([]);

  useEffect(() => {
    fetchAllDaos(page);
  }, [page]);

  const fetchAllDaos = async (page: number) => {
    //TODO: uncomment after deploying new cloneYard
    
    const daos = await getClonesByPage(page, contracts['CloneYard']);
    // const daos = testDaos;
    setAllDaos(daos);
  }

  const handleRowClick = (index: any) => {
    if (expandedRow !== index) {
      setSelectedDao(allDaos[index]);
    }
    setExpandedRow(expandedRow === index ? null : index);
    console.log('selected dao', selectedDao);
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
                      <React.Fragment key={`${dao.olympusAuthority}-${index}`}>
                        <tr onClick={() => handleRowClick(index)} className="cursor-pointer">
                          <td>
                            <span className="text-[13px] text-[#FFDE30]">
                              #{(index + 1) + ((page-1) * 10)}
                            </span>
                          </td>
                          <td className="py-2 px-4 lg:px-0 2xl:px-0 bg-transparent text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-[22px] h-[22px]">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={dao.OHM?.logoURI || `https://robohash.org/${Math.floor(100000 + Math.random() * 900000)}`}
                                  alt={dao.OHM?.name}
                                />
                              </div>
                              <div className="ml-3">
                                <h4 className="text-white text-[12px]">
                                  {dao.OHM?.name}
                                </h4>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 px-4 lg:px-0 2xl:px-0 bg-transparent text-sm">
                            <h4 className="text-white text-[12px]">
                              {/* {dao.marketcap} */}{'TBD'}
                            </h4>
                          </td>
                          <td className="py-2 px-4 lg:px-0 2xl:px-0 bg-transparent text-sm">
                            <h4 className="text-[#64FF4A] text-[12px]">
                              {/* {dao.change5D} */}{'TBD'}
                            </h4>
                          </td>
                          <td className="py-2 px-4 lg:px-0 2xl:px-0 bg-transparent text-sm">
                            <h4 className="text-white text-[12px]">
                              {/* {dao.dailyVolume} */}{'TBD'}
                            </h4>
                          </td>
                          <td className="py-2 px-4 lg:px-0 2xl:px-0 bg-transparent text-sm">
                            <h4 className="text-white text-[12px]">
                              {/* {dao.holders} */}{'TBD'}
                            </h4>
                          </td>
                          <td className="py-2 px-4 lg:px-0 2xl:px-0 bg-transparent text-sm">
                            <h4 className="text-white text-[12px]">
                              {/* {dao.bondDiscount} */}{'TBD'}
                            </h4>
                          </td>
                        </tr>
                        {expandedRow === index && (
                          <tr>
                            <td colSpan={7} className="py-2 px-4">
                              <div className="flex justify-start space-x-2">
                                <Link href={`/STAKE?ca=${dao.OHM?.address}`} className="bg-blue-500 text-white px-3 py-1 rounded">
                                  Stake
                                </Link>
                                <Link href={`/REBASE?ca=${dao.OHM?.address}`} className="bg-green-500 text-white px-3 py-1 rounded">
                                  Rebase
                                </Link>
                                <Link href={`/BOND?ca=${dao.OHM?.address}`} className="bg-red-500 text-white px-3 py-1 rounded">
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
              <div className="text-white flex justify-between items-center">
                <button className="text-[30px]" disabled={page === 1} onClick={handlePreviousPageClick}>{"<"}</button>
                <p>Page: {page}</p>
                <button className="text-[30px]" disabled={allDaos.length === 0 || !allDaos} onClick={handleNextPageClick}>{">"}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectoryPage;
