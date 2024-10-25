const DirectoryPage = () => {
  const allDaos = [
    {
      id: 1,
      image: "https://i.ibb.co.com/jDjXfk8/1.png",
      name: "Juice DAO",
      marketcap: "$667,028,46",
      change5D: "+72%",
      dailyVolume: "$144,002,532 USD",
      holders: "19,792",
      bondDiscount: "4%",
    },
    {
      id: 2,
      image: "https://i.ibb.co.com/zRqP3Zw/2.png",
      name: "retardio",
      marketcap: "$130,325,111",
      change5D: "+59%",
      dailyVolume: "$38,784,273 USD",
      holders: "9,023",
      bondDiscount: "3%",
    },
    {
      id: 3,
      image: "https://i.ibb.co.com/LJXVbzM/3.png",
      name: "poopy guys",
      marketcap: "$53,352,998",
      change5D: "+45%",
      dailyVolume: "$16,426,273 USD",
      holders: "6234",
      bondDiscount: "2%",
    },
    {
      id: 4,
      image: "https://i.ibb.co.com/5TMZHVd/4.png",
      name: "APE",
      marketcap: "$29,444,523",
      change5D: "+38%",
      dailyVolume: "$10,049,402 USD",
      holders: "4273",
      bondDiscount: "4%",
    },
    {
      id: 5,
      image: "https://i.ibb.co.com/LYjSvx0/5.png",
      name: "high eye order",
      marketcap: "$13,069,780",
      change5D: "+22%",
      dailyVolume: "8,238,520 USD",
      holders: "3,257",
      bondDiscount: "3%",
    },
    {
      id: 6,
      image: "https://i.ibb.co.com/wNL2GkN/6.png",
      name: "green circle",
      marketcap: "$7,634,22",
      change5D: "+11%",
      dailyVolume: "$4,022,742 USD",
      holders: "2,846",
      bondDiscount: "2%",
    },
    {
      id: 7,
      image: "https://i.ibb.co.com/KWQL6qk/7.png",
      name: "crocs in sport...",
      marketcap: "$3,264,72",
      change5D: "+7%",
      dailyVolume: "$1,830,329 USD",
      holders: "2,111",
      bondDiscount: "4%",
    },
    {
      id: 8,
      image: "https://i.ibb.co.com/hg4MWhx/8.png",
      name: "ngl",
      marketcap: "$2,666,135",
      change5D: "-1%",
      dailyVolume: "$840,320 USD",
      holders: "1362",
      bondDiscount: "3%",
    },
    {
      id: 9,
      image: "https://i.ibb.co.com/5TMZHVd/4.png",
      name: "APE",
      marketcap: "$29,444,523",
      change5D: "+38%",
      dailyVolume: "$10,049,402 USD",
      holders: "4273",
      bondDiscount: "2%",
    },
    {
      id: 10,
      image: "https://i.ibb.co.com/LYjSvx0/5.png",
      name: "high eye order",
      marketcap: "$13,069,780",
      change5D: "+22%",
      dailyVolume: "8,238,520 USD",
      holders: "3,257",
      bondDiscount: "4%",
    },
    {
      id: 11,
      image: "https://i.ibb.co.com/wNL2GkN/6.png",
      name: "green circle",
      marketcap: "$7,634,22",
      change5D: "+11%",
      dailyVolume: "$4,022,742 USD",
      holders: "2,846",
      bondDiscount: "3%",
    },
    {
      id: 12,
      image: "https://i.ibb.co.com/KWQL6qk/7.png",
      name: "crocs in sport...",
      marketcap: "$3,264,72",
      change5D: "+7%",
      dailyVolume: "$1,830,329 USD",
      holders: "2,111",
      bondDiscount: "2%",
    },
    {
      id: 13,
      image: "https://i.ibb.co.com/hg4MWhx/8.png",
      name: "ngl",
      marketcap: "$2,666,135",
      change5D: "-1%",
      dailyVolume: "$840,320 USD",
      holders: "1362",
      bondDiscount: "4%",
    },
    {
      id: 14,
      image: "https://i.ibb.co.com/5TMZHVd/4.png",
      name: "APE",
      marketcap: "$29,444,523",
      change5D: "+38%",
      dailyVolume: "$10,049,402 USD",
      holders: "4273",
      bondDiscount: "3%",
    },
    {
      id: 15,
      image: "https://i.ibb.co.com/LYjSvx0/5.png",
      name: "high eye order",
      marketcap: "$13,069,780",
      change5D: "+22%",
      dailyVolume: "8,238,520 USD",
      holders: "3,257",
      bondDiscount: "2%",
    },
    {
      id: 16,
      image: "https://i.ibb.co.com/wNL2GkN/6.png",
      name: "green circle",
      marketcap: "$7,634,22",
      change5D: "+11%",
      dailyVolume: "$4,022,742 USD",
      holders: "2,846",
      bondDiscount: "4%",
    },
    {
      id: 17,
      image: "https://i.ibb.co.com/KWQL6qk/7.png",
      name: "crocs in sport...",
      marketcap: "$3,264,72",
      change5D: "+7%",
      dailyVolume: "$1,830,329 USD",
      holders: "2,111",
      bondDiscount: "3%",
    },
    {
      id: 18,
      image: "https://i.ibb.co.com/hg4MWhx/8.png",
      name: "ngl",
      marketcap: "$2,666,135",
      change5D: "-1%",
      dailyVolume: "$840,320 USD",
      holders: "1362",
      bondDiscount: "2%",
    },
    {
      id: 19,
      image: "https://i.ibb.co.com/5TMZHVd/4.png",
      name: "APE",
      marketcap: "$29,444,523",
      change5D: "+38%",
      dailyVolume: "$10,049,402 USD",
      holders: "4273",
      bondDiscount: "4%",
    },
    {
      id: 20,
      image: "https://i.ibb.co.com/LYjSvx0/5.png",
      name: "high eye order",
      marketcap: "$13,069,780",
      change5D: "+22%",
      dailyVolume: "8,238,520 USD",
      holders: "3,257",
      bondDiscount: "3%",
    },
    {
      id: 21,
      image: "https://i.ibb.co.com/wNL2GkN/6.png",
      name: "green circle",
      marketcap: "$7,634,22",
      change5D: "+11%",
      dailyVolume: "$4,022,742 USD",
      holders: "2,846",
      bondDiscount: "2%",
    },
    {
      id: 22,
      image: "https://i.ibb.co.com/KWQL6qk/7.png",
      name: "crocs in sport...",
      marketcap: "$3,264,72",
      change5D: "+7%",
      dailyVolume: "$1,830,329 USD",
      holders: "2,111",
      bondDiscount: "4%",
    },
    {
      id: 23,
      image: "https://i.ibb.co.com/hg4MWhx/8.png",
      name: "ngl",
      marketcap: "$2,666,135",
      change5D: "-1%",
      dailyVolume: "$840,320 USD",
      holders: "1362",
      bondDiscount: "3%",
    },
    {
      id: 24,
      image: "https://i.ibb.co.com/5TMZHVd/4.png",
      name: "APE",
      marketcap: "$29,444,523",
      change5D: "+38%",
      dailyVolume: "$10,049,402 USD",
      holders: "4273",
      bondDiscount: "2%",
    },
    {
      id: 25,
      image: "https://i.ibb.co.com/LYjSvx0/5.png",
      name: "high eye order",
      marketcap: "$13,069,780",
      change5D: "+22%",
      dailyVolume: "8,238,520 USD",
      holders: "3,257",
      bondDiscount: "3%",
    },
    {
      id: 26,
      image: "https://i.ibb.co.com/wNL2GkN/6.png",
      name: "green circle",
      marketcap: "$7,634,22",
      change5D: "+11%",
      dailyVolume: "$4,022,742 USD",
      holders: "2,846",
      bondDiscount: "3%",
    },
    {
      id: 27,
      image: "https://i.ibb.co.com/KWQL6qk/7.png",
      name: "crocs in sport...",
      marketcap: "$3,264,72",
      change5D: "+7%",
      dailyVolume: "$1,830,329 USD",
      holders: "2,111",
      bondDiscount: "2%",
    },
    {
      id: 28,
      image: "https://i.ibb.co.com/hg4MWhx/8.png",
      name: "ngl",
      marketcap: "$2,666,135",
      change5D: "-1%",
      dailyVolume: "$840,320 USD",
      holders: "1362",
      bondDiscount: "2%",
    },
    {
      id: 9,
      image: "https://i.ibb.co.com/5TMZHVd/4.png",
      name: "APE",
      marketcap: "$29,444,523",
      change5D: "+38%",
      dailyVolume: "$10,049,402 USD",
      holders: "4273",
      bondDiscount: "3%",
    },
  ];

  console.log(allDaos);
  return (
    <>
      <div className="mx-auto lg:px-4 sm:px-4 px-4  border rounded-lg my-[40px] overflow-x-auto w-[100%] max-w-[857px] ">
        <div className="py-8">
          <h3 className="text-[22px] text-white font-[700]">
            Directory{" "}
            <span className="text-[12px] text-white font-[400]">
              (all daos)
            </span>
          </h3>
          <div className="lg:mx-4 sm:-mx-8 px-4 sm:px-2 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg relative overflow-x-auto ">
              <table className="min-w-full leading-normal ">
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
                      <tr key={dao.id}>
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-white text-center">
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
