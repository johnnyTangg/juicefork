import { ethers, BrowserProvider } from "ethers";
import { ABI } from "../Data/ABI";
import { OlympusBondDepositoryV2 } from "../Typings";
import { OlympusBondingCalculator } from "../Typings";
import BigNumber from "bignumber.js";
import { chains } from "../Data/Chains";

export const getBondDepositoryContract = async (contractAddress: string, chainId: number, provider?: ethers.BrowserProvider) => {
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
    return new ethers.Contract(contractAddress, ABI['OlympusBondDepositoryV2'], signer) as unknown as OlympusBondDepositoryV2;
}

export const getBondingCalculatorContract = async (contractAddress: string, chainId: number, provider?: ethers.BrowserProvider) => {
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
    return new ethers.Contract(contractAddress, ABI['OlympusBondingCalculator'], signer) as unknown as OlympusBondingCalculator;
}

//////////DEPOSITORY//////////
export const deposit = async (
    contractAddress: string,
    chainId: number,
    walletProvider: ethers.Eip1193Provider,
    id: number | string,
    amount: BigNumber,
    maxPrice: BigNumber,
    user: string,
    referral: string
) => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getBondDepositoryContract(contractAddress, chainId, ethersProvider);
    if (!contract) {
        console.error('Failed to initialize bond depository contract');
        return;
    }

    try {
        if (referral.length == 0) referral = '0x0000000000000000000000000000000000000000';
        const tx = await contract.deposit(
            id,
            amount.toFixed(0),
            maxPrice.toFixed(0),
            user,
            referral ?? "0x0000000000000000000000000000000000000000",
            {value: amount.toFixed(0)}
        );
        if (tx) {
            console.log('deposit success!')
        }
    } catch (e) {
        console.log('deposit error:', e);
    }
}

export const create = async (
    contractAddress: string,
    chainId: number,
    walletProvider: ethers.Eip1193Provider,
    quoteToken: string,
    market: [string, string, string],
    booleans: [boolean, boolean],
    terms: [string, string],
    intervals: [string, string]
) => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getBondDepositoryContract(contractAddress, chainId, ethersProvider);
    if (!contract) {
        console.error('Failed to initialize bond depository contract');
        return;
    }

    try {
        const gas = await contract.estimateGas.create(
            quoteToken,
            market,
            booleans,
            terms,
            intervals,
        );
        const tx = await contract.create(
            quoteToken,
            market,
            booleans,
            terms,
            intervals,
            { gasLimit: gas.times(1.1).toFixed(0) }
        );
        if (tx) {
            console.log('create success!')
        }
    } catch (e) {
        console.log('create error:', e);
    }
}

export const close = async (
    contractAddress: string,
    chainId: number,
    walletProvider: ethers.Eip1193Provider,
    id: number | string
) => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getBondDepositoryContract(contractAddress, chainId, ethersProvider);
    if (!contract) {
        console.error('Failed to initialize bond depository contract');
        return;
    }

    try {
        const gas = await contract.estimateGas.close(id);
        const tx = await contract.close(id, { gasLimit: gas.times(1.1).toFixed(0) });
        if (tx) {
            console.log('close success!')
        }
    } catch (e) {
        console.log('close error:', e);
    }
}

export const marketPrice = async (
    contractAddress: string,
    chainId: number,
    walletProvider: ethers.Eip1193Provider,
    id: number
): Promise<BigNumber> => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getBondDepositoryContract(contractAddress, chainId, ethersProvider);
    if (!contract) {
        console.error('Failed to initialize bond depository contract');
        return BigNumber(0);
    }

    try {
        const res = await contract.marketPrice(id);
        return res;
    } catch (e) {
        console.log('marketPrice error:', e);
    }
    return BigNumber(0);
}

export const payoutFor = async (
    contractAddress: string,
    walletProvider: ethers.Eip1193Provider,
    amount: BigNumber,
    id: number
): Promise<BigNumber> => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getBondDepositoryContract(contractAddress, ethersProvider);
    try {
        const res = await contract.payoutFor(
            amount.toFixed(0),
            id,
        );
        return res;
    } catch (e) {
        console.log('payoutFor error:', e);
    }
    return BigNumber(0);
}

