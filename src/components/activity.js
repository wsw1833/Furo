'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function activity({ items }) {
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

  const limitedItems = items.slice(0, isMobile);

  return (
    <div className="container flex flex-col w-full h-max">
      {limitedItems.map((item, index) => (
        <div
          key={index}
          className={`w-full h-full flex xl:flex-row xl:justify-between lg:flex-col lg:justify-center flex-row items-center justify-between mt-2 xl:py-1 py-4 xl:px-4 px-6 my-3 xl:gap-none gap-2 shadow-[0_3px_10px_rgb(0,0,0,0.1)] rounded-[16px]`}
        >
          <Image
            src={item.img}
            alt="activities"
            className="lg:w-8 lg:h-8 w-10 h-10"
          />
          <div className="flex flex-col h-max xl:items-start lg:items-center items-start">
            <p className="w-max font-medium xl:text-lg lg:text-base">
              {item.act}
            </p>
            <p className="w-max font-light xl:text-sm md:text-xs text-base">
              {item.loc}
            </p>
          </div>
          <p className="font-medium w-max text-base flex justify-end">
            {item.date}
          </p>
        </div>
      ))}
    </div>
  );
}
