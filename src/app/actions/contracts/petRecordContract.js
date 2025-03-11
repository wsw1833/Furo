import { ethers } from 'ethers';
import { petRecordSystem } from '@/lib/constant';
import petRecordSystemABI from '../../../../ABI/petRecordSystem' assert { type: 'json' };

const CONTRACT_ADDRESS = petRecordSystem;

// Scroll Sepolia Chain ID
const SCROLL_SEPOLIA_CHAIN_ID = 534351;
const SCROLL_SEPOLIA_CHAIN_ID_HEX = '0x8274f';

const SCROLL_SEPOLIA_RPC_URL = 'https://sepolia-rpc.scroll.io/';
// Create a contract instance (read-only)
export const getReadOnlyContract = () => {
  const provider = new ethers.providers.JsonRpcProvider(SCROLL_SEPOLIA_RPC_URL);
  return new ethers.Contract(CONTRACT_ADDRESS, petRecordSystemABI, provider);
};

export const getSignedContract = async () => {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('Ethereum provider not found. Please install MetaMask.');
  }

  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Make sure we're on Scroll Sepolia
    const network = await provider.getNetwork();
    if (network.chainId !== SCROLL_SEPOLIA_CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: SCROLL_SEPOLIA_CHAIN_ID_HEX }],
        });
        // Refresh provider after switching networks
        const updatedProvider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        const updatedSigner = updatedProvider.getSigner();
        return new ethers.Contract(
          CONTRACT_ADDRESS,
          petRecordSystemABI,
          updatedSigner
        );
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: SCROLL_SEPOLIA_CHAIN_ID_HEX,
                  chainName: 'Scroll Sepolia Testnet',
                  nativeCurrency: {
                    name: 'Ethereum',
                    symbol: 'ETH',
                    decimals: 18,
                  },
                  rpcUrls: [SCROLL_SEPOLIA_RPC_URL],
                  blockExplorerUrls: ['https://sepolia.scrollscan.com/'],
                },
              ],
            });
            // Refresh provider after adding network
            const updatedProvider = new ethers.providers.Web3Provider(
              window.ethereum
            );
            const updatedSigner = updatedProvider.getSigner();
            return new ethers.Contract(
              CONTRACT_ADDRESS,
              PET_RECORD_ABI,
              updatedSigner
            );
          } catch (addError) {
            console.error('Failed to add Scroll Sepolia network', addError);
            throw new Error('Please add Scroll Sepolia network to your wallet');
          }
        }
        console.error('Failed to switch to Scroll Sepolia', switchError);
        throw new Error('Please switch to Scroll Sepolia testnet');
      }
    }

    return new ethers.Contract(CONTRACT_ADDRESS, petRecordSystemABI, signer);
  } catch (error) {
    console.error('Error connecting to wallet:', error);
    throw error;
  }
};

// Mint a new pet
export const mintPet = async (toAddress, tokenUri) => {
  try {
    const contract = await getSignedContract();
    const tx = await contract.mintPet(toAddress, tokenUri);
    const receipt = await tx.wait();

    // Find the token ID from the transaction receipt (by parsing events)
    const event = receipt.events.find((event) => event.event === 'Transfer');
    const tokenId = event.args.tokenId || event.args[2]; // depends on the event structure

    return {
      success: true,
      tokenId: tokenId.toString(),
      txHash: receipt.transactionHash,
    };
  } catch (error) {
    console.error('Error minting pet:', error);
    return { success: false, error: error.message };
  }
};

// Register a service provider
export const registerServiceProvider = async (providerAddress, name) => {
  try {
    const contract = await getSignedContract();
    const tx = await contract.registerServiceProvider(providerAddress, name);
    await tx.wait();
    return { success: true, txHash: tx.hash };
  } catch (error) {
    console.error('Error registering provider:', error);
    return { success: false, error: error.message };
  }
};

// Add a pet record
export const addPetRecord = async (
  ownerAddress,
  petTokenId,
  recordType,
  tokenUri
) => {
  try {
    const contract = await getSignedContract();
    const tx = await contract.addPetRecord(
      ownerAddress,
      petTokenId,
      recordType,
      tokenUri
    );
    const receipt = await tx.wait();

    // Find the record ID from transaction receipt
    const event = receipt.events.find(
      (event) => event.event === 'ChildRecordAdded'
    );
    const recordId = event ? event.args.childId.toString() : null;

    return {
      success: true,
      recordId: recordId,
      txHash: receipt.transactionHash,
    };
  } catch (error) {
    console.error('Error adding pet record:', error);
    return { success: false, error: error.message };
  }
};

// Get pet records
export const getPetRecords = async (petTokenId) => {
  try {
    const contract = getReadOnlyContract();
    const records = await contract.getPetRecords(petTokenId);
    return { success: true, records };
  } catch (error) {
    console.error('Error getting pet records:', error);
    return { success: false, error: error.message };
  }
};

// Check if an address is a service provider
export const isServiceProvider = async (address) => {
  try {
    const contract = getReadOnlyContract();
    const isProvider = await contract.isServiceProvider(address);
    return { success: true, isProvider };
  } catch (error) {
    console.error('Error checking provider status:', error);
    return { success: false, error: error.message };
  }
};

// Transfer pet ownership
export const transferPetOwnership = async (toAddress, petTokenId) => {
  try {
    const contract = await getSignedContract();
    const tx = await contract.transferPetOwnership(toAddress, petTokenId);
    await tx.wait();
    return { success: true, txHash: tx.hash };
  } catch (error) {
    console.error('Error transferring pet ownership:', error);
    return { success: false, error: error.message };
  }
};

// Get pet owner
export const getPetOwner = async (petTokenId) => {
  try {
    const contract = getReadOnlyContract();
    const owner = await contract.ownerOf(petTokenId);
    return { success: true, owner };
  } catch (error) {
    console.error('Error getting pet owner:', error);
    return { success: false, error: error.message };
  }
};
