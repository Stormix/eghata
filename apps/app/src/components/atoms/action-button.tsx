import { ReactComponent as CheckIcon } from '@/assets/icons/check.svg';
import { ReactComponent as PlusIcon } from '@/assets/icons/plus.svg';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './button';
import LoadingSpinner from './loading-spinner';

interface ActionButtonProps {
  className?: string;
  asSubmit?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const ActionButton = ({ className, asSubmit, loading, disabled }: ActionButtonProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (asSubmit) {
    return (
      <button
        className={cn(' w-16 h-16 bg-teal-500 rounded-full text-4xl flex justify-center items-center', className, {
          'bg-gray-500': disabled
        })}
        {...(asSubmit && { type: 'submit' })}
      >
        {!loading && <CheckIcon className={cn('transform transition-transform duration-300', open && 'rotate-45')} />}
        {loading && <LoadingSpinner />}
      </button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger>
        <button
          className={cn(' w-16 h-16 bg-red-800 rounded-full text-4xl flex justify-center items-center', className)}
          onClick={() => setOpen(!open)}
        >
          <PlusIcon className={cn('transform transition-transform duration-300', open && 'rotate-45')} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-screen" side="top" sideOffset={50}>
        <div className="flex flex-col gap-4 py-4">
          <Button variant={'destructive'} onClick={() => navigate('/help-request')} className="rounded-full">
            Request Help
          </Button>
          <Button variant={'destructive'} onClick={() => navigate('/help-offer')} className="rounded-full">
            Offer Help
          </Button>
          <Button variant={'destructive'} onClick={() => navigate('/transport-offer')} className="rounded-full">
            Offer Transport
          </Button>
          <Button variant={'destructive'} onClick={() => navigate('/transport-request')} className="rounded-full">
            Request Transport
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ActionButton;
