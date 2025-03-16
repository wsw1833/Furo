'use client';
import ActivityPage from '@/components/activity';
import QRBox from '@/components/qrbox';
import RemindBox from '@/components/remindbox';
import CarouselBox from '@/components/carouselbox';
import Petpaw from '@images/pet-footprint.png';
import cake from '@images/birthday.png';
import clock from '@images/clock.png';
import notify from '@images/notify-yellow.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchPetProfile } from '@/app/actions/pet/profile';
import { fetchReminder } from '@/app/actions/pet/reminder';
import { fetchRecord } from '@/app/actions/pet/record';
import { dateFormat } from '@/lib/utils';

export default function Dashboard() {
  const [petId, setPetId] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [profile, setProfile] = useState([]);
  const [recordData, setRecordData] = useState([]);
  const [reminderData, setReminderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadPetData = async (id) => {
    if (!id) return;
    setIsLoading(true);

    try {
      const [profileData, recordsData, reminderData] = await Promise.all([
        fetchPetProfile(id),
        fetchRecord(id),
        fetchReminder(id),
      ]);

      setProfile(profileData.profile);
      setRecordData(recordsData);
      setReminderData(reminderData);
    } catch (err) {
      console.error('Failed to fetch pet data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem('selectedPetId');
    const tokenId = localStorage.getItem('tokenId');

    if (id) {
      setPetId(id);
      setTokenId(tokenId);
      loadPetData(id);
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="container lg:w-full lg:h-full h-max">
      <div className="m-4 grid lg:grid-cols-9 lg:grid-rows-2 grid-cols-2 flex-row h-full gap-2">
        <div className="lg:col-span-3 lg:row-span-2 col-span-2 row-span-1 bg-[#FFFFFD] lg:mb-8 w-full rounded-[24px] p-4">
          <div className="flex flex-row items-center justify-start gap-2 mb-2">
            <Image src={clock} alt="clock" className="xl:w-8 xl:h-8 w-7 h-7" />
            <p className="font-semibold xl:text-2xl text-xl">
              Most Recent Activity
            </p>
          </div>
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <ActivityPage records={recordData.record || []} display={false} />
          )}
        </div>
        {/* pet profile */}
        <div className="lg:col-span-3 lg:row-span-1 col-span-2 row-span-1 flex flex-col w-full h-full h-full items-center bg-[#FFFBEF] rounded-[24px]">
          <div className="flex flex-row w-full items-center justify-start gap-2 p-4">
            <Image
              src={Petpaw}
              width={500}
              height={500}
              alt="petPaw"
              className="md:w-8 md:h-8 w-6 h-6"
            />
            <p className="font-semibold md:text-2xl text-xl">Profile</p>
          </div>
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="flex relative flex-col items-center justify-center w-full">
              <Image
                src={profile.petImage ? profile.petImage : null}
                width={500}
                height={500}
                alt="petImage"
                className="xl:w-60 xl:h-60 lg:w-50 lg:h-50 sm:w-50 sm:h-50 w-46 h-46 sm:mb-12 lg:absolute rounded-[20px]"
              />
              <div className="z-1 w-full xl:mt-30 lg:mt-27 h-full relative bg-white/10 backdrop-blur-sm rounded-[30px]">
                <div className="flex flex-col justify-between p-4 row w-full h-full">
                  <div className="flex flex-row justify-between">
                    <p className="font-semibold sm:text-xl text-lg ">
                      {profile.petName}
                    </p>
                    <p className="w-fit px-6 border-2 flex items-center justify-center rounded-[20px] border-[#FFC65C] text-base">
                      {profile.petType}
                    </p>
                  </div>
                  <p className="font-light mt-1 text-base">
                    {profile.petBreed}
                  </p>
                  <div className="flex flex-row items-center justify-start mt-2 gap-2">
                    <Image src={cake} alt="birthday" className="w-7 h-7" />
                    <p className="sm:text-lg text-lg">
                      {dateFormat(profile.birthDay)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="lg:col-span-3 lg:row-span-1 col-span-2 row-span-1 bg-[#FFFFFD] rounded-[24px] p-4 h-full md:mb-8 mb-4 ">
          <QRBox petId={petId} />
        </div>
        <div className="lg:col-span-4 lg:row-span-1 col-span-2 row-span-1 bg-[#FFFFFD] lg:mb-8 rounded-[24px] p-4">
          <div className="flex flex-row items-center justify-start gap-2 mb-2">
            <Image
              src={notify}
              alt="notification"
              className="md:w-8 md:h-8 w-6 h-6"
            />
            <p className="font-semibold md:text-2xl text-xl">Reminder</p>
          </div>
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <RemindBox reminders={reminderData.data || []} display={false} />
          )}
        </div>
        <div className="lg:col-span-2 lg:row-span-1 col-span-2 row-span-1 mb-8 bg-[#FFFFFD] rounded-[24px] flex items-center justify-center">
          <CarouselBox />
        </div>
      </div>
    </div>
  );
}
