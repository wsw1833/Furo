'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import kg from '@images/weight.png';
import condition from '@images/animal-welfare.png';
import user from '@images/profile.png';
import scroll from '@images/scroll.png';
import checkup from '@images/checkup.png';
import surgery from '@images/pet-surgery.png';
import vaccine from '@images/syringe.png';
import groom from '@images/pet-bath.png';
import deworm from '@images/deworm.png';
import defaultIcon from '@images/pet-health.png';
import Link from 'next/link';
import { dateFormat, formatAddress } from '@/lib/utils';

const activityIcons = {
  CheckUps: checkup,
  Surgery: surgery,
  Vaccination: vaccine,
  Grooming: groom,
  Deworming: deworm,
};

const getActivityIcon = (activityType) => {
  return activityIcons[activityType] || defaultIcon;
};
export default function Activity({ records, display }) {
  const [isMobile, setIsMobile] = useState(false);

  // Function to determine and update screen size
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkScreenSize = () => {
        if (window.innerWidth < 1024) {
          setIsMobile(4);
        } else if (window.innerWidth < 1280) {
          setIsMobile(3);
        } else if (window.innerWidth < 1376) {
          setIsMobile(5);
        } else {
          setIsMobile(7);
        }
      };

      checkScreenSize();

      window.addEventListener('resize', checkScreenSize);

      return () => window.removeEventListener('resize', checkScreenSize);
    }
  }, []);

  // Handle case where items is not an array
  if (!Array.isArray(records)) {
    console.error('Expected items to be an array, but got:', records);
    return (
      <div className="w-full h-full items-center justify-center">
        No Activities Recently
      </div>
    );
  }

  let limitedItems = [];

  if (display) {
    limitedItems = records;
  } else {
    limitedItems = records.slice(0, isMobile);
  }

  return (
    <div
      className={`${
        display ? 'h-full items-center' : 'h-max'
      } container flex flex-col w-full`}
    >
      {limitedItems.map((record) => (
        <div
          key={record._id}
          className={`w-full h-max flex justify-between ${
            display
              ? 'md:flex-row flex-col p-4 xl:w-[55rem] w-full'
              : 'xl:flex-row lg:flex-col md:flex-row l px-4 py-1'
          } items-center mt-2 my-3 xl:gap-none gap-2 shadow-[0_3px_10px_rgb(0,0,0,0.1)] rounded-[16px]`}
        >
          <Image
            src={getActivityIcon(record.petActivity)}
            alt="activities"
            className={`${
              display ? 'md:w-10 md:h-10 w-8 h-8' : 'sm:w-6 sm:h-6 w-8 h-8'
            }`}
          />
          <div
            className={`flex flex-col w-max h-max mx-4 md:items-start ${
              display ? 'items-center' : 'items-start'
            }
          `}
          >
            <p className="w-max font-medium xl:text-lg sm:text-base ">
              {`Pet ` + record.petActivity}
            </p>
            <p className="w-max font-light xl:text-sm md:text-base text-sm">
              {record.petLocation}
            </p>
          </div>
          <p
            className={`font-medium w-[10rem] sm:text-base text-sm flex ${
              display ? 'justify-center' : 'justify-center'
            } `}
          >
            {dateFormat(record.createdAt)}
          </p>
          {display && (
            <div className=" flex flex-col h-[6rem]">
              <div className="w-full h-full flex flex-row sm:justify-between justify-around items-center">
                <div className="flex flex-row sm:gap-2 items-center justify-center">
                  <Image
                    src={kg}
                    alt="weight"
                    className="sm:w-6 sm:h-6 w-5 h-5"
                  />
                  <p className="w-max font-medium sm:text-base text-sm">
                    Weight: {record.petWeight}kg
                  </p>
                </div>
                <div className="flex flex-row sm:gap-2 items-center justify-center">
                  <Image
                    src={condition}
                    alt="condition"
                    className="sm:w-6 sm:h-6 w-5 h-5"
                  />
                  <p className="w-max font-medium sm:text-base text-sm">
                    Condition: {record.petCondition}
                  </p>
                </div>
              </div>
              <div className="w-full h-full flex flex-row sm:justify-between justify-around items-center sm:gap-10 gap-4">
                <div className="flex flex-row sm:gap-2 items-center justify-center">
                  <Image
                    src={user}
                    alt="profile"
                    className="sm:w-6 sm:h-6 w-5 h-5"
                  />
                  <p className="w-max font-medium sm:text-sm text-xs">
                    User: {formatAddress(record.walletAddress)}
                  </p>
                </div>
                <div className="flex flex-row sm:gap-2 gap-1 items-center justify-center">
                  <Link
                    href={`https://sepolia.scrollscan.com/tx/${record.txHash}`}
                    target="_blank"
                    className="w-max font-light sm:text-sm text-xs underline text-[#2B87FF]"
                  >
                    View on ScrollScan
                  </Link>
                  <Image
                    src={scroll}
                    alt="scroll"
                    className="sm:w-6 sm:h-6 w-5 h-5"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
