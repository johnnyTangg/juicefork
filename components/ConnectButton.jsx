"use client"
import { useWeb3Modal,useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'


const ConnectButton = (props) => {
    
    const { open } = useWeb3Modal()
    const { address } = useWeb3ModalAccount()
  
    function trimAddress(addy){
      return `${addy.slice(0, 5)}...${addy.slice(38, 50)}`
    }
  
    return (
      <>
          <button className="text-white" onClick={async ()=>{open()}} >
            [ {address ? trimAddress(address) : "Connect"} ]
            {/* <img src="../assets/icons/arrow.png" className="ml-5 w-[10px] lg:w-[27px]" alt="" /> */}
          </button>
      </>
    )
  }
  
  export default ConnectButton;