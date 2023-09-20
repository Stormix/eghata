import { cn } from '@/lib/utils';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Trip } from '../../assets/trip.svg';
import { Badge } from '../atoms/badge';
import CapacityIndicator from '../atoms/capacity-indicator';
import { useTranslation } from 'react-i18next';

interface CarpoolingCardProps {
  className?: string;
}

const CarpoolingCard = ({ className }: CarpoolingCardProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const onClick = () => {
    navigate('/detail/ride-request/1');
  };

  return (
    <div className={cn('flex gap-4 overflow-hidden rounded-lg bg-gray-100 p-6 shadow-md', className)} onClick={onClick}>
      <div className="flex flex-col justify-between  ">
        <span className="-mt-2 ">20:00</span>
        <span className="-mb-2">10:00</span>
      </div>
      <Trip className="h-full" />
      <div className="flex flex-col justify-between ">
        <span className="-mt-2">{t('Casablanca')}</span>
        <CapacityIndicator capacity={2} maxCapacity={4} />
        <span className="text-xs">
          300-{t('Litre')} {t('Trunk')}
        </span>
        <span className="-mb-2">{t('Marrakech')}</span>
      </div>
      <div className="flex flex-col justify-between  flex-grow ">
        <span className=" flex justify-end ">
          <Badge>{t('Requested')}</Badge>
        </span>
        <div className="text-xs text-teal-500 flex gap-1 justify-end" onClick={onClick}>
          {t('More info')} <ArrowRightIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default CarpoolingCard;
