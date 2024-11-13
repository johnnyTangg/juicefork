import { type InterfaceAbi } from "ethers"
import { OlympusBondDepositoryV2 } from "../Typings"

export const ABI: { [key: string]: InterfaceAbi } = {
    factory: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_olympusAuthority",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_olympusERC20",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_sOlympusERC20",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_gOlympusERC20",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_staking",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_stakingDistributor",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_treasury",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_bondDepository",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "bondDepository",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "olympusAuthority",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "olympusERC20",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "sOlympusERC20",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "gOlympusERC20",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "staking",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "stakingDistributor",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "treasury",
                    "type": "address"
                }
            ],
            "name": "CloneFactoryDeployed",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_olympusAuthority",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_olympusERC20",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_sOlympusERC20",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_gOlympusERC20",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_staking",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_stakingDistributor",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_treasury",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_bondDepository",
                    "type": "address"
                }
            ],
            "name": "adjustContracts",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "bondDepository",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "clones",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "bondDepository",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "olympusAuthority",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "olympusERC20",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "sOlympusERC20",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "gOlympusERC20",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "staking",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "stakingDistributor",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "treasury",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "symbol",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_epochLength",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_firstEpochNumber",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_firstEpochTime",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "initialSupply",
                    "type": "uint256"
                }
            ],
            "name": "deployAndInitializeClone",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "bondDepository",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "olympusAuthority",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "olympusERC20",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "sOlympusERC20",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "gOlympusERC20",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "staking",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "stakingDistributor",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "treasury",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct CloneYard.Clone",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "gOlympusERC20",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "olympusAuthority",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "olympusERC20",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "sOlympusERC20",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "staking",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "stakingDistributor",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "treasury",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ],
    ERC20: [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name_",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "symbol_",
                    "type": "string"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "subtractedValue",
                    "type": "uint256"
                }
            ],
            "name": "decreaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "addedValue",
                    "type": "uint256"
                }
            ],
            "name": "increaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    OlympusStaking: [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "contract IOlympusAuthority",
                    "name": "authority",
                    "type": "address"
                }
            ],
            "name": "AuthorityUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "distributor",
                    "type": "address"
                }
            ],
            "name": "DistributorSet",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "warmup",
                    "type": "uint256"
                }
            ],
            "name": "WarmupSet",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "OHM",
            "outputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "authority",
            "outputs": [
                {
                    "internalType": "contract IOlympusAuthority",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "_rebasing",
                    "type": "bool"
                }
            ],
            "name": "claim",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "distributor",
            "outputs": [
                {
                    "internalType": "contract IDistributor",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "epoch",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "length",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "number",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "end",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "distribute",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "forfeit",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "gOHM",
            "outputs": [
                {
                    "internalType": "contract IgOHM",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "index",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IOlympusAuthority",
                    "name": "_authority",
                    "type": "address"
                }
            ],
            "name": "initialize_OlympusAccessControlled",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_ohm",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_sOHM",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_gOHM",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_epochLength",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_firstEpochNumber",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_firstEpochTime",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_authority",
                    "type": "address"
                }
            ],
            "name": "initialize_OlympusStaking",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "rebase",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "sOHM",
            "outputs": [
                {
                    "internalType": "contract IsOHM",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "secondsToNextEpoch",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IOlympusAuthority",
                    "name": "_newAuthority",
                    "type": "address"
                }
            ],
            "name": "setAuthority",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_distributor",
                    "type": "address"
                }
            ],
            "name": "setDistributor",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_warmupPeriod",
                    "type": "uint256"
                }
            ],
            "name": "setWarmupLength",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "_rebasing",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "_claim",
                    "type": "bool"
                }
            ],
            "name": "stake",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "supplyInWarmup",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "toggleLock",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "_trigger",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "_rebasing",
                    "type": "bool"
                }
            ],
            "name": "unstake",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amount_",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "unwrap",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "sBalance_",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "warmupInfo",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "deposit",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "gons",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "expiry",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "lock",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "warmupPeriod",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "wrap",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "gBalance_",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    CloneYard: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_olympusAuthority",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_olympusERC20",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_sOlympusERC20",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_gOlympusERC20",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_staking",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_stakingDistributor",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_treasury",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_bondDepository",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "bondDepository",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "olympusAuthority",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "olympusERC20",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "sOlympusERC20",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "gOlympusERC20",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "staking",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "stakingDistributor",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "treasury",
                    "type": "address"
                }
            ],
            "name": "CloneFactoryDeployed",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "PAGE_SIZE",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_olympusAuthority",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_olympusERC20",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_sOlympusERC20",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_gOlympusERC20",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_staking",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_stakingDistributor",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_treasury",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_bondDepository",
                    "type": "address"
                }
            ],
            "name": "adjustContracts",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_feeWallet",
                    "type": "address"
                }
            ],
            "name": "adjustFeeWallet",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_deploymentFee",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_stakingFee",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_rebaseFee",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_bondingFee",
                    "type": "uint256"
                }
            ],
            "name": "adjustFees",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "adjustOwner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "bondDepository",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "bondingFee",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "clones",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "bondDepository",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "olympusAuthority",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "olympusERC20",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "sOlympusERC20",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "gOlympusERC20",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "staking",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "stakingDistributor",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "treasury",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "symbol",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_epochLength",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_firstEpochNumber",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_firstEpochTime",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "initialSupply",
                    "type": "uint256"
                }
            ],
            "name": "deployAndInitializeClone",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "bondDepository",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "olympusAuthority",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "olympusERC20",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "sOlympusERC20",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "gOlympusERC20",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "staking",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "stakingDistributor",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "treasury",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct CloneYard.Clone",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "deployerIndices",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "deploymentFee",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "feeWallet",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "gOlympusERC20",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "page",
                    "type": "uint256"
                }
            ],
            "name": "getClonesByPage",
            "outputs": [
                {
                    "components": [
                        {
                            "components": [
                                {
                                    "internalType": "address",
                                    "name": "bondDepository",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "olympusAuthority",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "olympusERC20",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "sOlympusERC20",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "gOlympusERC20",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "staking",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "stakingDistributor",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "treasury",
                                    "type": "address"
                                }
                            ],
                            "internalType": "struct CloneYard.Clone",
                            "name": "clone",
                            "type": "tuple"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalTokenSupply",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalStaked",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "rewardRate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "warmupPeriod",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "rebaseBounty",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalGovTokens",
                            "type": "uint256"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "name",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "symbol",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint8",
                                    "name": "decimals",
                                    "type": "uint8"
                                }
                            ],
                            "internalType": "struct CloneYard.TokenMetadata",
                            "name": "ohmMetadata",
                            "type": "tuple"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "name",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "symbol",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint8",
                                    "name": "decimals",
                                    "type": "uint8"
                                }
                            ],
                            "internalType": "struct CloneYard.TokenMetadata",
                            "name": "sOhmMetadata",
                            "type": "tuple"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "name",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "symbol",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint8",
                                    "name": "decimals",
                                    "type": "uint8"
                                }
                            ],
                            "internalType": "struct CloneYard.TokenMetadata",
                            "name": "gOhmMetadata",
                            "type": "tuple"
                        }
                    ],
                    "internalType": "struct CloneYard.CloneInfo[]",
                    "name": "pageClones",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "getInfoByIndex",
            "outputs": [
                {
                    "components": [
                        {
                            "components": [
                                {
                                    "internalType": "address",
                                    "name": "bondDepository",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "olympusAuthority",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "olympusERC20",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "sOlympusERC20",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "gOlympusERC20",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "staking",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "stakingDistributor",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "treasury",
                                    "type": "address"
                                }
                            ],
                            "internalType": "struct CloneYard.Clone",
                            "name": "clone",
                            "type": "tuple"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalTokenSupply",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalStaked",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "rewardRate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "warmupPeriod",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "rebaseBounty",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalGovTokens",
                            "type": "uint256"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "name",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "symbol",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint8",
                                    "name": "decimals",
                                    "type": "uint8"
                                }
                            ],
                            "internalType": "struct CloneYard.TokenMetadata",
                            "name": "ohmMetadata",
                            "type": "tuple"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "name",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "symbol",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint8",
                                    "name": "decimals",
                                    "type": "uint8"
                                }
                            ],
                            "internalType": "struct CloneYard.TokenMetadata",
                            "name": "sOhmMetadata",
                            "type": "tuple"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "name",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "symbol",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint8",
                                    "name": "decimals",
                                    "type": "uint8"
                                }
                            ],
                            "internalType": "struct CloneYard.TokenMetadata",
                            "name": "gOhmMetadata",
                            "type": "tuple"
                        }
                    ],
                    "internalType": "struct CloneYard.CloneInfo",
                    "name": "info",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "olympusAuthority",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "olympusERC20",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "rebaseFee",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "sOlympusERC20",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "staking",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "stakingDistributor",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "stakingFee",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "treasury",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ],
    OlympusBondDepositoryV2: [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "contract IOlympusAuthority",
                    "name": "authority",
                    "type": "address"
                }
            ],
            "name": "AuthorityUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                }
            ],
            "name": "Bond",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "CloseMarket",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "baseToken",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "quoteToken",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "initialPrice",
                    "type": "uint256"
                }
            ],
            "name": "CreateMarket",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint64",
                    "name": "oldControlVariable",
                    "type": "uint64"
                },
                {
                    "indexed": false,
                    "internalType": "uint64",
                    "name": "newControlVariable",
                    "type": "uint64"
                }
            ],
            "name": "Tuned",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "adjustments",
            "outputs": [
                {
                    "internalType": "uint64",
                    "name": "change",
                    "type": "uint64"
                },
                {
                    "internalType": "uint48",
                    "name": "lastAdjustment",
                    "type": "uint48"
                },
                {
                    "internalType": "uint48",
                    "name": "timeToAdjusted",
                    "type": "uint48"
                },
                {
                    "internalType": "bool",
                    "name": "active",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "authority",
            "outputs": [
                {
                    "internalType": "contract IOlympusAuthority",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "close",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "_quoteToken",
                    "type": "address"
                },
                {
                    "internalType": "uint256[3]",
                    "name": "_market",
                    "type": "uint256[3]"
                },
                {
                    "internalType": "bool[2]",
                    "name": "_booleans",
                    "type": "bool[2]"
                },
                {
                    "internalType": "uint256[2]",
                    "name": "_terms",
                    "type": "uint256[2]"
                },
                {
                    "internalType": "uint32[2]",
                    "name": "_intervals",
                    "type": "uint32[2]"
                }
            ],
            "name": "create",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id_",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "currentControlVariable",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "currentDebt",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "daoReward",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "debtDecay",
            "outputs": [
                {
                    "internalType": "uint64",
                    "name": "",
                    "type": "uint64"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "debtRatio",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_maxPrice",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_referral",
                    "type": "address"
                }
            ],
            "name": "deposit",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "payout_",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "expiry_",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "index_",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getReward",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "indexesFor",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "init",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IOlympusAuthority",
                    "name": "_authority",
                    "type": "address"
                },
                {
                    "internalType": "contract IERC20",
                    "name": "_ohm",
                    "type": "address"
                }
            ],
            "name": "initialize_FrontEndRewarder",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IOlympusAuthority",
                    "name": "_authority",
                    "type": "address"
                },
                {
                    "internalType": "contract IERC20",
                    "name": "_ohm",
                    "type": "address"
                },
                {
                    "internalType": "contract IgOHM",
                    "name": "_gohm",
                    "type": "address"
                },
                {
                    "internalType": "contract IStaking",
                    "name": "_staking",
                    "type": "address"
                },
                {
                    "internalType": "contract ITreasury",
                    "name": "_treasury",
                    "type": "address"
                }
            ],
            "name": "initialize_NoteKeeper",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IOlympusAuthority",
                    "name": "_authority",
                    "type": "address"
                }
            ],
            "name": "initialize_OlympusAccessControlled",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IOlympusAuthority",
                    "name": "_authority",
                    "type": "address"
                },
                {
                    "internalType": "contract IERC20",
                    "name": "_ohm",
                    "type": "address"
                },
                {
                    "internalType": "contract IgOHM",
                    "name": "_gohm",
                    "type": "address"
                },
                {
                    "internalType": "contract IStaking",
                    "name": "_staking",
                    "type": "address"
                },
                {
                    "internalType": "contract ITreasury",
                    "name": "_treasury",
                    "type": "address"
                }
            ],
            "name": "initialize_OlympusBondDepositoryV2",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "isLive",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "liveMarkets",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_token",
                    "type": "address"
                }
            ],
            "name": "liveMarketsFor",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "marketPrice",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "markets",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "capacity",
                    "type": "uint256"
                },
                {
                    "internalType": "contract IERC20",
                    "name": "quoteToken",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "capacityInQuote",
                    "type": "bool"
                },
                {
                    "internalType": "uint64",
                    "name": "totalDebt",
                    "type": "uint64"
                },
                {
                    "internalType": "uint64",
                    "name": "maxPayout",
                    "type": "uint64"
                },
                {
                    "internalType": "uint64",
                    "name": "sold",
                    "type": "uint64"
                },
                {
                    "internalType": "uint256",
                    "name": "purchased",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "marketsForQuote",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "metadata",
            "outputs": [
                {
                    "internalType": "uint48",
                    "name": "lastTune",
                    "type": "uint48"
                },
                {
                    "internalType": "uint48",
                    "name": "lastDecay",
                    "type": "uint48"
                },
                {
                    "internalType": "uint48",
                    "name": "length",
                    "type": "uint48"
                },
                {
                    "internalType": "uint48",
                    "name": "depositInterval",
                    "type": "uint48"
                },
                {
                    "internalType": "uint48",
                    "name": "tuneInterval",
                    "type": "uint48"
                },
                {
                    "internalType": "uint8",
                    "name": "quoteDecimals",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "notes",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "payout",
                    "type": "uint256"
                },
                {
                    "internalType": "uint48",
                    "name": "created",
                    "type": "uint48"
                },
                {
                    "internalType": "uint48",
                    "name": "matured",
                    "type": "uint48"
                },
                {
                    "internalType": "uint48",
                    "name": "redeemed",
                    "type": "uint48"
                },
                {
                    "internalType": "uint48",
                    "name": "marketID",
                    "type": "uint48"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "payoutFor",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_index",
                    "type": "uint256"
                }
            ],
            "name": "pendingFor",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "payout_",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "matured_",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_from",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_index",
                    "type": "uint256"
                }
            ],
            "name": "pullNote",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "newIndex_",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_index",
                    "type": "uint256"
                }
            ],
            "name": "pushNote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_indexes",
                    "type": "uint256[]"
                },
                {
                    "internalType": "bool",
                    "name": "_sendgOHM",
                    "type": "bool"
                }
            ],
            "name": "redeem",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "payout_",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "_sendgOHM",
                    "type": "bool"
                }
            ],
            "name": "redeemAll",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "refReward",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "rewards",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IOlympusAuthority",
                    "name": "_newAuthority",
                    "type": "address"
                }
            ],
            "name": "setAuthority",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_toFrontEnd",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_toDAO",
                    "type": "uint256"
                }
            ],
            "name": "setRewards",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "terms",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "fixedTerm",
                    "type": "bool"
                },
                {
                    "internalType": "uint64",
                    "name": "controlVariable",
                    "type": "uint64"
                },
                {
                    "internalType": "uint48",
                    "name": "vesting",
                    "type": "uint48"
                },
                {
                    "internalType": "uint48",
                    "name": "conclusion",
                    "type": "uint48"
                },
                {
                    "internalType": "uint64",
                    "name": "maxDebt",
                    "type": "uint64"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "updateTreasury",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_operator",
                    "type": "address"
                }
            ],
            "name": "whitelist",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "whitelisted",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ],
    OlympusBondingCalculator: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_pair",
                    "type": "address"
                }
            ],
            "name": "getKValue",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "k_",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_pair",
                    "type": "address"
                }
            ],
            "name": "getTotalValue",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_OHM",
                    "type": "address"
                }
            ],
            "name": "initialize_OlympusBondingCalculator",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_pair",
                    "type": "address"
                }
            ],
            "name": "markdown",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_pair",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount_",
                    "type": "uint256"
                }
            ],
            "name": "valuation",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
}