import { factory } from "../Data/Contracts";
import type { CloneYard } from "../Typings";
import { BrowserProvider } from "ethers";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { ABI } from "../Data/ABI";
import { chains } from "../Data/Chains";
import { DAO } from "../Data/CloneYard";
import { getTokenInfo } from "./ERC20Helpers";

const chainId = 11155111;

export const getStakingContract = async (contractAddress: string) => {
    const provider = new ethers.JsonRpcProvider(chains[chainId].rpc[0]);
    return new ethers.Contract(contractAddress, ABI['CloneYard'], provider) as unknown as CloneYard;
}

export const getClonesByPage = async (page: number, contractAddress: string): Promise<DAO[]> => {
    const contract = await getStakingContract(contractAddress);

    try {
        const res = await contract.getClonesByPage(page);
        console.log('got clones: page:', page, res);
        return res;
        // const data: DAO = {
        //     bondDepository: res[i].bondDepository,
        //     olympusAuthority: res[1].olympusAuthority,
        //     olympusERC20: res[1].olympusERC20,
        //     sOlympusERC20: res[1].sOlympusERC20,
        //     gOlympusERC20: res[1].gOlympusERC20,
        //     staking: res[1].staking,
        //     stakingDistributor: res[1].stakingDistributor,
        //     treasury: res[1].treasury,
        // }
    } catch (e) {
        console.error('getClonesByPage:', e);
    }

    return [];
}