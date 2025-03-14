import React from 'react';
import QR from '@images/qr.png';
import Image from 'next/image';
import { useQRCode } from 'next-qrcode';
import Link from 'next/link';
export default function QrBox({ petId }) {
  const { Canvas } = useQRCode();
  const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000';
  return (
    <div className="container flex flex-col w-full h-full">
      <div className="w-full flex flex-row items-center justify-start gap-2">
        <Image src={QR} alt="QRIcon" className="md:w-8 md:h-8 w-6 h-6" />
        <p className="font-semibold md:text-2xl text-xl">QR Code</p>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <Canvas
          text={`http://${baseURL}/qrscan?petId=${petId}`}
          options={{
            type: 'image/jpeg',
            scale: 5,
          }}
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-1">
        <span className="font-semibold">OR</span>
        <Link target="_blank" href={`http://${baseURL}/qrscan?petId=${petId}`}>
          <span className="text-sm  underline text-[#2B87FF]">
            Click here to navigate
          </span>
        </Link>
      </div>
    </div>
  );
}
