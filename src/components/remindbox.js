import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function remindBox({ items }) {
  // Handle case where items is not an array
  if (!Array.isArray(items)) {
    console.error('Expected items to be an array, but got:', items);
    return (
      <div className="w-full h-full items-center justify-center">
        No Reminder Recently
      </div>
    );
  }

  const limitedItems = items.slice(0, 3);

  return (
    <div className="w-full container flex flex-col h-full xl:mb-0 lg:mb-10">
      {limitedItems.map((item, index) => (
        <div
          key={index}
          className={`w-full flex flex-row xl:items-center xl:justify-between lg:justify-start lg:items-center justify-between items-center px-4 py-1 my-2 shadow-[0_3px_10px_rgb(0,0,0,0.1)] rounded-[16px]`}
        >
          <span className="w-2 h-2 rounded-full bg-[#FFC65C]"></span>
          <Image
            src={item.img}
            alt="activities"
            className="lg:w-8 lg:h-8 w-10 h-10"
          />
          <div className="flex flex-col h-max xl:items-start lg:items-start items-start">
            <p className="w-max font-medium xl:text-lg lg:text-base">
              {item.act}
            </p>
            <p className="w-max font-light xl:text-sm md:text-xs text-base">
              {item.loc}
            </p>
          </div>
          <span> </span>
          <span> </span>
          <span> </span>
          <span> </span>
          <div className="flex flex-col h-max justify-end items-end">
            <p className="w-max font-light xl:text-sm md:text-xs text-sm">
              Upcoming
            </p>
            <p className="font-medium w-max text-base">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
