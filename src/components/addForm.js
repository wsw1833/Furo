'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import card from '@images/card.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { addRecord } from '@/app/actions/pet/record';
import { ipfsURL } from '@/lib/utils';
import { petRecordSystem } from '@/lib/constant';
import petRecordSystemABI from '../ABI/petRecordSystem';
import { useWriteContract } from 'wagmi';
import { config } from 'wagmi.config.mjs';
import { waitForTransactionReceipt } from '@wagmi/core';

// Define the validation schema with Zod
const formSchema = z.object({
  petActivity: z.string({
    required_error: 'Please select an activity for your pet.',
  }),
  petLocation: z.string(),
  walletAddress: z.string(),
  petWeight: z.coerce
    .number()
    .positive({ message: 'Weight must be a positive number' }),
  petCondition: z.string({
    required_error: `Your pet's condition is required.`,
  }),
});

const recordMapping = {
  CheckUps: 0,
  Surgery: 1,
  Vaccination: 2,
  Grooming: 3,
  Deworming: 4,
};

export default function AddRecordForm({
  petId,
  setOpen,
  onSuccess,
  location,
  tokenId,
  owner,
}) {
  const CONTRACT_ADDRESS = petRecordSystem;
  const CONTRACT_ABI = petRecordSystemABI;
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with useForm hook
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      petActivity: '',
      petLocation: '',
      walletAddress: address,
      petWeight: 0,
      petCondition: '',
    },
  });

  const recordMapToValue = (record) => {
    return recordMapping[record] !== undefined ? recordMapping[record] : null;
  };

  const submitPetIPFS = async (data) => {
    const response = await fetch('/api/ipfs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const cid = await response.json();
    return cid;
  };

  const handleMintPetRecord = async (
    address,
    petTokenId,
    record,
    petTokenUri
  ) => {
    try {
      const recordValue = recordMapToValue(record);
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'addPetRecord',
        args: [address, petTokenId, recordValue, petTokenUri],
      });

      const result = await waitForTransactionReceipt(config, { hash });
      if (result.status === 'reverted') {
        throw new Error('Error occured during executing!');
      }
      const tokenIdHex = await result.logs[0].topics[3];
      const tokenId = BigInt(tokenIdHex).toString();
      return { hash: result.transactionHash, recordTokenId: tokenId };
    } catch (error) {
      alert(error.message);
    }
  };

  // Define the submit handler
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = {
        petId: petId,
        ...data,
      };
      const cid = await submitPetIPFS(formData);
      const ipfsUrl = ipfsURL(cid);

      let mintResult;

      if (location) {
        mintResult = await handleMintPetRecord(
          owner.walletAddress,
          owner.tokenId,
          data.petActivity,
          ipfsUrl
        );
      } else {
        mintResult = await handleMintPetRecord(
          address,
          tokenId,
          data.petActivity,
          ipfsUrl
        );
      }

      const { hash, recordTokenId } = mintResult;

      const formData2 = {
        ...formData,
        IPFS: ipfsUrl,
        txHash: hash,
        tokenId: recordTokenId,
      };

      const response = await addRecord(formData2);
      if (response.success) {
        form.reset();
        setOpen(false);
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4 h-full w-full flex flex-row justify-center ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full items-center justify-center"
        >
          <FormField
            control={form.control}
            name="petActivity"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormLabel>Pet Care Activities</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={'w-[20rem] sm:text-sm text-xs justify-center'}
                    >
                      <SelectValue placeholder="Select Your Pet Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CheckUps">Pet Check-Ups</SelectItem>
                    <SelectItem value="Surgery">Pet Surgery</SelectItem>
                    <SelectItem value="Vaccination">Pet Vaccination</SelectItem>
                    <SelectItem value="Grooming">Pet Grooming</SelectItem>
                    <SelectItem value="Deworming">Pet Deworming</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="petLocation"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormLabel>Pet Health & Grooming Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder={`Enter the location`}
                    {...field}
                    className={`${
                      location ? '' : ''
                    } w-[20rem] sm:text-base text-sm text-center text-[#000000]`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="walletAddress"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormLabel>Performed By</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder={address}
                    {...field}
                    className={
                      'md:w-[30rem] w-[10rem] bg-zinc-100 sm:text-base text-xs text-center'
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="petWeight"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormLabel>Pet&apos;s Weight</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...form.register('petWeight', { valueAsNumber: true })}
                    placeholder="KG"
                    {...field}
                    className={'w-[10rem] sm:text-base text-sm text-center'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="petCondition"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormLabel>Pet&apos;s Condition</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={'w-[20rem] sm:text-sm text-xs justify-center'}
                    >
                      <SelectValue placeholder="Select Your Pet Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Bad">Bad</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex items-center justify-center mb-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-fit px-6 flex flex-row items-center justify-center bg-[#FFC65C] text-[#181818] hover:bg-[#F89D47] transition hover:duration-300 font-semibold sm:text-lg text-base"
            >
              {isSubmitting ? 'Adding Record...' : 'Add Record'}
              <Image
                src={card}
                priority={true}
                alt="card"
                className="w-fit h-fit"
              />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
