export const chains: {[key: number]: any} = {
    '1': {
        logoURI: '/images/chains/Ethereum.svg',
        name: 'Ethereum Mainnet',
        chainId: 1,
        shortName: 'Ethereum',
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18
        },
        rpc: [
            "https://eth-mainnet.gateway.pokt.network/v1/lb/6f54bd24",
            "https://eth-archival.gateway.pokt.network/v1/lb/6f54bd24",
            'https://cloudflare-eth.com',
            'https://cloudflare-eth.com',
            'https://rpc.ankr.com/eth',],
        explorers: [
            {
                name: 'etherscan',
                url: 'https://etherscan.io',
                standard: 'EIP3091'
            }
        ],
        stableCoins: [
            {
                name: 'USDC',
                symbol: 'USDC',
                address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
                decimals: 6,
                chainId: 1
            },
            {
                name: 'USDT',
                symbol: 'USDT',
                address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                decimals: 6,
                chainId: 1
            },
            {
                name: 'BUSD',
                symbol: 'BUSD',
                address: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
                decimals: 18,
                chainId: 1
            },
            {
                name: 'DAI',
                symbol: 'DAI',
                address: '0x6b175474e89094c44da98b954eedeac495271d0f',
                decimals: 18,
                chainId: 1
            }
        ],
        transportTokens: [
            {
                address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
                decimals: 18,
                name: 'Wrapped ETH',
                symbol: 'WETH'
            }
        ]
    },
    '11155111': {
        logoURI: '/images/chains/Sepolia.svg',
        name: 'Sepolia Testnet',
        chainId: 1,
        shortName: 'Sepolia',
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18
        },
        rpc: [
            "https://sepolia.gateway.tenderly.co",
        ],
        explorers: [
            {
                name: 'etherscan',
                url: 'https://sepolia.etherscan.io',
                standard: 'EIP3091'
            }
        ],
        transportTokens: [
            {
                address: '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9',
                decimals: 18,
                name: 'Wrapped ETH',
                symbol: 'WETH'
            }
        ]
    },
}