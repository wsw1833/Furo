'use client';

import Image from 'next/image';
import addIcon from '@images/add-button.png';
import petpaw from '@images/pet-paw.png';
import { Button } from '@/components/ui/button';

export default function profile() {
  function addProfileHandler() {
    console.log('hello');
  }
  return (
    <div className="flex flex-col sm:items-center sm:justify-center h-screen w-full">
      <div className="flex flex-col sm:items-center sm:px-0 px-6 justify-center items-start font-inter">
        <div className="flex flex-row items-center">
          <p className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            Furry Profile
          </p>
          <Image
            src={addIcon}
            alt="addIcon"
            className="w-12 h-12 sm:hidden"
            onClick={addProfileHandler}
          ></Image>
        </div>
        <div className="flex flex-row items-center justify-center gap-2 text-[16px] lg:text-lg mt-4">
          Select Your Furry
          <Image
            src={petpaw}
            alt="petpaw"
            className="w-4 h-4 md:w-6 md:h-6"
          ></Image>
        </div>
        <Button className="bg-[#FFC65C] shadow-[0_3px_10px_rgb(0,0,0,0.2)] my-6 md:w-fit px-6 h-auto py-2 text-[#181818] font-medium rounded-[12px] text-base md:text-lg lg:text-xl gap-2 items-center justify-center hover:bg-[#F89D47] transition hover:duration-300 sm:flex hidden">
          Adopt New Furry
          <Image
            src={addIcon}
            alt="addIcon"
            className="w-8 h-8 md:w-10 md:h-10"
          ></Image>
        </Button>
      </div>
      <div className="lg:w-[70%] w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 place-items-center overflow-y-auto">
        <div className="col-span-1 md:w-40 lg:w-46 w-38 h-60 my-6 border-4 rounded-[20px] flex justify-center items-center">
          hihi
        </div>
        <div className="col-span-1 md:w-40 lg:w-46 w-38 h-60 my-6 border-4 rounded-[20px] flex justify-center items-center">
          hihi
        </div>
        <div className="col-span-1 md:w-40 lg:w-46 w-38 h-60 my-6 border-4 rounded-[20px] flex justify-center items-center">
          hihi
        </div>
        <div className="col-span-1 md:w-40 lg:w-46 w-38 h-60 my-6 border-4 rounded-[20px] flex justify-center items-center">
          hihi
        </div>
        <div className="col-span-1 md:w-40 lg:w-46 w-38 h-60 my-6 border-4 rounded-[20px] flex justify-center items-center">
          hihi
        </div>
      </div>
    </div>
  );
}
