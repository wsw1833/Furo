'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import remind from '@images/reminder.png';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Calendar } from './ui/calendar';

// Define the validation schema with Zod
const formSchema = z.object({
  activity: z.string({
    required_error: 'Please select an activity for your pet.',
  }),
  location: z.string({ required_error: 'Location place is required.' }),
  appointmentDate: z.date({ required_error: 'Appointment date is required.' }),
});

export default function ReminderForm() {
  // Initialize the form with useForm hook
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activity: undefined,
      location: undefined,
      appointmentDate: undefined,
    },
  });

  // Define the submit handler
  function onSubmit(values) {
    // This would typically send the form data to an API
    console.log(values);

    // Reset the form
    form.reset();
  }

  return (
    <div className="mt-4 h-full w-full flex flex-row justify-center ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full items-center justify-center"
        >
          <FormField
            control={form.control}
            name="activity"
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
                    <SelectItem value="Dog">Dog</SelectItem>
                    <SelectItem value="Cat">Cat</SelectItem>
                    <SelectItem value="Hamster">Hamster</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormLabel>Pet Health & Grooming Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter The Location"
                    {...field}
                    className={
                      'w-[20rem] sm:text-base text-sm text-center text-[#000000]'
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="appointmentDate"
            render={({ field }) => (
              <FormItem className={'flex flex-col items-center justify-center'}>
                <FormLabel>Reminder Schedule Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[12rem] pl-3 text-left font-normal',
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
                  <PopoverContent className="w-auto p-0" align="text-center">
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
                <FormDescription className="md:text-sm text-xs flex items-center justify-center mt-1">
                  An email notification will be sent on the schedule date.
                </FormDescription>
              </FormItem>
            )}
          />

          <div className="w-full flex items-center justify-center mb-4">
            <Button
              type="submit"
              className="w-fit px-6 flex flex-row items-center justify-center bg-[#FFC65C] text-[#181818] hover:bg-[#F89D47] transition hover:duration-300 font-semibold sm:text-lg text-base"
            >
              Set Reminder
              <Image src={remind} alt="reminderIcon" className="w-6 h-6" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
