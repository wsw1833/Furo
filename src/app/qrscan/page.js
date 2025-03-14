'use client';

import React, { useState, useEffect } from 'react';
import AddRecordForm from '@/components/addForm';
import Title from '@/components/pageTitle';
import { fetchPetProfile } from '../actions/pet/profile';
import { useSearchParams } from 'next/navigation';
import { fetchProvider } from '../actions/pet/provider';
import { useAccount } from 'wagmi';
import { Suspense } from 'react';

// Create a separate component for the logic that uses useSearchParams
function QRPageContent() {
  const searchParams = useSearchParams();
  const petId = searchParams.get('petId');
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState([]);
  const [tokenId, setTokenId] = useState('');
  const [provider, setProvider] = useState([]);
  const [error, setError] = useState(null);

  const getProfile = async () => {
    if (!address) return;

    setLoading(true);
    setError(null); // Reset error state
    try {
      const profileData = await fetchPetProfile(petId);
      const providerData = await fetchProvider(address);
      setProfile(profileData.profile);
      setProvider(providerData.provider);
    } catch (err) {
      console.error('Failed to fetch records:', err);
      setError('Unable to fetch profile or provider data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      console.log('Connected address:', address);
      getProfile();
    }
  }, [address, petId]); // Keep dependencies minimal

  useEffect(() => {
    const id = localStorage.getItem('tokenId');
    setTokenId(id);
  }, []); // Separate tokenId retrieval

  return (
    <div className="container flex w-full h-full">
      <div className="flex flex-col items-center justify-center w-full h-max m-4 p-4 gap-2 bg-[#FFFFFD] rounded-[24px]">
        <div className="w-full flex flex-col h-max justify-center overflow-y-auto">
          <Title page={'addRecord'} />
          {loading ? (
            <div className="flex items-center justify-center w-full h-[20rem]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <AddRecordForm
              petId={petId}
              setOpen={''}
              onSuccess={''}
              location={true}
              tokenId={tokenId}
              owner={profile}
              provider={provider}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// The main QRPage component wraps the content in Suspense
export default function QRPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <QRPageContent />
    </Suspense>
  );
}
