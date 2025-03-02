'use client';
import ActivityPage from '@/components/activity';
import QRBox from '@/components/qrbox';
import RemindBox from '@/components/remindbox';
import Carousel from '@/components/carousel';
import Petpaw from '@images/pet-footprint.png';
import cake from '@images/birthday.png';
import dog from '@images/dog.png';
import Image from 'next/image';

export default function dashboard() {
  return (
    <div className="container w-full h-full">
      <div className="m-4 grid sm:grid-cols-9 sm:grid-rows-2 grid-cols-2 grid-rows-10 h-full gap-2">
        <div className="sm:col-span-3 sm:row-span-2 col-span-2 row-span-2 bg-[#FFFFFD] mb-8 w-full rounded-[24px] p-6">
          <ActivityPage />
        </div>
        {/* pet profile */}
        <div className="sm:col-span-3 sm:row-span-1 col-span-2 row-span-2 flex flex-col w-full h-full items-center bg-[#FFFBEF] rounded-[24px]">
          <div className="flex flex-row w-full items-center justify-start gap-2 p-4">
            <Image src={Petpaw} alt="petPaw" className="w-10 h-10" />
            <p className="font-semibold md:text-2xl">Profile</p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Image
              src={dog}
              alt="petImage"
              className="lg:w-60 lg:h-60 md:w-50 md:h-50 w-36 h-36 mb-12 md:fixed"
            />
            <div className="z-1 w-full md:mt-30 h-max relative bg-white/10 backdrop-blur-sm rounded-[30px]">
              <div className="flex flex-col justify-between p-4 row w-full h-full">
                <div className="flex flex-row justify-between">
                  <p className="font-semibold md:text-xl text-lg ">Angel</p>
                  <p className="w-fit px-6 border-2 rounded-[20px] border-[#FFC65C] md:text-base text-sm">
                    Dog
                  </p>
                </div>
                <p className="font-light mt-1 md:text-base text-sm">
                  Pomeranian
                </p>
                <div className="flex flex-row items-center justify-start mt-2 gap-2">
                  <Image src={cake} alt="birthday" className="w-6 h-6" />
                  <p className="md:text-lg text-base">1 Jan 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:col-span-3 sm:row-span-1 col-span-2 row-span-2 bg-[#FFFFFD] rounded-[24px] p-6">
          <QRBox />
        </div>
        <div className="sm:col-span-4 sm:row-span-1 col-span-2 row-span-2 bg-[#FFFFFD] mb-8 rounded-[24px] p-6">
          <RemindBox />
        </div>
        <div className="sm:col-span-2 sm:row-span-1 col-span-2 row-span-2 bg-[#FFFFFD] mb-8 rounded-[24px] p-6">
          <Carousel />
        </div>
      </div>
    </div>
  );
}
