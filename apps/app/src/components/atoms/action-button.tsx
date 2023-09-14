import { ReactComponent as PlusIcon } from '@/assets/icons/plus.svg';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const ActionButton = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(' w-16 h-16 bg-red-800 rounded-full text-4xl flex justify-center items-center', className)}
      onClick={() => setOpen(!open)}
    >
      <PlusIcon className={cn('transform transition-transform duration-300', open && 'rotate-45')} />
    </div>
  );
};

export default ActionButton;
