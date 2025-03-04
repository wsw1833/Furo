'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import remind from '@images/reminder.png';
import Title from '@/components/pageTitle';
import RemindBox from '@/components/remindbox';
import { Button } from '@/components/ui/button';
import ReminderForm from '@/components/remindForm';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { items } from '../page';
export default function reminderPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="container flex w-full h-full">
      <div className="m-4 flex flex-col w-full h-full mb-20 gap-2 bg-[#FFFFFD] rounded-[24px]">
        <Title page={'reminder'} />
        <div className="w-full flex flex-row items-center justify-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className={
                  'w-fit bg-[#FFC65C] shadow-[0_3px_10px_rgb(0,0,0,0.2)] m-4 text-[#181818] p-4 font-semibold rounded-[12px] text-lg items-center justify-center hover:bg-[#F89D47] transition hover:duration-300'
                }
              >
                <Image src={remind} alt="reminderIcon" className="w-6 h-6" />
                Set Reminder
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#FFFFFD] w-full h-max flex flex-col ">
              <DialogTitle />
              <Title page={'reminder'} />
              <ReminderForm />
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-full lg:px-20 grid h-full items-center justify-center overflow-y-auto mb-4">
          <RemindBox items={items} display={true} />
        </div>
      </div>
    </div>
  );
}
