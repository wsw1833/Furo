import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function RemindBox({ items, display }) {
  // Handle case where items is not an array
  if (!Array.isArray(items)) {
    console.error('Expected items to be an array, but got:', items);
    return (
      <div className="w-full h-full items-center justify-center">
        No Reminder Recently
      </div>
    );
  }

  let limitedItems = [];

  if (display) {
    limitedItems = items;
  } else {
    limitedItems = items.slice(0, 3);
  }

  return (
    <div
      className={`${
        display
          ? 'grid md:grid-cols-3 grid-cols-2 col-span-1 gap-4'
          : 'flex-col'
      } w-full flex container h-full xl:mb-0 lg:mb-10`}
    >
      {limitedItems.map((item, index) => (
        <div
          key={index}
          className={`${
            display ? 'flex flex-col py-4' : 'flex-row '
          } w-full flex xl:items-center xl:justify-between lg:justify-between lg:items-center justify-between items-center px-4 py-1 my-2 shadow-[0_3px_10px_rgb(0,0,0,0.1)] rounded-[16px]`}
        >
          <span
            className={`${
              display ? 'mb-4' : ''
            } w-2 h-2 rounded-full bg-[#FFC65C] items-end`}
          ></span>
          <Image
            src={item.img}
            alt="activities"
            className={`${display ? 'mb-4' : ''} lg:w-8 lg:h-8 w-10 h-10`}
          />
          <div
            className={`${
              display ? 'sm:items-center mb-3' : 'lg:items-start'
            } flex flex-col h-max items-start`}
          >
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
          <div className={`flex flex-col w-max h-max justify-end items-end`}>
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