export const debtRatio = async (
    contractAddress: string,
    walletProvider: ethers.Eip1193Provider,
    id: number
): Promise<BigNumber> => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getBondDepositoryContract(contractAddress, ethersProvider);
    try {
        const res = await contract.debtRatio(
            id,
        );
        return res;
    } catch (e) {
        console.log('debtRatio error:', e);
    }
    return BigNumber(0);
}

export const currentDebt = async (
    contractAddress: string,
    walletProvider: ethers.Eip1193Provider,
    id: number
): Promise<BigNumber> => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getBondDepositoryContract(contractAddress, ethersProvider);
    try {
        const res = await contract.currentDebt(
            id,
        );
        return res;
    } catch (e) {
        console.log('currentDebt error:', e);
    }
    return BigNumber(0);
}

export const debtDecay = async (
    contractAddress: string,
    walletProvider: ethers.Eip1193Provider,
    id: number
): Promise<BigNumber> => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getBondDepositoryContract(contractAddress, ethersProvider);
    try {
        const res = await contract.debtDecay(
            id,
        );
        return res;
    } catch (e) {
        console.log('debtDecay error:', e);
    }
    return BigNumber(0);
}

export const currentControlVariable = async (
    contractAddress: string,
    walletProvider: ethers.Eip1193Provider,
    id: number
): Promise<BigNumber> => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getBondDepositoryContract(contractAddress, ethersProvider);
    try {
        const res = await contract.currentControlVariable(
            id,
        );
        return res;
    } catch (e) {
        console.log('currentControlVariable error:', e);
    }
    return BigNumber(0);
}

export const isLive = async (
    contractAddress: string,
    walletProvider: ethers.Eip1193Provider,
    id: number
): Promise<Boolean> => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getBondDepositoryContract(contractAddress, ethersProvider);
    try {
        const res = await contract.isLive(
            id,
        );
        return res;
    } catch (e) {
        console.log('isLive error:', e);
    }
    return false;
}

export const liveMarkets = async (
    contractAddress: string,
    walletProvider: ethers.Eip1193Provider,
): Promise<BigNumber[]> => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getBondDepositoryContract(contractAddress, ethersProvider);
    try {
        const res = await contract.liveMarkets();
        return res;
    } catch (e) {
        console.log('liveMarkets error:', e);
    }
    return [BigNumber(0)];
}

export const liveMarketsFor = async (
    contractAddress: string,
    walletProvider: ethers.Eip1193Provider,
    tokenAddress: string
): Promise<BigNumber[]> => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getBondDepositoryContract(contractAddress, ethersProvider);
    try {
        const res = await contract.liveMarketsFor(tokenAddress);
        return res;
    } catch (e) {
        console.log('liveMarketsFor error:', e);
    }
    return [BigNumber(0)];
}

//////////CALCULATOR///////////

export const getKValue = async (
    contractAddress: string,
    walletProvider: ethers.Eip1193Provider,
    pair: string
): Promise<BigNumber> => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getBondingCalculatorContract(contractAddress, ethersProvider);
    try {
        const res = await contract.getKValue(pair);
        return res;
    } catch (e) {
        console.log('getKValue error:', e);
    }
    return BigNumber(0);
}

export const getTotalValue = async (
    contractAddress: string,
    walletProvider: ethers.Eip1193Provider,
    pair: string
): Promise<BigNumber> => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getBondingCalculatorContract(contractAddress, ethersProvider);
    try {
        const res = await contract.getTotalValue(pair);
        return res;
    } catch (e) {
        console.log('getTotalValue error:', e);
    }
    return BigNumber(0);
}

export const valuation = async (
    contractAddress: string,
    walletProvider: ethers.Eip1193Provider,
    pair: string, 
    amount: BigNumber
): Promise<BigNumber> => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getBondingCalculatorContract(contractAddress, ethersProvider);
    try {
        const res = await contract.valuation(pair, amount.toFixed(0));
        return res;
    } catch (e) {
        console.log('valuation error:', e);
    }
    return BigNumber(0);
}

export const markdown = async (
    contractAddress: string,
    walletProvider: ethers.Eip1193Provider,
    pair: string
): Promise<BigNumber> => {
    const ethersProvider = new BrowserProvider(walletProvider);
    const contract = await getBondingCalculatorContract(contractAddress, ethersProvider);
    try {
        const res = await contract.markdown(pair);
        return res;
    } catch (e) {
        console.log('markdown error:', e);
    }
    return BigNumber(0);
}
