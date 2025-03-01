'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import back from '@images/back.png';
import star from '@images/stars.png';
import Image from 'next/image';
import ProfileForm from '@/components/profileForm';

export default function create() {
  return (
    <div className="grid grid-cols-4 items-start justify-items-end h-max w-full'">
      <Button
        className={
          'w-fit bg-[#FFC65C] shadow-[0_3px_10px_rgb(0,0,0,0.2)] m-8 text-[#181818] font-medium rounded-[12px] text-base items-center justify-center hover:bg-[#F89D47] transition hover:duration-300'
        }
      >
        <Image src={back} alt="backIcon" className="w-fit h-fit" />
        Back
      </Button>
      <div className="col-span-2 w-full border-2 rounded-[10px] p-6 bg-white h-screen flex flex-col items-start justify-start shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <p className="flex flex-row mt-2 font-semibold lg:text-3xl items-center gap-4">
          Tell Us About Your New Furry
          <Image src={star} alt="stars" className="lg:w-12 lg:h-12" />
        </p>
        <p className="mt-2 font-medium lg:text-xl text-[#484848]">
          to create your pet's digital identity
        </p>
        <ProfileForm />
      </div>
    </div>
  );
}
