import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { dateFormat } from '@/lib/utils';
import checkup from '@images/checkup.png';
import surgery from '@images/pet-surgery.png';
import vaccine from '@images/syringe.png';
import groom from '@images/pet-bath.png';
import deworm from '@images/deworm.png';
import defaultIcon from '@images/pet-health.png';

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

export default function RemindBox({ reminders, display }) {
  // Handle case where items is not an array
  if (!Array.isArray(reminders)) {
    console.error('Expected items to be an array, but got:', reminders);
    return (
      <div className="w-full h-full items-center justify-center">
        No Reminder Recently
      </div>
    );
  }

  let limitedItems = [];

  if (display) {
    limitedItems = reminders;
  } else {
    limitedItems = reminders.slice(0, 2);
  }

  return (
    <div
      className={`${
        display
          ? 'grid sm:grid-cols-3 grid-cols-2 col-span-1 md:gap-10 gap-6 md:mx-0 sm:mx-2'
          : 'flex-col xl:mb-0 md:px-6'
      } md:w-full flex container h-max `}
    >
      {limitedItems.map((reminder) => (
        <div
          key={reminder._id}
          className={`${
            display ? 'flex flex-col sm:p-10 md:p-12 p-6' : 'flex-row px-4 p-2'
          } w-full flex xl:items-center xl:justify-between lg:justify-between lg:items-center justify-between items-center my-4 shadow-[0_3px_10px_rgb(0,0,0,0.1)] rounded-[16px]`}
        >
          <span
            className={`${
              display ? 'mb-4' : ''
            } w-2 h-2 rounded-full bg-[#FFC65C] items-end`}
          ></span>
          <Image
            src={getActivityIcon(reminder.petActivity)}
            width={500}
            height={500}
            alt="activities"
            className={`${display ? 'mb-4' : ''} md:w-10 md:h-10 w-8 h-8`}
          />
          <div
            className={`${
              display ? 'sm:items-center mb-3' : 'lg:items-start'
            } flex flex-col h-max items-start`}
          >
            <p className="w-max font-medium xl:text-lg lg:text-base">
              {reminder.petActivity}
            </p>
            <p className="w-max font-light xl:text-sm md:text-xs text-base">
              {reminder.petLocation}
            </p>
          </div>
          <span> </span>
          <span> </span>
          <span> </span>
          <span> </span>
          <div
            className={`flex flex-col w-max h-max justify-center items-center`}
          >
            <p className="w-max font-light xl:text-sm md:text-xs text-sm">
              Upcoming
            </p>
            <p className="font-medium w-max text-base">
              {dateFormat(reminder.appointmentDate)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
