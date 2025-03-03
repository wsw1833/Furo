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
    <div className="w-full container flex flex-col h-full">
      {limitedItems.map((item, index) => (
        <div
          key={index}
          className={`w-full flex flex-row items-center justify-between px-4 py-1 my-2 shadow-[0_3px_10px_rgb(0,0,0,0.1)] rounded-[16px]`}
        >
          <span className="w-2 h-2 rounded-full bg-[#FFC65C]"></span>
          <Image
            src={item.img}
            alt="activities"
            className="md:w-8 md:h-8 w-6 h-6"
          />
          <div className="flex flex-col h-max">
            <p className="w-max font-medium md:text-lg">{item.act}</p>
            <p className="w-max font-light md:text-sm">{item.loc}</p>
          </div>
          <span> </span>
          <span> </span>
          <span> </span>
          <span> </span>
          <div className="flex flex-col h-max justify-end items-end">
            <p className="font-light w-max md:text-sm text-xs">Upcoming</p>
            <p className="font-medium w-max">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
