'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import card from '@images/card.png';
import Image from 'next/image';
import { cn, ipfsURL } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import ImageUploadPreview from './uploader';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
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
} from './ui/select';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Calendar } from './ui/calendar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { petRecordSystem } from '@/lib/constant';
import petRecordSystemABI from '@/ABI/petRecordSystem.json';
import { useWriteContract } from 'wagmi';
import { config } from 'wagmi.config.mjs';
import { waitForTransactionReceipt } from '@wagmi/core';

// Define the validation schema with Zod
const formSchema = z.object({
  petName: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(50, {
      message: 'Name must not exceed 50 characters.',
    }),
  walletAddress: z.string(),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  petType: z.string(),
  petBreed: z.string().min(3, {
    message: 'Pet Breed must be at least 2 characters.',
  }),
  birthDay: z.date({ required_error: "Your pet's birthday is required." }),
  petImage: z.any(),
});

export default function ProfileForm({ addr }) {
  const CONTRACT_ADDRESS = petRecordSystem;
  const CONTRACT_ABI = petRecordSystemABI;
  const { writeContractAsync } = useWriteContract();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMintPet = async (address, petTokenUri) => {
    try {
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'mintPet',
        args: [address, petTokenUri],
      });

      const result = await waitForTransactionReceipt(config, { hash });
      if (result.status === 'reverted') {
        throw new Error('Error occured during executing!');
      }
      const tokenIdHex = result.logs[0].topics[3];
      const tokenId = BigInt(tokenIdHex).toString();
      return { hash: result.transactionHash, tokenId };
    } catch (error) {
      alert(error.message);
    }
  };

  // Initialize the form with useForm hook
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      petName: '',
      walletAddress: addr,
      email: '',
      petType: '',
      petBreed: '',
      birthDay: undefined,
      petImage: '',
    },
  });

  const generateImage = async (petImage, prompt) => {
    const formData = new FormData();
    formData.append('image', petImage);
    formData.append('mode', 'image-to-image');
    formData.append('prompt', prompt);
    formData.append('output_format', 'png'); // Use PNG for transparency support
    formData.append('model', 'sd3.5-medium'); // using model SD 3.5 Medium
    formData.append('strength', 0.6); // Adjust strength (0.1 to 1.0)

    try {
      const response = await fetch(
        'https://api.stability.ai/v2beta/stable-image/generate/sd3',
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STABILITY_API_KEY}`,
            Accept: 'image/*',
          },
        }
      );

      if (response.status !== 200) throw new Error('Image generation failed');
      const arraybuffer = await response.arrayBuffer();
      return Buffer.from(arraybuffer); // Generated image buffer
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const removeBgImage = async (imageBuffer) => {
    const formData = new FormData();
    formData.append('image', new Blob([imageBuffer]));

    try {
      const response = await fetch(
        'https://api.stability.ai/v2beta/stable-image/edit/remove-background',
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STABILITY_API_KEY}`,
            Accept: 'image/*',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Background removal failed: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer); // Return the background-removed image buffer
    } catch (error) {
      console.error('Error removing background:', error);
      throw error;
    }
  };

  const submitPetIPFS = async (data) => {
    const response = await fetch('/api/ipfs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const cid = await response.json();
    return cid;
  };

  const submitImageS3 = async (petImage) => {
    try {
      const formData = new FormData();
      const blob = new Blob([petImage], { type: 'image/png' });
      formData.append('petImage', blob);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();

      return data.url;
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const prompt = `Authentic 16-bit Pokémon-style pixel art of a ${data.petType} of ${data.petBreed}, minimal shading, vibrant bold colors, isolated on a transparent background.`;
      const generatedImageBuffer = await generateImage(data.petImage, prompt);
      const bgRemovedBuffer = await removeBgImage(generatedImageBuffer);
      const imageURL = await submitImageS3(bgRemovedBuffer);
      const formData = {
        ...data,
        birthDay: data.birthDay.toISOString(),
        petImage: imageURL,
      };

      const cid = await submitPetIPFS(formData);
      const ipfsUrl = ipfsURL(cid);

      const { hash, tokenId } = await handleMintPet(addr, ipfsUrl);

      const formData2 = {
        ...formData,
        IPFS: ipfsUrl,
        txHash: hash,
        tokenId: tokenId,
      };

      const response = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData2),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Server responded with ${response.status}`
        );
      }
      const result = await response.json();
      if (result.success) {
        console.log(result);
        localStorage.setItem('selectedPetId', result.data._id);
        localStorage.setItem('tokenId', tokenId);
        router.push(`/dashboard/${result.data._id}`);
        form.reset();
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-10 w-full">
      <Form {...form}>
        <form
          encType="multipart/form-data"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="petName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of Your Pet</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Pet's Name"
                    {...field}
                    className={'sm:text-base text-sm'}
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
              <FormItem>
                <FormLabel>Owner&apos;s Wallet Address</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder={addr}
                    {...field}
                    className={'bg-zinc-100 sm:text-base text-xs'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="welovepets@gmail.com"
                    {...field}
                    className={'w-[60%] sm:text-base text-sm'}
                  />
                </FormControl>
                <FormDescription>
                  only accept gmail for current phase.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="petType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose Your Pet Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={'w-[50%] sm:text-sm text-xs'}>
                      <SelectValue placeholder="Select Your Pet Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Dog">Dog</SelectItem>
                    <SelectItem value="Cat">Cat</SelectItem>
                    <SelectItem value="Hamster">Hamster</SelectItem>
                    <SelectItem value="Rabbit">Rabbit</SelectItem>
                    <SelectItem value="Parrot">Parrot</SelectItem>
                    <SelectItem value="Turtle">Turtle</SelectItem>
                    <SelectItem value="Gecko">Gecko</SelectItem>
                    <SelectItem value="Snake">Snake</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="petBreed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tell Us Your Pet&apos;s Breed</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Pet's Breed"
                    {...field}
                    className={'w-[60%] sm:text-base text-sm'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDay"
            render={({ field }) => (
              <FormItem className={'w-auto'}>
                <FormLabel>When Is Your Pet&apos;s Birthday?</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="petImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Show Us Your Pet!</FormLabel>
                <FormControl>
                  <ImageUploadPreview
                    onChange={(file) => {
                      field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-fit px-6 flex flex-row items-center justify-center bg-[#FFC65C] text-[#181818] hover:bg-[#F89D47] transition hover:duration-300 font-semibold sm:text-lg text-base"
          >
            {isSubmitting ? 'Creating...' : 'Create'}
            <Image
              src={card}
              priority={true}
              alt="card"
              className="w-fit h-fit"
            />
          </Button>
        </form>
      </Form>
    </div>
  );
}
