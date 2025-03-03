'use client';
import ActivityPage from '@/components/activity';
import QRBox from '@/components/qrbox';
import RemindBox from '@/components/remindbox';
import CarouselBox from '@/components/carouselbox';
import Petpaw from '@images/pet-footprint.png';
import cake from '@images/birthday.png';
import dog from '@images/dog.png';
import clock from '@images/clock.png';
import notify from '@images/notify-yellow.png';
import petHealth from '@images/deworm.png';
import Image from 'next/image';

const items = [
  {
    img: petHealth,
    act: 'pet health',
    loc: 'sea park animal polyclinic',
    date: '2 mar 2025',
  },
  {
    img: petHealth,
    act: 'pet health',
    loc: 'sea park animal polyclinic',
    date: '2 mar 2025',
  },
  {
    img: petHealth,
    act: 'pet health',
    loc: 'sea park animal polyclinic',
    date: '2 mar 2025',
  },
  {
    img: petHealth,
    act: 'pet health',
    loc: 'sea park animal polyclinic',
    date: '2 mar 2025',
  },
  {
    img: petHealth,
    act: 'pet health',
    loc: 'sea park animal polyclinic',
    date: '2 mar 2025',
  },
  {
    img: petHealth,
    act: 'pet health',
    loc: 'sea park animal polyclinic',
    date: '2 mar 2025',
  },
  {
    img: petHealth,
    act: 'pet health',
    loc: 'sea park animal polyclinic',
    date: '2 mar 2025',
  },
  {
    img: petHealth,
    act: 'pet health',
    loc: 'sea park animal polyclinic',
    date: '2 mar 2025',
  },
  {
    img: petHealth,
    act: 'pet health',
    loc: 'sea park animal polyclinic',
    date: '2 mar 2025',
  },
];

export default function dashboard() {
  return (
    <div className="container w-full h-full">
      <div className="m-4 grid md:grid-cols-9 md:grid-rows-2 grid-cols-2 grid-rows-10 h-full gap-2">
        <div className="md:col-span-3 md:row-span-2 col-span-2 row-span-2 bg-[#FFFFFD] mb-8 w-full rounded-[24px] p-4">
          <div className="flex flex-row items-center justify-start gap-2 mb-2">
            <Image src={clock} alt="clock" className="md:w-8 md:h-8 w-6 h-6" />
            <p className="font-semibold md:text-2xl text-xl">
              Most Recent Activity
            </p>
          </div>
          <ActivityPage items={items} />
        </div>
        {/* pet profile */}
        <div className="md:col-span-3 md:row-span-1 col-span-2 row-span-2 flex flex-col w-full h-full items-center bg-[#FFFBEF] rounded-[24px]">
          <div className="flex flex-row w-full items-center justify-start gap-2 p-4">
            <Image
              src={Petpaw}
              alt="petPaw"
              className="md:w-8 md:h-8 w-6 h-6"
            />
            <p className="font-semibold md:text-2xl text-xl">Profile</p>
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
        <div className="md:col-span-3 md:row-span-1 col-span-2 row-span-2 bg-[#FFFFFD] rounded-[24px] p-4">
          <QRBox />
        </div>
        <div className="md:col-span-4 md:row-span-1 col-span-2 row-span-2 bg-[#FFFFFD] mb-8 rounded-[24px] p-4">
          <div className="flex flex-row items-center justify-start gap-2 mb-2">
            <Image
              src={notify}
              alt="notification"
              className="md:w-8 md:h-8 w-6 h-6"
            />
            <p className="font-semibold md:text-2xl text-xl">Reminder</p>
          </div>
          <RemindBox items={items} />
        </div>
        <div className="md:col-span-2 md:row-span-1 col-span-2 row-span-2 bg-[#FFFFFD] mb-8 rounded-[24px] p-4">
          <CarouselBox />
        </div>
      </div>
    </div>
  );
}
