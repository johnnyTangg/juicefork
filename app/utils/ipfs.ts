export const getIpfsUrl = (ipfsUrl: string | null | undefined): string => {
  if (!ipfsUrl) return '';
  try {
    // Handle both ipfs:// and direct hash formats
    const hash = ipfsUrl.replace('ipfs://', '').replace('https://ipfs.io/ipfs/', '');
    return `https://ipfs.io/ipfs/${hash}`;
  } catch (error) {
    console.error('Error processing IPFS URL:', error);
    return '';
  }
}; 