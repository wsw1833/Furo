import React from 'react';
import love from '@images/love.png';
import Image from 'next/image';
import { Button } from './ui/button';

export default function header() {
  return (
    <div className="w-max h-screen flex flex-col items-start justify-between ml-6">
      <div className="line-clamp-2 font-semibold md:text-3xl w-[18rem] items-end">
        Your Pet's Health, Always in Care
        <Image src={love} alt="love" className="w-8 h-8 ml-3 inline-block" />
      </div>
    </div>
  );
}
