import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useState } from 'react';
import CarpoolingCard from '../components/molecules/carpooling-card';
import TransportInput from '../components/molecules/transport-input';
const Carpooling = () => {
  const [date, setDate] = useState<Date>(new Date());
  return (
    <div className="flex flex-col w-full h-full gap-4 justify-start py-4 px-4">
      <TransportInput
        value={{
          start: {
            address: '',
            lat: 0,
            lng: 0
          },
          end: {
            address: '',
            lat: 0,
            lng: 0
          }
        }}
        onChange={(value) => console.log(value)}
      />

      <Popover>
        <PopoverTrigger asChild>
          <div className="bg-gray-100 text-teal-500 text-center font-medium  px-4 py-2">
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date: Date | undefined) => setDate(date ?? new Date())}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
          <CarpoolingCard key={index} className="" />
        ))}
      </div>
    </div>
  );
};

export default Carpooling;
