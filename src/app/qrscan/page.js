import React from 'react';
import addButton from '@images/add-button.png';
import AddRecordForm from '@/components/addForm';
import Image from 'next/image';
export default function qrPage() {
  return (
    <div className="container flex w-full h-full">
      <div className="flex flex-col items-center justify-center w-full h-max m-4 p-4 gap-2 bg-[#FFFFFD] rounded-[24px]">
        <div className="w-full flex flex-col h-max justify-center overflow-y-auto">
          <div className="flex flex-row w-full h-max items-center justify-center">
            <Image
              src={addButton}
              alt="addButton"
              className="md:w-14 md:h-14 w-12 h-12"
            />
            <p className="font-semibold xl:text-3xl text-2xl">Add Record</p>
          </div>
          <AddRecordForm />
        </div>
      </div>
    </div>
  );
}
