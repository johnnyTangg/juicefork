"use client"
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useWeb3Modal,useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract,formatUnits, parseUnits,Interface,ethers,JsonRpcProvider, toUtf8Bytes, zeroPadValue } from "ethers"
import { contracts } from '../Data/Contracts';
import BondingCurveFactoryABI from '../abis/BondingCurveFactory.json';
import { useRouter } from 'next/navigation';
import { chains } from '../Data/Chains';
import { getIpfsUrl } from '../utils/ipfs';

const BONDING_CURVE_FACTORY = '0xC56E6FeaA59D9b769477aeAa0e1376BFCA9155EA';
const BASE_CHAIN_ID = 8453;

// Helper function to convert string to bytes32
function stringToBytes32(str) {
  // Start with 0x prefix
  let hex = '0x';
  // Add hex values of each character
  for (let i = 0; i < str.length && i < 32; i++) {
    hex += str.charCodeAt(i).toString(16).padStart(2, '0');
  }
  // Pad to 32 bytes (64 characters + 2 for '0x')
  hex = hex.padEnd(66, '0');
  return hex;
}

const Create = () => {
  const { walletProvider } = useWeb3ModalProvider()
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [presaleCreationFee, setPresaleCreationFee] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();

  const addNotification = (type, message, txHash = "", link = "") => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message, txHash, link }]);
    // Remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  useEffect(() => {
    const fetchPresaleCreationFee = async () => {
      if (!chainId) return;
      try {
        const factoryAddress = contracts[chainId]?.BondingCurveFactory;
        if (!factoryAddress) return;

        const provider = new JsonRpcProvider(chains[chainId].rpc[0]);
        const factory = new Contract(factoryAddress, BondingCurveFactoryABI, provider);
        const fee = await factory.presaleCreationFee();
        setPresaleCreationFee(fee);
      } catch (error) {
        console.error("Error fetching presale creation fee:", error);
      }
    };

    fetchPresaleCreationFee();
  }, [chainId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("Image size should be less than 5MB");
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function uploadToIPFS(file) {
    try {
      console.log('Starting file upload to Pinata...', { fileName: file.name, fileSize: file.size });
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/API/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload failed:', response.status, errorText);
        throw new Error(`Upload failed: ${errorText}`);
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      
      if (!data.ipfsHash) {
        throw new Error('No IPFS hash in response');
      }

      return data.ipfsHash;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  async function uploadMetadata(metadata) {
    try {
      console.log('Uploading metadata:', metadata);
      
      const response = await fetch('/API/upload-metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadata),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Metadata upload failed:', errorText);
        throw new Error(`Failed to upload metadata: ${errorText}`);
      }

      const data = await response.json();
      console.log('Metadata upload successful:', data);
      
      // Verify metadata by fetching it back
      try {
        const verifyUrl = getIpfsUrl(data.ipfsHash);
        console.log('Verifying metadata at:', verifyUrl);
        const verifyResponse = await fetch(verifyUrl);
        if (!verifyResponse.ok) {
          throw new Error(`Failed to verify metadata: ${verifyResponse.status}`);
        }
        const verifiedMetadata = await verifyResponse.json();
        console.log('Verified metadata:', verifiedMetadata);
      } catch (verifyError) {
        console.warn('Metadata verification warning:', verifyError);
        // Continue anyway since the upload was successful
      }

      return data;
    } catch (error) {
      console.error('Metadata upload error:', error);
      throw error;
    }
  }

  const launchToken = async () => {
    try {
      setError("");
      setLoading(true);
      addNotification("info", "Preparing to launch token...");

      // Validate connection and chain
      if (!isConnected) {
        setError('Please connect your wallet');
        setLoading(false);
        return;
      }
      if (!chainId) {
        setError('Chain ID not available');
        setLoading(false);
        return;
      }
      if (chainId !== BASE_CHAIN_ID) {
        setError('Please switch to Base mainnet');
        setLoading(false);
        return;
      }

      // Get form inputs
      const nameOfToken = document.getElementById("nameInput").value;
      const symbolOfToken = document.getElementById("symbolInput").value;
      const description = document.getElementById("descriptionInput").value;
      const devBuyAmount = document.getElementById("devBuyInput").value;
      
      // Validate required fields
      if (!nameOfToken || !symbolOfToken) {
        setError("Name and symbol are required");
        setLoading(false);
        return;
      }

      if (!description) {
        setError("Description is required");
        setLoading(false);
        return;
      }

      // Validate dev buy amount
      let devBuyWei = parseUnits("0", 18);
      if (devBuyAmount && devBuyAmount.trim() !== "") {
        devBuyWei = parseUnits(devBuyAmount, 18);
      }

      // Upload image to IPFS if one is selected
      let imageIpfsHash = null;
      if (selectedImage) {
        try {
          addNotification("info", "Uploading image to IPFS...");
          console.log('Uploading image to IPFS...');
          imageIpfsHash = await uploadToIPFS(selectedImage);
          console.log('Image uploaded to IPFS:', imageIpfsHash);
          addNotification("success", "Image uploaded successfully");
        } catch (error) {
          console.error('Failed to upload image:', error);
          setError('Failed to upload image. Please try again or proceed without an image.');
          setLoading(false);
          return;
        }
      }

      // Prepare metadata
      const metadata = {
        name: nameOfToken,
        symbol: symbolOfToken,
        description: description,
        ...(imageIpfsHash && { 
          image: `ipfs://${imageIpfsHash}`,
          image_url: `ipfs://${imageIpfsHash}` // Some marketplaces use this field
        })
      };

      addNotification("info", "Uploading metadata to IPFS...");
      const metadataData = await uploadMetadata(metadata);
      addNotification("success", "Metadata uploaded successfully");

      if (!walletProvider) {
        throw new Error("No wallet connected");
      }

      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const factoryAddress = contracts[chainId]?.BondingCurveFactory;
      if (!factoryAddress) {
        setError("Factory not deployed on this network");
        setLoading(false);
        return;
      }

      const factory = new Contract(factoryAddress, BondingCurveFactoryABI, signer);
      const presaleCreationFee = await factory.presaleCreationFee();

      // Calculate total transaction value (creation fee + dev buy amount)
      const totalValue = BigInt(presaleCreationFee) + BigInt(devBuyWei);

      // Use IPFS hash directly as string
      console.log('IPFS hash:', metadataData.ipfsHash);
      console.log('Contract parameters:', {
        nameOfToken,
        symbolOfToken,
        metadataHash: metadataData.ipfsHash,
        totalValue: totalValue.toString()
      });

      addNotification("info", "Please confirm the transaction in your wallet");

      // Estimate gas for the transaction
      const gasEstimate = await factory.createPresale.estimateGas(
        nameOfToken,
        symbolOfToken,
        metadataData.ipfsHash,
        { value: totalValue }
      );

      console.log("Gas estimate:", gasEstimate.toString());
      console.log("Total value:", formatUnits(totalValue, 18), "ETH");

      // Add 20% buffer to gas estimate
      const gasLimit = (BigInt(gasEstimate) * BigInt(120)) / BigInt(100);

      const tx = await factory.createPresale(
        nameOfToken,
        symbolOfToken,
        metadataData.ipfsHash,
        { 
          value: totalValue,
          gasLimit
        }
      );

      addNotification("pending", "Transaction submitted...", tx.hash);
      console.log("Transaction sent:", tx.hash);
      
      const receipt = await tx.wait();
      console.log("Transaction receipt:", receipt);

      // Find the PresaleCreated event in the logs
      const presaleCreatedEvent = receipt.logs.find(log => {
        try {
          const parsed = factory.interface.parseLog({
            topics: log.topics,
            data: log.data
          });
          return parsed.name === "PresaleCreated";
        } catch (e) {
          return false;
        }
      });

      if (presaleCreatedEvent) {
        const decodedEvent = factory.interface.parseLog({
          topics: presaleCreatedEvent.topics,
          data: presaleCreatedEvent.data
        });
        
        const presaleAddress = decodedEvent.args.presale;
        
        addNotification("success", `You created "${symbolOfToken}" 🎉`, tx.hash);
        setTimeout(() => {
          addNotification("live", `"${symbolOfToken}" is now live! Click here to view ✅`, tx.hash, `/DAO?ca=${presaleAddress}`);
        }, 1000);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error launching token:", error);
      setError(error.message);
      addNotification("error", "Transaction failed.", "");
      setLoading(false);
    }
  };

  return (
    <div className="text-white my-10 md:my-16 relative">
      <div className="border bg-[#0000007e] rounded-[6px] w-full md:w-[479px] 2xl:w-[800px] mx-auto px-4 2xl:px-6 py-3 2xl:py-5">
        <div className="flex items-center gap-[6px]">
          <img className="w-[14px] 2xl:w-[20px]" src="/images/Star.png" alt="" />
          <p className="text-xs 2xl:text-xl text-white">
            Embark on a <span className="text-[#03F0FF]">new journey...</span>
          </p>
        </div>

        <p className="my-3 text-[13px] 2xl:text-xl">
          <img className="inline h-4 2xl:h-6" src="/images/juice.png" alt="" /> allows
          anyone to create a new token with a bonding curve mechanism for fair distribution.
        </p>

        <p className="text-[13px] 2xl:text-xl mb-[10px] 2xl:mb-5">
          Cost: {formatUnits(presaleCreationFee || "100000000000000", 18)} ETH (+gas & deployment fees)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 2xl:gap-y-6 gap-x-10 mb-9">
          <div>
            <label className="text-[11px] 2xl:text-lg" htmlFor="name">
              Token Name
            </label>
            <input
              type="text"
              className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
              id="nameInput"
              placeholder="Test Token"
            />
          </div>
          <div>
            <label className="text-[11px] 2xl:text-lg" htmlFor="symbol">
              Token Symbol
            </label>
            <input
              type="text"
              className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
              id="symbolInput"
              placeholder="TEST"
            />
          </div>
          <div>
            <label className="text-[11px] 2xl:text-lg" htmlFor="devBuy">
              Dev Buy Amount (ETH) <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
              id="devBuyInput"
              placeholder="0.1"
            />
            <span className="text-[10px] text-gray-400">Amount of ETH to buy immediately after creation</span>
          </div>
          <div className="col-span-2">
            <label className="text-[11px] 2xl:text-lg" htmlFor="tokenImage">
              Token Image <span className="text-gray-400">(optional)</span>
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full block text-sm text-gray-400 
                  file:mr-4 file:py-2 file:px-4 
                  file:rounded file:border-0 
                  file:text-sm file:font-semibold
                  file:bg-[#ffffff20] file:text-white
                  hover:file:bg-[#ffffff30]
                  border border-gray-600 rounded"
              />
              {imagePreview && (
                <div className="w-16 h-16 relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              )}
            </div>
            <span className="text-[10px] text-gray-400">Optional. Max size: 5MB. Recommended: 500x500px</span>
          </div>
          <div className="col-span-2">
            <label className="text-[11px] 2xl:text-lg" htmlFor="description">
              Description
            </label>
            <textarea
              className="w-full block border rounded bg-[#ffffff11] px-3 py-2 text-lg 2xl:text-2xl"
              id="descriptionInput"
              placeholder="Describe your token..."
              rows="3"
            />
          </div>
        </div>

        <p className="text-xs 2xl:text-xl mb-5">
          Once these parameters are filled, press "launch" to create your token with a bonding curve.
        </p>

        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        <div className="mb-10 flex flex-col justify-center">
          <button 
            onClick={launchToken} 
            className="cursor-pointer text-xl 2xl:text-3xl"
            disabled={!isConnected || loading}
          >
            [ {loading ? "launching..." : "launch"} ]
          </button>
          <p className="text-xs 2xl:text-xl text-center">
            Cost: {formatUnits(presaleCreationFee || "100000000000000", 18)} ETH (+gas & deployment fees)
          </p>
        </div>
      </div>

      {/* Notifications */}
      <div className="fixed bottom-5 right-5 z-50">
        {notifications.map(notification => (
          <div key={notification.id} className="border bg-[#0000007e] backdrop-blur-sm rounded-[6px] w-[280px] h-[48px] p-[10px] py-[8px] mb-[13px] relative shadow-lg">
            {notification.link ? (
              <Link href={notification.link}>
                <p className={`text-[12px] cursor-pointer hover:text-[#03F0FF] transition-colors ${notification.type === 'error' ? 'text-red-500' : notification.type === 'pending' ? 'text-yellow-500' : notification.type === 'success' ? 'text-green-500' : 'text-white'}`}>
                  {notification.message}
                </p>
              </Link>
            ) : (
              <p className={`text-[12px] ${notification.type === 'error' ? 'text-red-500' : notification.type === 'pending' ? 'text-yellow-500' : notification.type === 'success' ? 'text-green-500' : 'text-white'}`}>
                {notification.message}
              </p>
            )}
            {notification.txHash && (
              <Link
                className="text-[8px] text-[#989898] hover:text-[#03F0FF] underline block transition-colors"
                href={`${chains[chainId]?.blockExplorer}/tx/${notification.txHash}`}
                target="_blank"
              >
                view txn
              </Link>
            )}
            <button 
              className="absolute top-[6px] right-[6px] opacity-50 hover:opacity-100 transition-opacity"
              onClick={() => removeNotification(notification.id)}
            >
              <img src="/images/icons-close.png" alt="" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Create;
