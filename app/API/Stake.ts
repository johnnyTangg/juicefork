import { ethers } from "ethers";
import { ABI } from "../Data/ABI";
import { factory } from "../Data/Contracts";
import type { OlympusStaking } from "../Typings";
import { BrowserProvider } from "ethers";
import BigNumber from "bignumber.js";
import { chains } from "../Data/Chains";

export const getStakingContract = async (contractAddress: string, chainId: number, provider?: ethers.BrowserProvider) => {
    let signer: any;
    if(!provider){
        if (!chains[chainId]) {
            console.error('Unsupported chain:', chainId);
            return;
        }
        signer = new ethers.JsonRpcProvider(chains[chainId].rpc[0]);
    }else{
        signer = await provider.getSigner()
    }
    return new ethers.Contract(contractAddress, ABI['OlympusStaking'], signer) as unknown as OlympusStaking;
}

export const stake = async (
    contractAddress: string,
    chainId: number,
    walletProvider: ethers.Eip1193Provider,
    amount: BigNumber,
    rebasing: boolean,
    claim: boolean
) => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getStakingContract(contractAddress, chainId, ethersProvider);
    if (!contract) {
        console.error('Failed to initialize staking contract');
        return;
    }

    try {
        const tx = await contract.stake(
            (await ethersProvider.getSigner()).address,
            amount.toFixed(0),
            rebasing,
            claim
        );
        if (tx) {
            console.log('stake success!')
        }
    } catch (e) {
        console.log('staking error:', e);
    }
}

export const claim = async (
    contractAddress: string,
    chainId: number,
    walletProvider: ethers.Eip1193Provider,
    rebasing: boolean
) => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getStakingContract(contractAddress, chainId, ethersProvider);
    if (!contract) {
        console.error('Failed to initialize staking contract');
        return;
    }

    try {
        const gas = await contract.estimateGas.claim(
            (await ethersProvider.getSigner()).address,
            rebasing
        );
        const tx = await contract.claim(
            (await ethersProvider.getSigner()).address,
            rebasing,
            { gasLimit: gas.times(1.1).toFixed(0) }
        );
        if (tx) {
            console.log('claim success!')
        }
    } catch (e) {
        console.log('claim error:', e);
    }
}

export const forfeit = async (
    contractAddress: string,
    chainId: number,
    walletProvider: ethers.Eip1193Provider,
    rebasing: boolean
) => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getStakingContract(contractAddress, chainId, ethersProvider);
    if (!contract) {
        console.error('Failed to initialize staking contract');
        return;
    }

    try {
        const gas = await contract.estimateGas.forfeit();
        const tx = await contract.forfeit();
        if (tx) {
            console.log('forfeit success!')
        }
    } catch (e) {
        console.log('forfeit error:', e);
    }
}

export const unstake = async (
    contractAddress: string,
    chainId: number,
    walletProvider: ethers.Eip1193Provider,
    amount: BigNumber,
    trigger: boolean,
    rebasing: boolean
) => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getStakingContract(contractAddress, chainId, ethersProvider);
    if (!contract) {
        console.error('Failed to initialize staking contract');
        return;
    }

    try {
        const tx = await contract.unstake(
            (await ethersProvider.getSigner()).address,
            amount.toFixed(0),
            trigger,
            rebasing
        );
        if (tx) {
            console.log('unstake success!')
        }
    } catch (e) {
        console.log('unstaking error:', e);
    }
}

export const wrap = async (
    contractAddress: string,
    chainId: number,
    walletProvider: ethers.Eip1193Provider,
    amount: BigNumber
) => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getStakingContract(contractAddress, chainId, ethersProvider);
    if (!contract) {
        console.error('Failed to initialize staking contract');
        return;
    }

    try {
        const gas = await contract.estimateGas.wrap(
            (await ethersProvider.getSigner()).address,
            amount.toFixed(0)
        );
        const tx = await contract.wrap(
            (await ethersProvider.getSigner()).address,
            amount.toFixed(0),
            { gasLimit: gas.times(1.1).toFixed(0) }
        );
        if (tx) {
            console.log('wrap success!')
        }
    } catch (e) {
        console.log('wrap error:', e);
    }
}

export const unwrap = async (
    contractAddress: string,
    chainId: number,
    walletProvider: ethers.Eip1193Provider,
    amount: BigNumber
) => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getStakingContract(contractAddress, chainId, ethersProvider);
    if (!contract) {
        console.error('Failed to initialize staking contract');
        return;
    }

    try {
        const gas = await contract.estimateGas.unwrap(
            (await ethersProvider.getSigner()).address,
            amount.toFixed(0)
        );
        const tx = await contract.unwrap(
            (await ethersProvider.getSigner()).address,
            amount.toFixed(0),
            { gasLimit: gas.times(1.1).toFixed(0) }
        );
        if (tx) {
            console.log('unwrap success!')
        }
    } catch (e) {
        console.log('unwrap error:', e);
    }
}

export const rebase = async (
    contractAddress: string,
    chainId: number,
    walletProvider: ethers.Eip1193Provider,
) => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getStakingContract(contractAddress, chainId, ethersProvider);
    if (!contract) {
        console.error('Failed to initialize staking contract');
        return;
    }

    try {
        const tx = await contract.rebase();
        if (tx) {
            console.log('rebase success!')
        }
    } catch (e) {
        console.log('rebase error:', e);
    }
}

export const setWarmupLength = async (
    contractAddress: string,
    chainId: number,
    walletProvider: ethers.Eip1193Provider,
    warmupPeriod: string
) => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getStakingContract(contractAddress, chainId, ethersProvider);
    if (!contract) {
        console.error('Failed to initialize staking contract');
        return;
    }

    try {
        const gas = await contract.estimateGas.setWarmupLength(warmupPeriod);
        const tx = await contract.setWarmupLength(
            warmupPeriod,
            { gasLimit: gas.times(1.1).toFixed(0) }
        );
        if (tx) {
            console.log('setWarmupLength success!')
        }
    } catch (e) {
        console.log('setWarmupLength error:', e);
    }
}

export const getUserClaimInfo = async (
    contractAddress: string,
    chainId: number,
    walletProvider: ethers.Eip1193Provider,
) => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getStakingContract(contractAddress, chainId, ethersProvider);
    if (!contract) {
        console.error('Failed to initialize staking contract');
        return;
    }

    try {
        const res = await contract.warmupInfo((await ethersProvider.getSigner()).address);
        console.log('got user claim info:', res);
        return {
            gons: res.gons,
            deposit: res.deposit,
            expiry: res.expiry,
            lock: res.lock
        };
    } catch (e) {
        console.error('getUserClaimInfo:', e);
    }
}