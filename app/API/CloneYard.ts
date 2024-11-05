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
        console.log('got clones:', Object.keys(res));
        // return res;
        const daos: DAO[] = res.map((item: any) => ({
            bondDepository: item.clone.bondDepository,
            olympusAuthority: item.clone.olympusAuthority,
            olympusERC20: item.clone.olympusERC20,
            sOlympusERC20: item.clone.sOlympusERC20,
            gOlympusERC20: item.clone.gOlympusERC20,
            staking: item.clone.staking,
            stakingDistributor: item.clone.stakingDistributor,
            treasury: item.clone.treasury,
            OHM: {
                address: item.clone.olympusERC20,
                name: item.ohmMetadata.name,
                symbol: item.ohmMetadata.symbol,
                decimals: item.ohmMetadata.decimals
            },
            sOHM: {
                address: item.clone.sOlympusERC20,
                name: item.sOhmMetadata.name,
                symbol: item.sOhmMetadata.symbol,
                decimals: item.sOhmMetadata.decimals
            },
            gOHM: {
                address: item.clone.gOlympusERC20,
                name: item.gOhmMetadata.name,
                symbol: item.gOhmMetadata.symbol,
                decimals: item.gOhmMetadata.decimals
            }
        }));

        console.log('daos', daos);

        return daos;
    } catch (e) {
        console.error('getClonesByPage:', e);
    }

    return [];
}