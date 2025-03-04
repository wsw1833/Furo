'use client';

import Image from 'next/image';
import addIcon from '@images/add-button.png';
import petpaw from '@images/pet-paw.png';
import dog from '@images/dog.png';
import hams from '@images/hamster.png';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { handler } from 'tailwindcss-animate';

export default function ProfilePage() {
  const router = useRouter();
  const petData = [
    {
      name: 'Angel',
      type: 'Dog',
      imgURL: dog,
      breed: 'Pomeranian',
    },
    {
      name: 'Ball',
      type: 'Hamster',
      imgURL: hams,
      breed: 'Chinese',
    },
  ];

  function addProfileHandler() {
    //create profile with minting process.
    router.push('/create');
  }
  return (
    <div className="flex flex-col sm:items-center sm:justify-center h-max w-full">
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
        <Button
          onClick={addProfileHandler}
          className="bg-[#FFC65C] shadow-[0_3px_10px_rgb(0,0,0,0.2)] my-6 md:w-fit px-4 h-auto text-[#181818] font-medium rounded-[12px] text-base md:text-lg lg:text-xl gap-2 items-center justify-center hover:bg-[#F89D47] transition hover:duration-300 sm:flex hidden"
        >
          Adopt New Furry
          <Image
            src={addIcon}
            alt="addIcon"
            className="w-8 h-8 md:w-10 md:h-10"
          ></Image>
        </Button>
      </div>
      <div className="lg:w-[70%] w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 place-items-center overflow-y-auto">
        {petData.map((pet) => (
          <div
            key={pet.name}
            className="col-span-1 md:w-40 lg:w-46 w-38 h-70 my-6 bg-white border-2 rounded-[20px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col justify-center items-center hover:bg-[#FFC65C] transition hover:duration-200"
          >
            <Image src={pet.imgURL} alt="pet" className="lg:w-40 lg:h-40" />
            <p className="sm:text-sm font-medium text-xs text-[#484848] pt-1">
              {pet.type}
            </p>
            <p className="sm:text-xl font-semibold mt-2">{pet.name}</p>
            <p className="sm:text-sm font-medium text-xs text-[#484848] pt-2">
              {pet.breed}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
