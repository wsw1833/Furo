'use client';

import React, { useState } from 'react';
import add from '@images/add-button.png';
import Title from '@/components/pageTitle';
import { Button } from '@/components/ui/button';
import ActivityPage from '@/components/activity';
import { items } from '../page';
import AddRecordForm from '@/components/addForm';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
export default function recordPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="container flex w-full h-full">
      <div className="m-4 flex flex-col w-full h-full gap-2 bg-[#FFFFFD] rounded-[24px]">
        <Title page={'record'} />
        <div className="w-full flex-row flex items-center justify-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className={
                  'w-fit bg-[#FFC65C] shadow-[0_3px_10px_rgb(0,0,0,0.2)] m-4 text-[#181818] p-4 font-semibold rounded-[12px] text-lg items-center justify-center hover:bg-[#F89D47] transition hover:duration-300'
                }
              >
                <Image src={add} alt="addIcon" className="w-10 h-10" />
                Add Record
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#FFFFFD] w-full h-max flex flex-col ">
              <DialogTitle />
              <Title page={'addRecord'} />
              <AddRecordForm />
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-full h-full lg:px-20 px-8 flex items-center justify-center overflow-auto mb-4">
          <ActivityPage items={items} display={true} />
        </div>
      </div>
    </div>
  );
}
