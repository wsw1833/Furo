'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import kg from '@images/weight.png';
import condition from '@images/animal-welfare.png';
import user from '@images/profile.png';
import scroll from '@images/scroll.png';
import Link from 'next/link';

export default function activity({ items, display }) {
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

      // Clean up
      return () => window.removeEventListener('resize', checkScreenSize);
    }
  }, []);

  // Handle case where items is not an array
  if (!Array.isArray(items)) {
    console.error('Expected items to be an array, but got:', items);
    return (
      <div className="w-full h-full items-center justify-center">
        No Activities Recently
      </div>
    );
  }

  let limitedItems = [];

  if (display) {
    limitedItems = items;
  } else {
    limitedItems = items.slice(0, isMobile);
  }

  return (
    <div className="container flex flex-col w-full h-max">
      {limitedItems.map((item, index) => (
        <div
          key={index}
          className={`w-full h-full flex xl:flex-row xl:justify-between lg:flex-col flex-row lg:justify-center items-center justify-between mt-2 xl:py-1 py-4 xl:px-4 px-6 my-3 xl:gap-none gap-2 shadow-[0_3px_10px_rgb(0,0,0,0.1)] rounded-[16px]`}
        >
          <Image
            src={item.img}
            alt="activities"
            className="lg:w-8 lg:h-8 w-10 h-10"
          />
          <div className="flex flex-col w-max h-max mx-4 xl:items-start lg:items-center items-start">
            <p className="w-max font-medium xl:text-lg lg:text-base">
              {item.act}
            </p>
            <p className="w-max font-light xl:text-sm md:text-xs text-base">
              {item.loc}
            </p>
          </div>
          <p className="font-medium w-[16rem] text-base flex justify-center">
            {item.date}
          </p>
          {display && (
            <div className="w-max flex flex-col h-[6rem] ml-2">
              <div className="w-full h-full flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={kg} alt="weight" className="w-6 h-6" />
                  <p className="w-max font-medium text-base">
                    Weight: {item.weight}kg
                  </p>
                </div>
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={condition} alt="condition" className="w-6 h-6" />
                  <p className="w-max font-medium text-base">
                    Condition: {item.condition}
                  </p>
                </div>
              </div>
              <div className="w-max h-full flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src={user} alt="profile" className="w-6 h-6" />
                  <p className="w-max font-medium text-sm">
                    Performed by: {item.user}
                  </p>
                </div>
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Link
                    href={item.url}
                    target="_blank"
                    className="w-max font-light text-sm underline text-[#2B87FF]"
                  >
                    View on ScrollScan
                  </Link>
                  <Image src={scroll} alt="scroll" className="w-6 h-6" />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
