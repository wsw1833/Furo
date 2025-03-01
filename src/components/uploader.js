'use client';

import React, { useState, useRef } from 'react';
import uploadDog from '@images/upload.png';
import Image from 'next/image';
import { Button } from './ui/button';
export default function ImageUploadPreview({ onChange }) {
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Pass the file to the parent form if onChange prop exists
    if (onChange) {
      onChange(file);
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-[60%]">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      {/* Upload area */}
      {!previewUrl ? (
        <div
          onClick={handleClick}
          className="border-2 rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <Image
            src={uploadDog}
            alt="upload"
            className="w-fit h-fit lg:w-20 lg:h-20"
          />
          <p className="mt-4 text-gray-500 font-medium lg:text-base text-xs">
            Upload Image Here
          </p>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-48 object-contain border rounded-lg"
            onClick={handleClick}
          />
          <div className="mt-2 text-center">
            <Button
              type="button"
              onClick={handleClick}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Change Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
