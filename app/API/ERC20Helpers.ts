import { ethers } from "ethers"
import { ABI } from "../Data/ABI";
import { ERC20 } from "../Typings";
import { IToken } from "../Data/Tokens";
import { chains } from "../Data/Chains";

const chain = 11155111;

const getERC20Contract = async (address: string): Promise<ERC20 | undefined> => {
    const provider = new ethers.JsonRpcProvider(chains[chain].rpc[0]);
    // console.log("using RPC", address, chains[chain].rpc[0], provider, ABI['ERC20']);
    try{
        return new ethers.Contract(address, ABI['ERC20'], provider) as unknown as ERC20;
    }catch(e){
        console.error('invalid CA', e);
    }
}

export const getTokenInfo = async (tokenAddress: string, walletAddress: string): Promise<IToken> => {
    const contract = await getERC20Contract(tokenAddress);
    if(!contract) return {symbol: 'ERR'};
    console.log('getTokenInfo walletAddress', walletAddress);

    let tokenDetails: IToken = {};
    let err = false;
    try{
        tokenDetails.symbol = await contract.symbol();
        tokenDetails.name = await contract.name();
        tokenDetails.decimals = await contract.decimals();
        tokenDetails.walletBalance = await contract.balanceOf(walletAddress);
        tokenDetails.address = tokenAddress;
    }catch(e){
        console.log('getTokenInfo error:', e);
        err = true;
    }
    console.log('getTokenInfo tokenDetails:', tokenDetails)
    if(err) return {symbol: 'ERR'};
    return tokenDetails;
}