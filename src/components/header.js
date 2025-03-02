import React from 'react';
import icon from '@images/icon.png';
import metamask from '@images/metamask.png';
import explorer from '@images/explorer.png';
import Image from 'next/image';
import { Button } from './ui/button';

export default function header() {
  return (
    <div className="w-full flex items-center justify-between p-6">
      <div className="flex flex-row items-center justify-center gap-2">
        <Image src={icon} alt="icon" className="w-12 h-12 md:w-14 md:h-14" />
        <p className="font-semibold md:text-3xl text-2xl sm:block hidden">
          Petify
        </p>
      </div>
      <div className="w-max flex flex-row gap-4">
        <Button
          className={
            'w-14 h-14 bg-[#E9E6DD] shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-[#181818] font-medium rounded-[20px] text-lg items-center justify-center hover:bg-[#F89D47] transition hover:duration-300 sm:flex hidden'
          }
        >
          <Image src={explorer} alt="explorer" className="w-fit h-fit" />
        </Button>
        <Button
          className={
            'w-fit h-14 bg-[#E9E6DD] shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-[#181818] font-medium rounded-[20px] md:text-lg text-base items-center justify-center hover:bg-[#F89D47] transition hover:duration-300 sm:flex hidden '
          }
        >
          <Image src={metamask} alt="metamask" className="w-fit h-fit" />
          0x00...1a2bc
        </Button>
      </div>
    </div>
  );
}
