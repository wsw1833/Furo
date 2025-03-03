import React from 'react';
import petHealth from '@images/pet-health.png';
import Image from 'next/image';
import add from '@images/add-button.png';
import { Button } from '@/components/ui/button';
import ActivityPage from '@/components/activity';
import { items } from '../page';

export default function recordPage() {
  return (
    <div className="flex w-full h-full overflow-auto">
      <div className="m-4 flex flex-col w-full h-max gap-2 bg-[#FFFFFD] rounded-[24px]">
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
        <div className="w-full flex-row flex items-center justify-center">
          <Button
            className={
              'w-fit bg-[#FFC65C] shadow-[0_3px_10px_rgb(0,0,0,0.2)] m-4 text-[#181818] p-4 font-semibold rounded-[12px] text-lg items-center justify-center hover:bg-[#F89D47] transition hover:duration-300'
            }
          >
            <Image src={add} alt="addIcon" className="w-10 h-10" />
            Add Record
          </Button>
        </div>
        <div className="w-full lg:px-20 px-8 flex items-center justify-center overflow-auto">
          <ActivityPage items={items} display={true} />
        </div>
      </div>
    </div>
  );
}
