"use client"
import Link from "next/link";
import React from "react";
import { useWeb3Modal,useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract,formatUnits, parseUnits,Interface,ethers } from "ethers"
import { contracts } from '../Data/Contracts';

const factoryABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_olympusAuthority",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_olympusERC20",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_sOlympusERC20",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_gOlympusERC20",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_staking",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_stakingDistributor",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_treasury",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_bondDepository",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "bondDepository",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "olympusAuthority",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "olympusERC20",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sOlympusERC20",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "gOlympusERC20",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "staking",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "stakingDistributor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "treasury",
        "type": "address"
      }
    ],
    "name": "CloneFactoryDeployed",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_olympusAuthority",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_olympusERC20",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_sOlympusERC20",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_gOlympusERC20",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_staking",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_stakingDistributor",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_treasury",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_bondDepository",
        "type": "address"
      }
    ],
    "name": "adjustContracts",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bondDepository",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "clones",
    "outputs": [
      {
        "internalType": "address",
        "name": "bondDepository",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "olympusAuthority",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "olympusERC20",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "sOlympusERC20",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "gOlympusERC20",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "staking",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "stakingDistributor",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "treasury",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_epochLength",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_firstEpochNumber",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_firstEpochTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "initialSupply",
        "type": "uint256"
      }
    ],
    "name": "deployAndInitializeClone",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "bondDepository",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "olympusAuthority",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "olympusERC20",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "sOlympusERC20",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "gOlympusERC20",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "staking",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "stakingDistributor",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "treasury",
            "type": "address"
          }
        ],
        "internalType": "struct CloneYard.Clone",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "gOlympusERC20",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "olympusAuthority",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "olympusERC20",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sOlympusERC20",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "staking",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "stakingDistributor",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "treasury",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const ifaceFactory = new Interface(factoryABI)
const Create = () => {

  const { walletProvider } = useWeb3ModalProvider()
  const { address, chainId, isConnected } = useWeb3ModalAccount()

  async function launchToken(){
    const nameOfToken = await document.getElementById("nameInput").value
    const symbolOfToken = await document.getElementById("symbolInput").value
    const descriptionOfToken = await document.getElementById("descriptionInput").value
    const supplyOfToken = await parseUnits(document.getElementById("supplyInput").value.replaceAll(",",""),9) 
    

    if (!isConnected) throw Error('User disconnected')
  
    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()

    const factoryContract = new Contract(contracts.CloneYard, factoryABI,signer)
    const currentTime = Math.floor(Date.now()/1000)

    const tx = await factoryContract.deployAndInitializeClone(nameOfToken,symbolOfToken,2200,0,currentTime,supplyOfToken,{value:0})
    const txResult = await tx.wait()
    txResult.logs.forEach((_)=>{
      // console.log(ifaceFactory.parseLog(_))
      console.log(_)
    })
    // console.log(txResult.logs)
  }
  return (
    <div className="text-white my-10 md:my-16">
      <div className="border bg-[#0000007e] rounded-[6px] w-full md:w-[479px] 2xl:w-[800px] mx-auto px-4 2xl:px-6 py-3 2xl:py-5">
        <div className="flex items-center gap-[6px]">
          <img className="w-[14px] 2xl:w-[20px]" src="/images/Star.png" alt="" />
          <p className="text-xs 2xl:text-xl text-white">
            Embark on a <span className="text-[#03F0FF]">new journey...</span>
          </p>
        </div>

        <p className="my-3 text-[13px] 2xl:text-xl">
          <img className="inline h-4 2xl:h-6" src="/images/juice.png" alt="" /> allows
          anyone to create a new token and spin up a decentralized reserve
          currency, or “dao”.
        </p>

        <p className="text-[13px] 2xl:text-xl mb-[10px] 2xl:mb-5">
          Cost: 0.01 eth (+gas & deployment fees)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 2xl:gap-y-6 gap-x-10 mb-9">
          <div>
            <label className="text-[11px] 2xl:text-lg" htmlFor="name">
              name
            </label>
            <input
              type="text"
              className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
              name=""
              id="nameInput"
            />
          </div>
          <div>
            <label className="text-[11px] 2xl:text-lg" htmlFor="name">
              twitter link (optional)
            </label>
            <input
              type="text"
              className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
              name=""
              id=""
            />
          </div>
          <div>
            <label className="text-[11px] 2xl:text-lg" htmlFor="name">
              ticker
            </label>
            <input
              type="text"
              className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
              name=""
              id="symbolInput"
            />
          </div>
          <div>
            <label className="text-[11px] 2xl:text-lg" htmlFor="name">
              telegram link (optional)
            </label>
            <input
              type="text"
              className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
              name=""
              id=""
            />
          </div>
          <div>
            <label className="text-[11px] 2xl:text-lg" htmlFor="name">
              Total Supply
            </label>
            <input
              type="text"
              className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
              name=""
              id="supplyInput"
            />
          </div>
          <div>
            <label className="text-[11px] 2xl:text-lg" htmlFor="name">
              website link (optional)
            </label>
            <input
              type="text"
              className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
              name=""
              id=""
            />
          </div>
          <div>
            <label className="text-[11px] 2xl:text-lg" htmlFor="name">
              token logo (png - 500x500px)
            </label>
            <input
              type="image"
              className="block rounded h-auto 2xl:h-7"
              name=""
              id=""
              src="/images/imgInp.png"
            />
          </div>
          <div>
            <label className="text-[11px] 2xl:text-lg" htmlFor="name">
              description
            </label>
            <textarea
              type="text"
              className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
              name=""
              id="descriptionInput"
            />
          </div>
        </div>
        <p className="text-xs 2xl:text-xl mb-5">
          Once these parameters are filled, press “launch”.
        </p>
        <p className="text-xs 2xl:text-xl mb-9">
          Your coin will then be{" "}
          <span className="text-[#03F0FF]">launched on Ethereum</span>, and you
          can then setup your{" "}
          <Link href="/Vault" className="text-[#03F0FF]">vault settings.</Link>
        </p>
        <div className="mb-10 flex flex-col justify-center">
          <button onClick={launchToken} className="cursor-pointer  text-xl 2xl:text-3xl">[ launch ]</button>
          <p className="text-xs 2xl:text-xl text-center">
            Cost: 0.01 eth (+gas & deployment fees)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Create;
