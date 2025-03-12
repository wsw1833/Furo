import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PinataSDK } from 'pinata';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatAddress = (addr) => {
  if (!addr || addr.length < 10) {
    throw new Error('Invalid wallet address');
  }
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

export const dateFormat = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`,
});

export const ipfsURL = (cid) => {
  return `https://turquoise-perfect-caterpillar-941.mypinata.cloud/ipfs/${cid}`;
};
