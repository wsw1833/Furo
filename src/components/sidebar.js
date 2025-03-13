'use client';
import React, { use, useState } from 'react';
import love from '@images/love.png';
import home from '@images/house.png';
import record from '@images/pencil.png';
import notify from '@images/notify.png';
import switchPet from '@images/cat.png';
import logout from '@images/logout.png';
import Image from 'next/image';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';
import member from '@images/profile.png';
import { useDisconnect } from 'wagmi';
import { usePathname, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Sidebar() {
  const pathname = usePathname(); // Or router.pathname if using Pages Router
  const params = useParams();
  const { disconnect } = useDisconnect();
  const petID = params.petID;
  const router = useRouter();
  const navItems = [
    {
      name: 'Homepage',
      path: `/dashboard/${petID}`,
      icon: home,
      alt: 'house',
    },
    {
      name: 'Record',
      path: `/dashboard/${petID}/record`,
      icon: record,
      alt: 'record',
    },
    {
      name: 'Reminder',
      path: `/dashboard/${petID}/reminder`,
      icon: notify,
      alt: 'notification',
    },
    {
      name: 'Member',
      path: `/dashboard/${petID}/member`,
      icon: member,
      alt: 'member',
    },
  ];

  const isActive = (path) => {
    if (path === `/dashboard/${petID}`) {
      return pathname === path;
    }
    return pathname.includes(path);
  };

  const switchPetHandler = () => {
    router.push('/profile');
  };

  const signOutHandler = () => {
    localStorage.removeItem('selectedPetId');
    localStorage.removeItem('tokenId');
    disconnect();
    router.push('/');
  };

  return (
    <div className="w-max h-screen flex flex-col items-start justify-start ml-6 lg:flex hidden">
      <div className="line-clamp-2 font-semibold md:text-3xl w-[18rem] items-end">
        Your Pet&apos;s Health, Always in Care
        <Image src={love} alt="love" className="w-8 h-8 ml-3 inline-block" />
      </div>
      <div className="flex flex-row mt-8 font-medium md:text-xl items-center justify-between w-[90%]">
        <p>Menu</p>
        <ChevronDown />
      </div>
      {navItems.map((item) => (
        <Link
          href={item.path}
          key={item.name}
          className="w-full flex justify-start"
        >
          <Button
            className={`
              w-[90%] p-4 mt-${item.name === 'Homepage' ? '4' : '2'} 
              flex flex-row items-center justify-start 
              rounded-[20px] shadow-none 
              hover:bg-[#FFC65C]
              ${isActive(item.path) ? 'bg-[#F89D47]' : 'bg-[#FFFFFD]'} 
              text-[#181818] 
              transition hover:duration-300 
              font-medium sm:text-xl text-lg
            `}
          >
            <Image
              src={item.icon}
              priority={true}
              alt={item.alt}
              className="w-6 h-6"
            />
            {item.name}
          </Button>
        </Link>
      ))}
      <Button
        onClick={switchPetHandler}
        className={
          'w-[90%] p-4 mt-2 flex flex-row items-center justify-start rounded-[20px] shadow-none hover:bg-[#FFC65C] bg-[#FFFFFD] text-[#181818] active:bg-[#F89D47] transition hover:duration-300 font-medium sm:text-xl text-lg'
        }
      >
        <Image
          src={switchPet}
          priority={true}
          alt="switchpet"
          className="w-6 h-6"
        />
        Switch Pet
      </Button>
      <Button
        onClick={signOutHandler}
        className={
          'w-[90%] p-4 mt-2 flex flex-row items-center justify-start rounded-[20px] shadow-none hover:bg-[#FFC65C] bg-[#FFFFFD] text-[#181818] active:bg-[#F89D47] transition hover:duration-300 font-medium sm:text-xl text-lg'
        }
      >
        <Image src={logout} priority={true} alt="logout" className="w-6 h-6" />
        Sign Out
      </Button>
    </div>
  );
}
