import { ReactComponent as FoodIcon } from '@/assets/icons/food.svg';
import { ReactComponent as MedicalIcon } from '@/assets/icons/medical.svg';
import { ReactComponent as RiskIcon } from '@/assets/icons/risk.svg';
import { ReactComponent as ShelterIcon } from '@/assets/icons/shelter.svg';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../atoms/badge';

interface CardProps {
  className?: string;
}

const Card = ({ className }: CardProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const onClick = () => {
    navigate('/detail/offer/1');
  };
  return (
        <div
          className={cn('flex gap-4 overflow-hidden rounded-lg bg-gray-100 p-2 items-center shadow-md', className)}
          onClick={onClick}
        >
          {/* <img src="https://i.pravatar.cc/300" className="w-32 h-32 rounded-md" /> */}
          {/* image is fixed due to the rerender caused by the virtualized list */ }
          {/* ps: @Stormix sorry for the pic hahahah */}
          <img src="https://sm.ign.com/ign_fr/cover/a/avatar-gen/avatar-generations_bssq.jpg" className="w-32 h-32 rounded-md" />
          <div className="flex flex-col gap-2 flex-grow justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-gray-900 text-base">{t('Requesting help')}</h3>
              <p className="text-[10px]">
                {t('Near')} {t('Marrakech')} - {t('Posted')} 10 {t('min')} {t('ago')}...
              </p>
              <div className="flex items-center gap-2">
                <ShelterIcon className="w-5 h-5" />
                <FoodIcon className="w-6 h-6 text-teal-500" />
                <RiskIcon className="w-5 h-5 text-red-500" />
                <MedicalIcon className="w-5 h-5 text-red-500" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>
                <Badge variant={'destructive'}>{t('Requested')}</Badge>
              </span>
              <div className="text-xs text-teal-500 flex" onClick={onClick}>
                {t('More info')} <ArrowRightIcon className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
  );
};

export default Card;
