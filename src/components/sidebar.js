'use client';
import React, { useState } from 'react';
import love from '@images/love.png';
import home from '@images/house.png';
import record from '@images/pencil.png';
import notify from '@images/notify.png';
import switchPet from '@images/cat.png';
import logout from '@images/logout.png';
import Image from 'next/image';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

export default function sidebar() {
  return (
    <div className="w-max h-screen flex flex-col items-start justify-start ml-6">
      <div className="line-clamp-2 font-semibold md:text-3xl w-[18rem] items-end">
        Your Pet's Health, Always in Care
        <Image src={love} alt="love" className="w-8 h-8 ml-3 inline-block" />
      </div>
      <div className="flex flex-row mt-8 font-medium md:text-xl items-center justify-between w-[90%]">
        <p>Menu</p>
        <ChevronDown />
      </div>
      <Button
        className={
          'w-[90%] p-4 mt-4 flex flex-row items-center justify-start rounded-[20px] shadow-none hover:bg-[#FFC65C] bg-[#FFFFFD] text-[#181818] active:bg-[#F89D47] transition hover:duration-300 font-medium sm:text-xl text-lg'
        }
      >
        <Image src={home} alt="house" className="w-6 h-6" />
        Homepage
      </Button>
      <Button
        className={
          'w-[90%] p-4 mt-2 flex flex-row items-center justify-start rounded-[20px] shadow-none hover:bg-[#FFC65C] bg-[#FFFFFD] text-[#181818] active:bg-[#F89D47] transition hover:duration-300 font-medium sm:text-xl text-lg'
        }
      >
        <Image src={record} alt="record" className="w-6 h-6" />
        Record
      </Button>
      <Button
        className={
          'w-[90%] p-4 mt-2 flex flex-row items-center justify-start rounded-[20px] shadow-none hover:bg-[#FFC65C] bg-[#FFFFFD] text-[#181818] active:bg-[#F89D47] transition hover:duration-300 font-medium sm:text-xl text-lg'
        }
      >
        <Image src={notify} alt="notification" className="w-6 h-6" />
        Reminder
      </Button>
      <Button
        className={
          'w-[90%] p-4 mt-2 flex flex-row items-center justify-start rounded-[20px] shadow-none hover:bg-[#FFC65C] bg-[#FFFFFD] text-[#181818] active:bg-[#F89D47] transition hover:duration-300 font-medium sm:text-xl text-lg'
        }
      >
        <Image src={switchPet} alt="switchpet" className="w-6 h-6" />
        Switch Pet
      </Button>
      <Button
        className={
          'w-[90%] p-4 mt-2 flex flex-row items-center justify-start rounded-[20px] shadow-none hover:bg-[#FFC65C] bg-[#FFFFFD] text-[#181818] active:bg-[#F89D47] transition hover:duration-300 font-medium sm:text-xl text-lg'
        }
      >
        <Image src={logout} alt="logout" className="w-6 h-6" />
        Sign Out
      </Button>
    </div>
  );
}
