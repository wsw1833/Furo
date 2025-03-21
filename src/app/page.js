'use client';
import Image from 'next/image';
import animals from '@images/animals.jpg';
import furo from '@images/furo.png';
import scroll from '@images/scroll.png';
import metamask from '@images/metamask.png';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Separate component for handling search params
const SearchParamsHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams ? searchParams.get('returnUrl') : null;
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && returnUrl) {
      router.push(returnUrl);
    }
    if (isConnected && returnUrl == null) {
      router.push('/profile');
    }
  }, [isConnected, router, returnUrl]);

  return null;
};

export default function Home() {
  const { connect, connectors } = useConnect();

  function connectHandler() {
    if (connectors.length > 0) {
      connect({ connector: connectors[0] });
    } else {
      console.error('No wallet connectors available');
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsHandler />
      <div className="flex flex-col sm:flex-row-reverse h-auto">
        <Image
          className="sm:w-[50%] shrink-0 max-h-200 sm:min-h-180 h-fit brightness-70"
          src={animals}
          priority={true}
          alt="animal picture"
        />
        <div className="flex flex-col sm:w-[50%] sm:mt-18 sm:px-12 mt-10 px-6 w-full">
          <div className="flex flex-row items-center sm:justify-start gap-2">
            <Image
              priority={true}
              src={furo}
              alt="icon"
              className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16"
            />
            <div className="text-3xl md:text-4xl lg:text-5xl font-semibold">
              Furo
            </div>
          </div>
          <p className="line-clamp-2 sm:mt-10 mt-6 text-3xl md:text-4xl lg:text-6xl font-bold lg:leading-20 w-full">
            Pawprints in the Blockchain
          </p>
          <p className="line-clamp-2 lg:w-[60%] md:w-[80%] sm:mt-8 mt-6 text-xl md:text-2xl lg:text-4xl font-medium w-full lg:leading-12">
            Revolutionizing Pet Care with Soulbound
          </p>
          <div className="flex flex-row items-center justify-start gap-2 mt-6">
            <p className="text-xs md:text-sm lg:text-base font-medium text-[#484848]">
              Powered By Scroll.
            </p>
            <Image src={scroll} alt="icon" className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <Button
            onClick={connectHandler}
            className="bg-[#FFC65C] shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:my-14 my-8 md:w-fit w-[15rem] px-10 h-auto py-2 text-[#181818] font-medium rounded-[12px] text-sm md:text-base lg:text-lg flex gap-4 items-center justify-center hover:bg-[#F89D47] transition hover:duration-300"
          >
            Connect With Metamask
            <Image src={metamask} alt="metamask logo" width={32} height={32} />
          </Button>
        </div>
      </div>
    </Suspense>
  );
}
