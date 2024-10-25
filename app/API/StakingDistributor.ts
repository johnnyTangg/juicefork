import { ethers } from "ethers";
import { ABI } from "../Data/ABI";
import { factory } from "../Data/Contracts";
import type { Distributor } from "../Typings";
import { BrowserProvider } from "ethers";
import BigNumber from "bignumber.js";

export const getStakingDistributorContract = async (contractAddress: string, BrowserProvider: ethers.BrowserProvider) => {
    const signer = await BrowserProvider.getSigner();
    return new ethers.Contract(contractAddress, ABI['Distributor'], signer) as unknown as Distributor;
}
export const setBounty = async (
    contractAddress: string,
    walletProvider: ethers.Eip1193Provider,
    bounty: string
) => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getStakingDistributorContract(contractAddress, ethersProvider);
    try {
        const gas = await contract.estimateGas.setBounty(
            bounty
        );
        const tx = await contract.setBounty(
            bounty,
            { gasLimit: gas.times(1.1).toFixed(0) }
        );
        if (tx) {
            console.log('setBounty success!')
        }
    } catch (e) {
        console.log('setBounty error:', e);
    }
}
export const setPools = async (
    contractAddress: string,
    walletProvider: ethers.Eip1193Provider,
    pools: string[]
) => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getStakingDistributorContract(contractAddress, ethersProvider);
    try {
        const gas = await contract.estimateGas.setPools(
            pools
        );
        const tx = await contract.setPools(
            pools,
            { gasLimit: gas.times(1.1).toFixed(0) }
        );
        if (tx) {
            console.log('setPools success!')
        }
    } catch (e) {
        console.log('setPools error:', e);
    }
}
export const removePool = async (
    contractAddress: string,
    walletProvider: ethers.Eip1193Provider,
    index: number | string,
    pool: string
) => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getStakingDistributorContract(contractAddress, ethersProvider);
    try {
        const gas = await contract.estimateGas.removePool(
            index,
            pool
        );
        const tx = await contract.removePool(
            index,
            pool,
            { gasLimit: gas.times(1.1).toFixed(0) }
        );
        if (tx) {
            console.log('removePool success!')
        }
    } catch (e) {
        console.log('removePool error:', e);
    }
}
export const addPool = async (
    contractAddress: string,
    walletProvider: ethers.Eip1193Provider,
    index: number | string,
    pool: string
) => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getStakingDistributorContract(contractAddress, ethersProvider);
    try {
        const gas = await contract.estimateGas.addPool(
            index,
            pool
        );
        const tx = await contract.addPool(
            index,
            pool,
            { gasLimit: gas.times(1.1).toFixed(0) }
        );
        if (tx) {
            console.log('addPool success!')
        }
    } catch (e) {
        console.log('addPool error:', e);
    }
}
export const setAdjustment = async (
    contractAddress: string,
    walletProvider: ethers.Eip1193Provider,
    add: boolean,
    rate: string,
    target: string
) => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getStakingDistributorContract(contractAddress, ethersProvider);
    try {
        const gas = await contract.estimateGas.setAdjustment(
            add,
            rate,
            target
        );
        const tx = await contract.setAdjustment(
            add,
            rate,
            target,
            { gasLimit: gas.times(1.1).toFixed(0) }
        );
        if (tx) {
            console.log('setAdjustment success!')
        }
    } catch (e) {
        console.log('setAdjustment error:', e);
    }
}