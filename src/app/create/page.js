'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import back from '@images/back.png';
import star from '@images/stars.png';
import Image from 'next/image';
import ProfileForm from '@/components/profileForm';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
export default function Create() {
  const { address } = useAccount();
  const router = useRouter();

  function backHandler() {
    router.back();
  }

  return (
    <div className="flex md:flex-row flex-col sm:items-start sm:justify-center grid-col-2 px-6 h-screen sm:h-max lg:w-[50rem] sm:w-[50rem]">
      <Button
        onClick={backHandler}
        className={
          'w-fit bg-[#FFC65C] shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:m-8 mb-6 text-[#181818] font-semibold rounded-[12px] text-base items-center justify-center hover:bg-[#F89D47] transition hover:duration-300'
        }
      >
        <Image
          src={back}
          priority={true}
          alt="backIcon"
          className="w-fit h-fit"
        />
        Back
      </Button>
      <div className="col-span-1 w-full border-2 rounded-[10px] p-6 bg-white h-max flex flex-col items-start justify-start shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <p className="flex flex-row mt-2 font-semibold sm:text-3xl text-xl items-center gap-2">
          Tell Us About Your New Furry
          <Image
            src={star}
            priority={true}
            alt="stars"
            className="sm:w-12 sm:h-12 w-8 h-8"
          />
        </p>
        <p className="mt-2 font-medium sm:text-xl sm:text-lg text-base text-[#484848]">
          to create your pet&apos;s digital identity
        </p>
        <ProfileForm addr={address} />
      </div>
    </div>
  );
}
