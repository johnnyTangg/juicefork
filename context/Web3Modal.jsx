'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'a16b7cd9c3f06e7b9bd5408a89093faa'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const sepolia = {
  chainId: 11155111,
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io/',
  rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com'
}

const base = {
  chainId: 8453,
  name: 'Base',
  currency: 'ETH',
  explorerUrl: 'https://basescan.org',
  rpcUrl: 'https://mainnet.base.org'
}

// 3. Create modal
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet, sepolia, base],
  projectId,
  enableAnalytics: true
})

export function Web3ModalProvider({ children }) {
  return children
}