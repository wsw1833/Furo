// RecordPage.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import add from '@images/add-button.png';
import Title from '@/components/pageTitle';
import { Button } from '@/components/ui/button';
import ActivityPage from '@/components/activity';
import AddRecordForm from '@/components/addForm';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { fetchRecord } from '@/app/actions/pet/record';

export default function RecordPage() {
  const [open, setOpen] = useState(false);
  const [petId, setPetId] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [recordData, setRecordData] = useState({ record: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem('selectedPetId');
    const tokenId = localStorage.getItem('tokenId');
    setPetId(id);
    setTokenId(tokenId);

    // Fetch data once we have the petId
    if (id) {
      const getRecords = async () => {
        setLoading(true);
        try {
          const data = await fetchRecord(id);
          setRecordData(data);
        } catch (error) {
          console.error('Failed to fetch records:', error);
        } finally {
          setLoading(false);
        }
      };

      getRecords();
    }
  }, []);

  // Function to refresh data after adding a new record
  const refreshRecords = async () => {
    if (petId) {
      setLoading(true);
      try {
        const data = await fetchRecord(petId);
        setRecordData(data);
      } catch (error) {
        console.error('Failed to refresh records:', error);
      } finally {
        setLoading(false);
      }
    }
  };

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
                <Image
                  src={add}
                  priority={true}
                  alt="addIcon"
                  className="w-10 h-10"
                />
                Add Record
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#FFFFFD] w-full h-max flex flex-col">
              <DialogTitle />
              <Title page={'addRecord'} />
              {petId && (
                <AddRecordForm
                  petId={petId}
                  setOpen={setOpen}
                  onSuccess={refreshRecords}
                  location={false}
                  tokenId={tokenId}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-full h-full lg:px-20 px-4 flex items-center justify-center overflow-auto mb-4">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <ActivityPage records={recordData.record || []} display={true} />
          )}
        </div>
      </div>
    </div>
  );
}
