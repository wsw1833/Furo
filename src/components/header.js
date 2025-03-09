import React from 'react';
import icon from '@images/icon.png';
import metamask from '@images/metamask.png';
import explorer from '@images/explorer.png';
import Image from 'next/image';
import { Button } from './ui/button';
import hamburger from '@images/hamburger.png';

export default function Header({ addr, QR }) {
  return (
    <div className="w-full flex items-center justify-between p-6">
      <div className="flex flex-row items-center justify-center gap-2">
        <Image src={icon} alt="icon" className="w-14 h-14" />
        <p className="font-semibold md:text-3xl text-2xl md:block hidden">
          Furo
        </p>
      </div>
      <div className="w-max md:flex flex-row gap-4">
        <Button
          className={`${
            QR ? 'hidden' : 'lg:flex hidden'
          } w-14 h-14 bg-[#E9E6DD] shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-[#181818] font-medium rounded-[20px] text-lg items-center justify-center hover:bg-[#FFC65C] transition hover:duration-300 `}
        >
          <Image src={explorer} alt="explorer" className="w-fit h-fit" />
        </Button>
        <Button
          className={`
            w-fit h-14 bg-[#E9E6DD] shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-[#181818] font-medium rounded-[20px] md:text-lg text-base items-center justify-center hover:bg-[#FFC65C] transition hover:duration-300 ${
              QR ? 'flex' : 'lg:flex hidden'
            }`}
        >
          <Image src={metamask} alt="metamask" className="w-fit h-fit" />
          {addr}
        </Button>
        <Button
          className={`
            w-full h-14 bg-[#FFFFFD] shadow-none rounded-[20px] ${
              QR ? 'hidden' : 'lg:hidden sm:flex'
            }`}
        >
          <Image src={hamburger} alt="metamask" className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}
