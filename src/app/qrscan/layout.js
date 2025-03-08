'use client';

import Header from '@/components/header';
import { formatAddress } from '@/lib/utils';
import { useAccount } from 'wagmi';

export default function QRLayout({ children }) {
  const { address } = useAccount();
  return (
    <div className={`h-screen xl:overflow-hidden overflow-auto`}>
      <Header addr={formatAddress(address)} QR={true} />
      <div className="w-full h-[40rem] mt-4 flex flex-row">
        <div className="w-full md:w-screen bg-[#E9E6DD] xl:h-full h-max md:mx-40 mx-10 rounded-[20px]">
          {children}
        </div>
      </div>
    </div>
  );
}
