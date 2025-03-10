'use client';

import React from 'react';
import AddRecordForm from '@/components/addForm';
import Title from '@/components/pageTitle';
import { useSearchParams } from 'next/navigation';
export default function QRPage() {
  const searchParams = useSearchParams();
  const petId = searchParams.get('petId');

  return (
    <div className="container flex w-full h-full">
      <div className="flex flex-col items-center justify-center w-full h-max m-4 p-4 gap-2 bg-[#FFFFFD] rounded-[24px]">
        <div className="w-full flex flex-col h-max justify-center overflow-y-auto">
          <Title page={'addRecord'} />
          <AddRecordForm petId={petId} location={true} />
        </div>
      </div>
    </div>
  );
}
