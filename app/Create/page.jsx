"use client"
import Link from "next/link";
import React, { useState } from "react";
import { useWeb3Modal,useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract,formatUnits, parseUnits,Interface,ethers } from "ethers"
import { contracts } from '../Data/Contracts';
import BondingCurveFactoryABI from '../abis/BondingCurveFactory.json';

const BONDING_CURVE_FACTORY = '0xaBfAceD1E2aDf8d6fa154Da0D41280DCc4F4c362';
const BASE_CHAIN_ID = 8453;

const Create = () => {
  const { walletProvider } = useWeb3ModalProvider()
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  async function launchToken(){
    try {
      setError("");
      
      // Validate connection and chain
      if (!isConnected) {
        setError('Please connect your wallet');
        return;
      }
      if (!chainId) {
        setError('Chain ID not available');
        return;
      }
      if (chainId !== BASE_CHAIN_ID) {
        setError('Please switch to Base mainnet');
        return;
      }

      // Get form inputs
      const nameOfToken = document.getElementById("nameInput").value;
      const symbolOfToken = document.getElementById("symbolInput").value;
      const description = document.getElementById("descriptionInput").value;
      
      // Validate required fields
      if (!nameOfToken || !symbolOfToken) {
        setError("Name and symbol are required");
        return;
      }

      if (!description) {
        setError("Description is required");
        return;
      }

      // Upload image to IPFS if one is selected
      let imageIpfsHash = null;
      if (selectedImage) {
        try {
          console.log('Uploading image to IPFS...');
          imageIpfsHash = await uploadToIPFS(selectedImage);
          console.log('Image uploaded to IPFS:', imageIpfsHash);
        } catch (error) {
          console.error('Failed to upload image:', error);
          setError('Failed to upload image. Please try again or proceed without an image.');
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

      console.log('Uploading metadata:', metadata);

      // Upload metadata to IPFS
      const metadataResponse = await fetch('/API/upload-metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadata),
      });

      if (!metadataResponse.ok) {
        const errorText = await metadataResponse.text();
        console.error('Metadata upload failed:', errorText);
        throw new Error(`Failed to upload metadata: ${errorText}`);
      }

      const metadataData = await metadataResponse.json();
      const metadataHash = metadataData.ipfsHash;

      console.log('Metadata uploaded to IPFS:', metadataHash);

      // Parse and validate numeric inputs
      const inputs = {
        initialSupply: document.getElementById("supplyInput").value.replaceAll(",",""),
        targetRaise: document.getElementById("targetRaiseInput").value.replaceAll(",",""),
        initialPrice: document.getElementById("initialPriceInput").value.replaceAll(",",""),
        priceMultiplier: document.getElementById("priceMultiplierInput").value.replaceAll(",",""),
        multiplierDenominator: document.getElementById("multiplierDenominatorInput").value.replaceAll(",",""),
        tokensPerBatch: document.getElementById("tokensPerBatchInput").value.replaceAll(",",""),
        maxPurchase: document.getElementById("maxPurchaseInput").value.replaceAll(",",""),
        rewardRate: document.getElementById("rewardRateInput").value.replaceAll(",","")
      };

      // Validate all numeric inputs are present
      for (const [key, value] of Object.entries(inputs)) {
        if (!value) {
          setError(`${key} is required`);
          return;
        }
      }

      // Parse all numeric inputs with correct formats
      const parsedInputs = {
        initialSupply: parseUnits(inputs.initialSupply, 18),
        targetRaise: parseUnits(inputs.targetRaise, 18),
        initialPrice: parseUnits(inputs.initialPrice, 18),
        priceMultiplier: Number(inputs.priceMultiplier),
        multiplierDenominator: Number(inputs.multiplierDenominator),
        tokensPerBatch: parseUnits(inputs.tokensPerBatch, 18),
        maxPurchase: parseUnits(inputs.maxPurchase, 18),
        rewardRate: parseUnits(inputs.rewardRate, 18)
      };

      if (!isConnected) throw Error('User disconnected')
      if (!chainId || !contracts[chainId]) throw Error('Unsupported chain')
    
      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()

      const factoryAddress = contracts[chainId].BondingCurveFactory;
      console.log('Using factory address:', factoryAddress);

      const factoryContract = new Contract(
        factoryAddress,
        BondingCurveFactoryABI,
        signer
      )

      // First estimate gas to get better error messages
      try {
        const gasEstimate = await factoryContract.createPresale.estimateGas(
          nameOfToken,
          symbolOfToken,
          parsedInputs.initialSupply,
          parsedInputs.targetRaise,
          parsedInputs.initialPrice,
          parsedInputs.priceMultiplier,
          parsedInputs.multiplierDenominator,
          parsedInputs.tokensPerBatch,
          parsedInputs.maxPurchase,
          parsedInputs.rewardRate,
          metadataHash,
          { value: parseUnits("0.0001", 18) }
        );
        console.log('Gas estimate:', gasEstimate.toString());
      } catch (error) {
        console.error('Gas estimation failed:', error);
        console.error('Error code:', error.code);
        console.error('Error data:', error.data);
        console.error('Error message:', error.message);
        
        // Check for specific error conditions
        if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
          setError('Transaction would fail. Please check your inputs and try again.');
          return;
        }
        
        if (error.message && error.message.includes('missing revert data')) {
          // If we get the missing revert data error, we'll try the transaction anyway
          console.log('Proceeding with transaction despite gas estimation failure');
        } else {
          if (error.data) {
            setError(`Contract error: ${error.data.message}`);
          } else {
            setError(`Failed to estimate gas: ${error.message}`);
          }
          return;
        }
      }

      try {
        console.log('Sending transaction with parameters:', {
          nameOfToken,
          symbolOfToken,
          initialSupply: parsedInputs.initialSupply.toString(),
          targetRaise: parsedInputs.targetRaise.toString(),
          initialPrice: parsedInputs.initialPrice.toString(),
          priceMultiplier: parsedInputs.priceMultiplier,
          multiplierDenominator: parsedInputs.multiplierDenominator,
          tokensPerBatch: parsedInputs.tokensPerBatch.toString(),
          maxPurchase: parsedInputs.maxPurchase.toString(),
          rewardRate: parsedInputs.rewardRate.toString(),
          metadataHash
        });

        const tx = await factoryContract.createPresale(
          nameOfToken,
          symbolOfToken,
          parsedInputs.initialSupply,
          parsedInputs.targetRaise,
          parsedInputs.initialPrice,
          parsedInputs.priceMultiplier,
          parsedInputs.multiplierDenominator,
          parsedInputs.tokensPerBatch,
          parsedInputs.maxPurchase,
          parsedInputs.rewardRate,
          metadataHash,
          { 
            value: parseUnits("0.0001", 18),
            gasLimit: 3000000 // Add a manual gas limit as fallback
          }
        )
        console.log('Transaction sent:', tx);
        
        const receipt = await tx.wait()
        console.log('Transaction receipt:', receipt)
        
        // Find the Created event in the logs
        const createdEvent = receipt.logs.find(
          log => log.topics[0] === factoryContract.getEvent('Created').topicHash
        )
        
        if (createdEvent) {
          const decodedEvent = factoryContract.interface.parseLog({
            topics: createdEvent.topics,
            data: createdEvent.data
          });
          console.log('Presale address:', decodedEvent.args.presale)
          console.log('Claim token address:', decodedEvent.args.claimToken)
        }
      } catch (error) {
        console.error('Error details:', error)
        setError(error.message || 'Failed to create presale')
      }
    } catch (error) {
      console.error('Error details:', error)
      setError(error.message || 'Failed to create presale')
    }
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
          anyone to create a new token with a bonding curve mechanism for fair distribution.
        </p>

        <p className="text-[13px] 2xl:text-xl mb-[10px] 2xl:mb-5">
          Cost: 0.0001 eth (+gas & deployment fees)
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
            <label className="text-[11px] 2xl:text-lg" htmlFor="initialSupply">
              Initial Supply
            </label>
            <input
              type="text"
              className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
              id="supplyInput"
              placeholder="1000000"
            />
            <span className="text-[10px] text-gray-400">Total number of tokens to create</span>
          </div>
          <div>
            <label className="text-[11px] 2xl:text-lg" htmlFor="targetRaise">
              Target Raise (ETH)
            </label>
            <input
              type="text"
              className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
              id="targetRaiseInput"
              placeholder="10"
            />
            <span className="text-[10px] text-gray-400">Amount of ETH to raise</span>
          </div>
          <div>
            <label className="text-[11px] 2xl:text-lg" htmlFor="initialPrice">
              Initial Price (ETH)
            </label>
            <input
              type="text"
              className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
              id="initialPriceInput"
              placeholder="0.00001"
            />
            <span className="text-[10px] text-gray-400">Initial price per token in ETH</span>
          </div>
          <div>
            <label className="text-[11px] 2xl:text-lg" htmlFor="priceMultiplier">
              Price Multiplier
            </label>
            <input
              type="text"
              className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
              id="priceMultiplierInput"
              placeholder="110"
            />
            <span className="text-[10px] text-gray-400">Use 110 for 10% increase per batch</span>
          </div>
          <div>
            <label className="text-[11px] 2xl:text-lg" htmlFor="multiplierDenominator">
              Multiplier Denominator
            </label>
            <input
              type="text"
              className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
              id="multiplierDenominatorInput"
              placeholder="100"
            />
            <span className="text-[10px] text-gray-400">Use 100 for percentage-based multiplier</span>
          </div>
          <div>
            <label className="text-[11px] 2xl:text-lg" htmlFor="tokensPerBatch">
              Tokens Per Batch
            </label>
            <input
              type="text"
              className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
              id="tokensPerBatchInput"
              placeholder="100000"
            />
            <span className="text-[10px] text-gray-400">Number of tokens per price increase</span>
          </div>
          <div>
            <label className="text-[11px] 2xl:text-lg" htmlFor="maxPurchase">
              Max Purchase (ETH)
            </label>
            <input
              type="text"
              className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
              id="maxPurchaseInput"
              placeholder="1"
            />
            <span className="text-[10px] text-gray-400">Maximum ETH per purchase</span>
          </div>
          <div>
            <label className="text-[11px] 2xl:text-lg" htmlFor="rewardRate">
              Reward Rate
            </label>
            <input
              type="text"
              className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
              id="rewardRateInput"
              placeholder="0.00001"
            />
            <span className="text-[10px] text-gray-400">Tokens per second per token held</span>
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
          <div>
            <label className="text-[11px] 2xl:text-lg" htmlFor="description">
              Description
            </label>
            <textarea
              className="w-full md:w-[181px] 2xl:w-full block border rounded bg-[#ffffff11] px-3 py-0 2xl:py-1 text-lg 2xl:text-2xl"
              id="descriptionInput"
              placeholder="Describe your token..."
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
            disabled={!isConnected}
          >
            [ launch ]
          </button>
          <p className="text-xs 2xl:text-xl text-center">
            Cost: 0.0001 eth (+gas & deployment fees)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Create;
