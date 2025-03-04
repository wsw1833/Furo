'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import back from '@images/back.png';
import star from '@images/stars.png';
import Image from 'next/image';
import ProfileForm from '@/components/profileForm';
import { useRouter } from 'next/navigation';

export default function Create() {
  const router = useRouter();

  function backHandler() {
    router.back();
  }

  return (
    <div className="grid sm:grid-cols-3 sm:items-start sm:justify-items-end grid-col-2 px-6 h-screen w-full">
      <Button
        onClick={backHandler}
        className={
          'w-fit bg-[#FFC65C] shadow-[0_3px_10px_rgb(0,0,0,0.2)] sm:m-8 sm:mr-36 mb-6 text-[#181818] font-semibold rounded-[12px] text-base items-center justify-center hover:bg-[#F89D47] transition hover:duration-300'
        }
      >
        <Image src={back} alt="backIcon" className="w-fit h-fit" />
        Back
      </Button>
      <div className="col-span-1 md:w-max border-2 rounded-[10px] p-6 bg-white h-max flex flex-col items-start justify-start shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <p className="flex flex-row mt-2 font-semibold lg:text-3xl text-xl items-center gap-2">
          Tell Us About Your New Furry
          <Image src={star} alt="stars" className="lg:w-12 lg:h-12 w-8 h-8" />
        </p>
        <p className="mt-2 font-medium lg:text-xl sm:text-lg text-base text-[#484848]">
          to create your pet&apos; digital identity
        </p>
        <ProfileForm />
      </div>
    </div>
  );
}
