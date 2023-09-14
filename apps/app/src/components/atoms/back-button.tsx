import { cn } from '@/lib/utils';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'flex items-center justify-center p-2 capitalize border border-gray-200 rounded h-9 w-9',
        className
      )}
      onClick={() => navigate(-1)}
    >
      <ArrowLeftIcon />
    </div>
  );
};

export default BackButton;
