import React, { useState } from 'react';
import furo from '@images/furo.png';
import metamask from '@images/metamask.png';
import explorer from '@images/explorer.png';
import Image from 'next/image';
import { Button } from './ui/button';
import hamburger from '@images/hamburger.png';
import Link from 'next/link';
import { petRecordSystem } from '@/lib/constant';
import home from '@images/house.png';
import record from '@images/pencil.png';
import notify from '@images/notify.png';
import switchPet from '@images/cat.png';
import logout from '@images/logout.png';
import member from '@images/profile.png';
import { useParams } from 'next/navigation';
import { useDisconnect } from 'wagmi';

export default function Header({ addr, QR }) {
  const params = useParams();
  const petID = params.petID;
  const { disconnect } = useDisconnect();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    {
      name: 'Switch Pet',
      path: `/profile`,
      icon: switchPet,
      alt: 'switchPet',
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigateTo = (path) => {
    setIsSidebarOpen(false);
  };

  const signOutHandler = () => {
    localStorage.removeItem('selectedPetId');
    localStorage.removeItem('tokenId');
    disconnect();
    router.push('/');
  };

  return (
    <>
      <div className="w-full flex items-center justify-between p-6">
        <div className="flex flex-row items-center justify-center gap-2">
          <Image src={furo} priority={true} alt="icon" className="w-14 h-14" />
          <p className="font-semibold md:text-3xl text-2xl md:block hidden">
            Furo
          </p>
        </div>
        <div className="w-max md:flex flex-row gap-4">
          <Link
            target="_blank"
            href={`https://sepolia.scrollscan.com/address/${petRecordSystem}`}
          >
            <div
              className={`${
                QR ? 'hidden' : 'lg:flex hidden'
              } w-14 h-14 bg-[#E9E6DD] shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-[#181818] font-medium rounded-[20px] text-lg items-center justify-center hover:bg-[#FFC65C] transition hover:duration-300 `}
            >
              <Image
                src={explorer}
                priority={true}
                alt="explorer"
                className="w-fit h-fit"
              />
            </div>
          </Link>

          <Button
            className={`
            w-fit h-14 bg-[#E9E6DD] shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-[#181818] font-medium rounded-[20px] md:text-lg text-base items-center justify-center hover:bg-[#FFC65C] transition hover:duration-300 ${
              QR ? 'flex' : 'lg:flex hidden'
            }`}
          >
            <Image
              src={metamask}
              priority={true}
              alt="metamask"
              className="w-fit h-fit"
            />
            {addr}
          </Button>
          <Button
            onClick={toggleSidebar}
            className={`
            w-full h-14 bg-[#FFFFFD] shadow-none rounded-[20px] ${
              QR ? 'hidden' : 'lg:hidden sm:flex'
            }`}
          >
            <Image
              src={hamburger}
              priority={true}
              alt="metamask"
              className="w-8 h-8"
            />
          </Button>
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-[#FFC65C] shadow-lg z-50 transform transition-transform duration-350 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center ">
            <div className="flex items-center gap-2">
              <Image
                src={furo}
                priority={true}
                alt="icon"
                className="w-12 h-12"
              />
              <p className="font-semibold text-2xl">Furo</p>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Image
                src={hamburger}
                priority={true}
                alt="metamask"
                className="w-8 h-8"
              />
            </button>
          </div>

          <nav className="space-y-4 mt-10">
            <span className="font-semibold text-lg">Menu</span>

            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                onClick={() => navigateTo(item.path)}
              >
                <div className="px-4 py-3 rounded-[15px] w-full active:bg-[#E9E6DD] transition font-medium flex items-center gap-2">
                  <Image
                    src={item.icon}
                    priority={true}
                    alt={item.alt}
                    className="w-6 h-6"
                  />
                  {item.name}
                </div>
              </Link>
            ))}
            <div
              onClick={signOutHandler}
              className={
                'w-full px-4 py-3 gap-2 flex flex-row items-center justify-start rounded-[20px] shadow-none active:bg-[#E9E6DD] font-medium'
              }
            >
              <Image
                src={logout}
                priority={true}
                alt="logout"
                className="w-6 h-6"
              />
              Sign Out
            </div>
          </nav>

          <div className="w-full flex flex-row items-center justify-between mt-10">
            <Link
              target="_blank"
              href={`https://sepolia.scrollscan.com/address/${petRecordSystem}`}
              onClick={() =>
                navigateTo(
                  `https://sepolia.scrollscan.com/address/${petRecordSystem}`
                )
              }
            >
              <div className="p-4 rounded-[16px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-[#E9E6DD] font-medium flex items-center gap-2">
                <Image
                  src={explorer}
                  priority={true}
                  alt="explorer"
                  className="w-6 h-6"
                />
              </div>
            </Link>

            {/* Metamask button in mobile sidebar */}
            <Button className="w-fit p-6 bg-[#E9E6DD] shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-[#181818] font-medium rounded-[16px] text-base items-center justify-center hover:bg-[#FFC65C] transition hover:duration-300 flex">
              <Image
                src={metamask}
                priority={true}
                alt="metamask"
                className="w-fit h-fit mr-2"
              />
              {addr || 'Connect Wallet'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
