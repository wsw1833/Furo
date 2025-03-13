'use client';
import React from 'react';
import Title from '@/components/pageTitle';
import MemberForm from '@/components/addMember';
import { useState, useEffect } from 'react';
import { deleteMember, fetchMembers } from '@/app/actions/pet/member';
import { formatAddress } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from '@wagmi/core';
import { petRecordSystem } from '@/lib/constant';
import petRecordSystemABI from '@/ABI/petRecordSystem';
import { config } from 'wagmi.config.mjs';

export default function MemberPage() {
  const CONTRACT_ADDRESS = petRecordSystem;
  const CONTRACT_ABI = petRecordSystemABI;
  const [petId, setPetId] = useState(null);

  const { writeContractAsync } = useWriteContract();
  const [memberList, setMemberList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem('selectedPetId');
    setPetId(id);

    if (id) {
      const getMembers = async () => {
        setLoading(true);
        try {
          const data = await fetchMembers(id);
          setMemberList(data.data);
        } catch (error) {
          console.error('Failed to fetch records:', error);
        } finally {
          setLoading(false);
        }
      };

      getMembers();
    }
  }, []);

  // Function to refresh data after adding a new record
  const refreshMemberList = async () => {
    if (petId) {
      setLoading(true);
      try {
        const data = await fetchMembers(petId);
        setMemberList(data);
      } catch (error) {
        console.error('Failed to refresh member list:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const removeServiceProvider = async (providerAddress) => {
    try {
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'removeServiceProvider',
        args: [providerAddress],
      });

      const result = await waitForTransactionReceipt(config, { hash });
      if (result.status === 'reverted') {
        throw new Error('Error occured during executing!');
      }

      return result;
    } catch (error) {
      alert(error.message);
    }
  };
  const handleRemoveMember = async (walletAddress) => {
    const result = removeServiceProvider(walletAddress);
    if (result) {
      const response = await deleteMember(walletAddress);
      if (response.success) {
        router.refresh();
      }
    }
  };
  return (
    <div className="container flex w-full h-full">
      <div className="m-4 px-10 flex flex-col w-full h-full gap-2 bg-[#FFFFFD] rounded-[24px]">
        <Title page={'member'} />
        <MemberForm petId={petId} onSuccess={refreshMemberList} />
        <div className="w-full flex flex-col mt-6 items-center justify-center">
          <p className="w-full font-semibold flex items-center justify-center md:text-xl text-lg">
            Member List
          </p>
          <div className="w-full grid grid-cols-4 lg:ml-22 md:ml-16 ml-10 items-center justify-center gap-4 p-2 mt-2">
            <p className=" col-span-1 items-center justify-center md:text-lg text-base">
              Name
            </p>
            <p className=" col-span-1 items-center justify-center md:text-lg text-base">
              Wallet Address
            </p>
            <p className=" col-span-1 items-center justify-center md:text-lg text-base">
              Location
            </p>
            <p className="col-span-1 items-center justify-center md:text-lg text-base">
              Remove
            </p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : memberList && memberList.length > 0 ? (
            memberList.map((member) => (
              <div
                key={member._id}
                className="w-full grid grid-cols-4 lg:ml-22 md:ml-16 ml-10 items-center justify-around gap-4 p-2 border-b"
              >
                <span className="col-span-1">{member.name}</span>
                <span className="col-span-1">
                  {formatAddress(member.walletAddress)}
                </span>
                <span className="col-span-1">
                  {member.petLocation || member.location}
                </span>
                <Button
                  onClick={() => handleRemoveMember(member.walletAddress)}
                  className="col-span-1 w-[8rem] bg-red-400 font-bold text-base transition hover:duration-300 hover:bg-red-600"
                >
                  Remove
                </Button>
              </div>
            ))
          ) : (
            <div>No members found</div>
          )}
        </div>
      </div>
    </div>
  );
}
