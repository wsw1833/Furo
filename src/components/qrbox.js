import React from 'react';
import Image from 'next/image';
import QR from '@images/qr.png';
import QRCODE from '@images/qr-code.png';

export default function QrBox() {
  return (
    <div className="container flex flex-col w-full h-full">
      <div className="w-full flex flex-row items-center justify-start gap-2">
        <Image src={QR} alt="QRIcon" className="md:w-8 md:h-8 w-6 h-6" />
        <p className="font-semibold md:text-2xl text-xl">QR Code</p>
      </div>
      <div className="w-full h-full flex items-center justify-center p-4">
        <Image
          src={QRCODE}
          alt="QRCODE"
          className="flex items-center justify-center lg:w-50 lg:h-50 md:w-40 md:h-40 w-36 h-36"
        />
      </div>
    </div>
  );
}
