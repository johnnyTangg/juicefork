import { type InterfaceAbi } from "ethers"

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
    ]
}