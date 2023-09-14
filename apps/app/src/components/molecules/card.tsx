import { cn } from '@/lib/utils';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { ReactComponent as FoodIcon } from '../../assets/icons/food.svg';
import { ReactComponent as MedicalIcon } from '../../assets/icons/medical.svg';
import { ReactComponent as RiskIcon } from '../../assets/icons/risk.svg';
import { ReactComponent as ShelterIcon } from '../../assets/icons/shelter.svg';
import { Badge } from '../atoms/badge';

interface CardProps {
  className?: string;
}

const Card = ({ className }: CardProps) => {
  return (
    <div className={cn('flex gap-4 overflow-hidden rounded-lg bg-gray-100 p-2 items-center shadow-md', className)}>
      <img src="https://i.pravatar.cc/300" className="w-32 h-32 rounded-md" />
      <div className="flex flex-col gap-2 flex-grow justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-gray-900 text-base">Requesting help</h3>
          <p className="text-[10px]">Near Marrakech - Posted 10min ago...</p>
          <div className="flex items-center gap-2">
            <ShelterIcon className="w-5 h-5" />
            <FoodIcon className="w-6 h-6 text-teal-500" />
            <RiskIcon className="w-5 h-5" />
            <MedicalIcon className="w-5 h-5" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span>
            <Badge variant={'destructive'}>Requested</Badge>
          </span>
          <div className="text-xs text-teal-500 flex">
            More info <ArrowRightIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
