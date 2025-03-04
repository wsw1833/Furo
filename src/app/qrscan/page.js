import React from 'react';
import addButton from '@images/add-button.png';
import AddRecordForm from '@/components/addForm';
import Title from '@/components/pageTitle';
import Image from 'next/image';
export default function QRPage() {
  return (
    <div className="container flex w-full h-full">
      <div className="flex flex-col items-center justify-center w-full h-max m-4 p-4 gap-2 bg-[#FFFFFD] rounded-[24px]">
        <div className="w-full flex flex-col h-max justify-center overflow-y-auto">
          <Title page={'addRecord'} />
          <AddRecordForm />
        </div>
      </div>
    </div>
  );
}
