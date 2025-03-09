'use client';

import React, { useState, useEffect } from 'react';
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
import { fetchReminder } from '@/app/actions/pet/reminder';
export default function ReminderPage() {
  const [open, setOpen] = useState(false);
  const [petId, setPetId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reminder, setReminder] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem('selectedPetId');
    setPetId(id);

    //Fetch data once we have the petId
    if (id) {
      const getReminders = async () => {
        setLoading(true);
        try {
          const data = await fetchReminder(id);
          setReminder(data);
        } catch (error) {
          console.error('Failed to fetch records:', error);
        } finally {
          setLoading(false);
        }
      };

      getReminders();
    }
  }, []);

  // Function to refresh data after adding a new record
  const refreshReminders = async () => {
    if (petId) {
      setLoading(true);
      try {
        const data = await fetchReminder(petId);
        setReminder(data);
      } catch (error) {
        console.error('Failed to refresh records:', error);
      } finally {
        setLoading(false);
      }
    }
  };

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
              {petId && (
                <ReminderForm
                  petId={petId}
                  setOpen={setOpen}
                  onSuccess={refreshReminders}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-full lg:px-20 grid h-full items-center justify-center overflow-y-auto mb-4">
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <RemindBox reminders={reminder.data || []} display={true} />
          )}
        </div>
      </div>
    </div>
  );
}
