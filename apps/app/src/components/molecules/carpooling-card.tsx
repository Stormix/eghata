import { cn } from '@/lib/utils';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Trip } from '../../assets/trip.svg';
import { Badge } from '../atoms/badge';
import CapacityIndicator from '../atoms/capacity-indicator';

interface CarpoolingCardProps {
  className?: string;
}

const CarpoolingCard = ({ className }: CarpoolingCardProps) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/detail/ride-request/1');
  };

  return (
    <div
      className={cn('flex gap-4 overflow-hidden rounded-lg bg-gray-100 p-6 items-center shadow-md', className)}
      onClick={onClick}
    >
      <div className="flex flex-col justify-between h-full">
        <span className="-mt-3">20:00</span>
        <span className="-mb-2">10:00</span>
      </div>
      <Trip />
      <div className="flex flex-col justify-between h-full">
        <span className="-mt-3">Casablanca</span>
        <CapacityIndicator capacity={2} maxCapacity={4} />
        <span className="text-xs">300-Litre Trunk</span>
        <span className="-mb-2">Marackech</span>
      </div>
      <div className="flex flex-col justify-between h-full flex-grow ">
        <span className="-mt-3 flex justify-end">
          <Badge>Requested</Badge>
        </span>
        <div className="text-xs text-teal-500 flex -mb-2 justify-end" onClick={onClick}>
          More info <ArrowRightIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default CarpoolingCard;
