import { ReactComponent as FilterIcon } from '@/assets/icons/filter.svg';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover';
import { RequestTypes } from '@/types/types';
import { FixType } from '@/types/utils';
import { Badge } from '../atoms/badge';
import { Button } from '../atoms/button';

import { ReactComponent as FoodIcon } from '@/assets/icons/food.svg';
import { ReactComponent as MarkerIcon } from '@/assets/icons/marker.svg';
import { ReactComponent as MedicalIcon } from '@/assets/icons/medical.svg';
import { ReactComponent as RiskIcon } from '@/assets/icons/risk.svg';
import { ReactComponent as ShelterIcon } from '@/assets/icons/shelter.svg';
import { ReactComponent as SortIcon } from '@/assets/icons/sort.svg';
import { ReactComponent as StatusIcon } from '@/assets/icons/status.svg';
import { Crosshair2Icon } from '@radix-ui/react-icons';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import IconInput from './icon-input';
import IconSelect from './icon-select';

type Filter = FixType;

interface FilterProps {
  filters?: Filter[];
  onFilter?: (filters: Filter[]) => void;
}

const FilterButton = ({}: FilterProps) => {
  const { t } = useTranslation();
  const iconsMap: Record<RequestTypes, ReactNode> = {
    [RequestTypes.Food]: <FoodIcon className="w-4 h-4 text-teal-500" />,
    [RequestTypes.MedicalAssistance]: <MedicalIcon className="w-4 h-4" />,
    [RequestTypes.Rescue]: <RiskIcon className="w-4 h-4" />,
    [RequestTypes.Shelter]: <ShelterIcon className="w-4 h-4" />,
    [RequestTypes.Other]: <div /> // TODO: this is ugly
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">
          <FilterIcon className="mr-2" /> Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-screen">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row w-full gap-4">
            {Object.values(RequestTypes)
              .filter((type) => type !== RequestTypes.Other)
              .map((type) => (
                <Badge key={type} className="w-24 gap-2 items-center" variant="filter">
                  {iconsMap[type]} {t(type)}
                </Badge>
              ))}
          </div>

          <IconSelect icon={SortIcon} position="left" value={''} onChange={(v) => console.log(v)} options={[]} />
          <div className="flex gap-2 items-center">
            <IconInput icon={MarkerIcon} position="left" placeholder="Location" />
            <Button variant={'outline'}>
              <Crosshair2Icon />
            </Button>
          </div>
          <IconSelect icon={StatusIcon} position="left" value={''} onChange={(v) => console.log(v)} options={[]} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterButton;
