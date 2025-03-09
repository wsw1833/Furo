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
import { useState } from 'react';
import { addRecord } from '@/app/actions/pet/record';
import { useRouter } from 'next/navigation';

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

export default function AddRecordForm({ petId, setOpen, onSuccess }) {
  const router = useRouter();
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

  // Define the submit handler
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = {
        petId: petId,
        ...data,
      };
      const response = await addRecord(formData);
      if (response.success) {
        form.reset();
        setOpen(false);
        if (onSuccess) onSuccess();
      } else {
        setError(result.error || 'Failed to add record');
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
                    <SelectItem value="Check-Ups">Pet Check-Ups</SelectItem>
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
                    placeholder="Enter The Location"
                    {...field}
                    className={
                      'w-[20rem] bg-zinc-100 sm:text-base text-sm text-center text-[#000000]'
                    }
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
                      'w-[30rem] bg-zinc-100 sm:text-base text-xs text-center'
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
                <FormLabel>Pet&apos; Weight</FormLabel>
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
                <FormLabel>Pet&apos; Condition</FormLabel>
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
              <Image src={card} alt="card" className="w-fit h-fit" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
