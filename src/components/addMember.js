import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import add from '@images/add-button.png';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { addMember } from '@/app/actions/pet/member';
import { petRecordSystem } from '@/lib/constant';
import petRecordSystemABI from '@/ABI/petRecordSystem';
import { useWriteContract } from 'wagmi';
import { config } from 'wagmi.config.mjs';
import { waitForTransactionReceipt } from '@wagmi/core';

const formSchema = z.object({
  name: z.string({
    required_error: 'Please enter a nickname.',
  }),
  walletAddress: z
    .string({
      required_error: 'Please enter wallet address.',
    })
    .min(40),
  location: z.string({
    required_error: 'Please enter vet location.',
  }),
});

export default function AddMember({ petId, onSuccess }) {
  const CONTRACT_ADDRESS = petRecordSystem;
  const CONTRACT_ABI = petRecordSystemABI;
  const { writeContractAsync } = useWriteContract();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddProvider = async (provider, name) => {
    try {
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'registerServiceProvider',
        args: [provider, name],
      });

      const result = await waitForTransactionReceipt(config, { hash });
      if (result.status === 'reverted') {
        throw new Error('Error occured during executing!');
      }

      return { hash: result.transactionHash.toString() };
    } catch (error) {
      alert(error.message);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      walletAddress: '',
      location: '',
    },
  });

  // Define the submit handler
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const { hash } = await handleAddProvider(data.walletAddress, data.name);
      const formData = {
        petId: petId,
        ...data,
        txHash: hash,
      };

      const response = await addMember(formData);
      if (response.success) {
        reset();
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="w-full flex flex-row gap-4 items-center justify-center">
        <div className=" w-[16rem]">
          <Label htmlFor="name" className="text-sm w-max mb-2">
            Nickname
          </Label>
          <Input
            type="text"
            id="name"
            placeholder="Dr Lim"
            className={errors.name ? 'border-red-500' : ''}
            {...register('name')}
          />
        </div>
        <div className="w-[20rem]">
          <Label htmlFor="walletAddress" className="text-sm w-max mb-2">
            Wallet Address
          </Label>
          <Input
            type="text"
            id="walletAddress"
            placeholder="0x00...0000"
            className={errors.walletAddress ? 'border-red-500' : ''}
            {...register('walletAddress')}
          />
        </div>
        <div className="w-[20rem]">
          <Label htmlFor="location" className="text-sm w-max mb-2">
            Store Location
          </Label>
          <Input
            type="text"
            id="location"
            placeholder="Vet Polyclinic"
            className={errors.location ? 'border-red-500' : ''}
            {...register('location')}
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className={
            'w-fit bg-[#FFC65C] shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-6 text-[#181818] font-semibold rounded-[12px] text-lg items-center justify-center hover:bg-[#F89D47] transition hover:duration-300'
          }
        >
          <Image
            src={add}
            priority={true}
            alt="addIcon"
            className="w-10 h-10"
          />
          {isSubmitting ? 'Adding...' : 'Add Record'}
        </Button>
      </div>
    </form>
  );
}
