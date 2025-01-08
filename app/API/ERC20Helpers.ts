import { ethers } from "ethers"
import { ABI } from "../Data/ABI";
import { ERC20 } from "../Typings";
import { IToken } from "../Data/Tokens";
import { chains } from "../Data/Chains";
import BigNumber from "bignumber.js";
import { BrowserProvider } from "ethers";

const getERC20Contract = async (address: string, chainId: number, provider?: ethers.BrowserProvider): Promise<ERC20 | undefined> => {
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
    try{
        return new ethers.Contract(address, ABI['ERC20'], signer) as unknown as ERC20;
    }catch(e){
        console.error('invalid CA', e);
    }
}

export const getTokenInfo = async (tokenAddress: string, chainId: number, walletAddress?: string): Promise<IToken> => {
    const contract = await getERC20Contract(tokenAddress, chainId);
    if(!contract) return {symbol: 'ERR'};
    // console.log('getTokenInfo walletAddress', walletAddress, tokenAddress, 'chain:', chainId);

    let tokenDetails: IToken = {};
    let err = false;
    try{
        tokenDetails.symbol = await contract.symbol();
        tokenDetails.name = await contract.name();
        tokenDetails.decimals = +(await contract.decimals()).toString();
        if(walletAddress){
            tokenDetails.walletBalance = await contract.balanceOf(walletAddress);
            tokenDetails.address = tokenAddress;
        }
    }catch(e){
        console.log('getTokenInfo error:', e);
        err = true;
    }
    // console.log('getTokenInfo tokenDetails:', tokenDetails)
    if(err) return {symbol: 'ERR'};
    return tokenDetails;
}

export const approvalNeeded = async (token: string, chainId: number, owner: string, spender: string, amount: BigNumber): Promise<boolean> => {
    const contract = await getERC20Contract(token, chainId);
    const allowance = await contract?.allowance(owner, spender);
    console.log('approvalNeeded allowance:', allowance);
    if(BigNumber(allowance.toString()).gte(amount)){
        return false;
    }else{
        return true;
    }
}

export const approve = async (walletProvider: ethers.Eip1193Provider, token: string, chainId: number, spender: string, amount: BigNumber): Promise<boolean> => {
    const contract = await getERC20Contract(token, chainId, new BrowserProvider(walletProvider));
    const tx = await contract?.approve(spender, amount.toFixed(0));
    if(tx){
        return true;
    }else{
        return false;
    }
}