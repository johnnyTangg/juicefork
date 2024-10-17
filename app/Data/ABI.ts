export const ABI: {[key: string]: any} = {
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
    ]
}