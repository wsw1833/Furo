import React from 'react';
import petHealth from '@images/pet-health.png';
import notify from '@images/notify-yellow.png';
import addButton from '@images/add-button.png';
import Image from 'next/image';

export default function PageTitle({ page }) {
  if (page === 'record') {
    return (
      <div className="flex flex-row w-full h-max items-center justify-center mt-6 gap-2">
        <Image
          src={petHealth}
          alt="clock"
          className="md:w-12 md:h-12 w-10 h-10"
        />
        <p className="font-semibold xl:text-3xl text-2xl">
          Most Recent Activity
        </p>
      </div>
    );
  }

  if (page === 'reminder') {
    return (
      <div className="flex flex-row w-full h-max items-center justify-center mt-6 gap-2">
        <Image
          src={notify}
          alt="notification"
          className="md:w-12 md:h-12 w-10 h-10"
        />
        <p className="font-semibold xl:text-3xl text-2xl">Set Your Reminder</p>
      </div>
    );
  }
  if (page === 'addRecord') {
    return (
      <div className="flex flex-row w-full h-max items-center justify-center">
        <Image
          src={addButton}
          alt="addButton"
          className="md:w-14 md:h-14 w-12 h-12"
        />
        <p className="font-semibold xl:text-3xl text-2xl">Add Record</p>
      </div>
    );
  }
}
