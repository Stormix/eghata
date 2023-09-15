import { ReactComponent as PlusIcon } from '@/assets/icons/plus.svg';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from './button';

const ActionButton = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover>
      <PopoverTrigger>
        <div
          className={cn(' w-16 h-16 bg-red-800 rounded-full text-4xl flex justify-center items-center', className)}
          onClick={() => setOpen(!open)}
        >
          <PlusIcon className={cn('transform transition-transform duration-300', open && 'rotate-45')} />
        </div>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-screen" side="top" sideOffset={50}>
        <div className="flex flex-col gap-4 py-4">
          <Button variant={'destructive'} className="rounded-full">
            Offer Help
          </Button>
          <Button variant={'destructive'} className="rounded-full">
            Request Help
          </Button>
          <Button variant={'destructive'} className="rounded-full">
            Offer Transport
          </Button>
          <Button variant={'destructive'} className="rounded-full">
            Request Transport
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ActionButton;
