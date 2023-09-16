import { cn } from '@/lib/utils';
import { ReactComponent as FoodIcon } from '@/assets/icons/food.svg';
import { ReactComponent as MedicalIcon } from '@/assets/icons/medical.svg';
import { ReactComponent as RiskIcon } from '@/assets/icons/risk.svg';
import { ReactComponent as ShelterIcon } from '@/assets/icons/shelter.svg';
import { ReactComponent as RescueIcon } from '@/assets/icons/rescue.svg';
import { ReactComponent as OtherIcon } from '@/assets/icons/other.svg';
import AssistanceTypeBlock from '../atoms/assistance-type-block';

interface AssistanceTypeProps {
  title: string;
  isOptional: boolean;
}

const AssistanceTypeInput = ({ title, isOptional }: AssistanceTypeProps) => {
  return (
    <div className={cn('flex flex-col gap-y-2.5')}>
      <div className="font-medium">
        <label>{title}</label>
        {!isOptional && <span className="text-red-500">*</span>}
      </div>
      <div className="flex flex-row gap-2 flex-wrap">
        <AssistanceTypeBlock icon={ShelterIcon} title="Shelter" />
        <AssistanceTypeBlock icon={FoodIcon} title="Food" className="text-teal-500" />
        <AssistanceTypeBlock icon={RescueIcon} title="Rescue" />
        <AssistanceTypeBlock icon={MedicalIcon} title="Medical Aid" />
        <AssistanceTypeBlock icon={RiskIcon} title="Risks" />
        <AssistanceTypeBlock icon={OtherIcon} title="Other" />
      </div>
    </div>
  );
};

export default AssistanceTypeInput;
