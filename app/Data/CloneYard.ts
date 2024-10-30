import type { IToken } from "./Tokens";

export interface DAO {
    bondDepository: string;
    olympusAuthority: string;
    olympusERC20: string;
    sOlympusERC20: string;
    gOlympusERC20: string;
    staking: string;
    stakingDistributor: string;
    treasury: string;
    //TODO: 
    token?: IToken;
}