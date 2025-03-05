import React from 'react';
import Title from '@/components/pageTitle';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import add from '@images/add-button.png';
export default function MemberPage() {
  return (
    <div className="container flex w-full h-full">
      <div className="m-4 px-10 flex flex-col w-full h-full gap-2 bg-[#FFFFFD] rounded-[24px]">
        <Title page={'member'} />
        <div className="w-full flex flex-row gap-4 items-center justify-center">
          <div className=" w-[16rem]">
            <Label htmlFor="name" className="text-sm w-max mb-2">
              Nickname
            </Label>
            <Input type="text" id="name" placeholder="Dr Lim" className="" />
          </div>
          <div className="w-[20rem]">
            <Label htmlFor="wallet" className="text-sm w-max mb-2">
              Wallet Address
            </Label>
            <Input
              type="text"
              id="wallet"
              placeholder="0x00...0000"
              className=""
            />
          </div>
          <div className="w-[20rem]">
            <Label htmlFor="location" className="text-sm w-max mb-2">
              Store Location
            </Label>
            <Input
              type="text"
              id="location"
              placeholder="Vet Polyclinic"
              className=""
            />
          </div>
          <Button
            className={
              'w-fit bg-[#FFC65C] shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-6 text-[#181818] font-semibold rounded-[12px] text-lg items-center justify-center hover:bg-[#F89D47] transition hover:duration-300'
            }
          >
            <Image src={add} alt="addIcon" className="w-10 h-10" />
            Add Record
          </Button>
        </div>
        <div className="w-full h-max flex flex-row mt-6 items-center justify-center">
          <p>table of members</p>
        </div>
      </div>
    </div>
  );
}
