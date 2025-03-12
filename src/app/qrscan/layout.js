'use client';

import Header from '@/components/header';
import { formatAddress } from '@/lib/utils';
import { useAccount } from 'wagmi';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

// Create a separate component for the logic that uses useSearchParams
function QRLayoutContent({ children }) {
  const searchParams = useSearchParams();
  const petId = searchParams.get('petId') || ''; // Fallback for missing petId
  const { address, isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push(`/?returnUrl=/qrscan?petId=${petId}`);
    }
  }, [isConnected, router, petId]);

  return (
    <div className="h-screen xl:overflow-hidden overflow-auto">
      <Header addr={address ? formatAddress(address) : ''} QR={true} />
      <div className="sm:w-full w-full h-[40rem] mt-4 flex flex-row">
        <div className="w-full bg-[#E9E6DD] xl:h-full h-max md:mx-40 mx-10 rounded-[20px]">
          {children}
        </div>
      </div>
    </div>
  );
}

// The main QRLayout component wraps the content in Suspense
export default function QRLayout({ children }) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-full">
          Loading...
        </div>
      }
    >
      <QRLayoutContent>{children}</QRLayoutContent>
    </Suspense>
  );
}
