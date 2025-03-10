'use client';

import Header from '@/components/header';
import { formatAddress } from '@/lib/utils';
import { useAccount, useAccountEffect } from 'wagmi';
import { useRouter, useSearchParams } from 'next/navigation';

export default function QRLayout({ children }) {
  const searchParams = useSearchParams();
  const petId = searchParams.get('petId');
  const { address } = useAccount();
  const router = useRouter();

  useAccountEffect({
    onDisconnect() {
      router.push(`/?returnUrl=/qrscan?petId=${petId}`);
    },
  });

  return (
    <div className={`h-screen xl:overflow-hidden overflow-auto`}>
      <Header addr={address ? formatAddress(address) : ''} QR={true} />
      <div className="sm:w-full w-max h-[40rem] mt-4 flex flex-row">
        <div className="w-full bg-[#E9E6DD] xl:h-full h-max md:mx-40 mx-10  rounded-[20px]">
          {children}
        </div>
      </div>
    </div>
  );
}
