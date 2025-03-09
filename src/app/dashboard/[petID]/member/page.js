'use client';
import React from 'react';
import Title from '@/components/pageTitle';
import MemberForm from '@/components/addMember';
import { useState, useEffect } from 'react';
import { fetchMembers } from '@/app/actions/pet/member';

export default function MemberPage() {
  const [petId, setPetId] = useState(null);
  const [memberList, setMemberList] = useState([]);
  const [loading, setLoading] = useState(true);

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
  return (
    <div className="container flex w-full h-full">
      <div className="m-4 px-10 flex flex-col w-full h-full gap-2 bg-[#FFFFFD] rounded-[24px]">
        <Title page={'member'} />
        <MemberForm petId={petId} onSuccess={refreshMemberList} />
        <div className="w-full flex flex-col mt-6 items-center justify-center">
          <p>table of members</p>
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : /* Fixed: removed curly braces around the map function and semicolon after it */
          memberList && memberList.length > 0 ? (
            memberList.map((member) => (
              <div
                key={member._id}
                className="w-full flex justify-center gap-4 p-2 border-b"
              >
                <span>{member.name}</span>
                <span>{member.walletAddress}</span>
                <span>{member.petLocation || member.location}</span>
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
