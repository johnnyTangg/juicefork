import { ethers } from "ethers"
import { ABI } from "../Data/ABI";
import { ERC20 } from "../Typings";
import { IToken } from "../Data/Tokens";
import { chains } from "../Data/Chains";
import BigNumber from "bignumber.js";
import { BrowserProvider } from "ethers";

const chain = 11155111;

const getERC20Contract = async (address: string, BrowserProvider?: ethers.BrowserProvider): Promise<ERC20 | undefined> => {
    let provider: any;
    if(!BrowserProvider){
        provider = new ethers.JsonRpcProvider(chains[chain].rpc[0]);
    }else{
        provider = await BrowserProvider.getSigner()
    }
    // console.log("using RPC", address, chains[chain].rpc[0], provider, ABI['ERC20']);
    try{
        return new ethers.Contract(address, ABI['ERC20'], provider) as unknown as ERC20;
    }catch(e){
        console.error('invalid CA', e);
    }
}

export const getTokenInfo = async (tokenAddress: string, walletAddress?: string): Promise<IToken> => {
    const contract = await getERC20Contract(tokenAddress);
    if(!contract) return {symbol: 'ERR'};
    console.log('getTokenInfo walletAddress', walletAddress, tokenAddress);

    let tokenDetails: IToken = {};
    let err = false;
    try{
        tokenDetails.symbol = await contract.symbol();//TODO: skip this once clones have IToken struct included
        tokenDetails.name = await contract.name();//TODO: skip this once clones have IToken struct included
        tokenDetails.decimals = +(await contract.decimals()).toString();//TODO: skip this once clones have IToken struct included
        if(walletAddress){
            tokenDetails.walletBalance = await contract.balanceOf(walletAddress);
            tokenDetails.address = tokenAddress;
        }
    }catch(e){
        console.log('getTokenInfo error:', e);
        err = true;
    }
    console.log('getTokenInfo tokenDetails:', tokenDetails)
    if(err) return {symbol: 'ERR'};
    return tokenDetails;
}

export const approvalNeeded = async (token: string, owner: string, spender: string, amount: BigNumber): Promise<boolean> => {
    const contract = await getERC20Contract(token);
    const allowance = await contract?.allowance(owner, spender);
    console.log('approvalNeeded allowance:', allowance);
    if(BigNumber(allowance.toString()).gte(amount)){
        return false;
    }else{
        return true;
    }
}

export const approve = async (walletProvider: ethers.Eip1193Provider, token: string, spender: string, amount: BigNumber): Promise<boolean> => {
    const contract = await getERC20Contract(token, new BrowserProvider(walletProvider));
    const tx = await contract?.approve(spender, amount.toFixed(0));
    if(tx){
        return true;
    }else{
        return false;
    }
}