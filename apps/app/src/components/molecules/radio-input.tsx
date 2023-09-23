import { cn } from '@/lib/utils';
import { BaseInputProps, Option } from '@/types/form';
import { forwardRef } from 'react';
import { Label } from '../atoms/label';
import { RadioGroup, RadioGroupItem } from '../atoms/radio-group';
import { useTranslation } from 'react-i18next';

interface RadioInputProps extends BaseInputProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

const RadioInput = forwardRef<HTMLDivElement, RadioInputProps>((props, ref) => {
  const { t, i18n } = useTranslation();
  const ar = i18n.language === 'ar-ma';

  const { label, optional, options, value, onChange } = props;
  return (
    <div className={cn('flex flex-col gap-y-2.5')}>
      <div className="font-medium">
        <label>{label}</label>
        {!optional && <span className="text-red-500">*</span>}
      </div>

      <RadioGroup
        className={cn({ 'justify-end': ar, 'justify-start': !ar })}
        orientation="horizontal"
        value={value}
        onValueChange={(value) => {
          onChange(options.find((option) => option.value === value)?.value ?? '');
        }}
      >
        {options.map((option) => (
          <div className="flex items-center space-x-2" key={option.value} ref={ref}>
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value}>{t(option.label)}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
});

RadioInput.displayName = 'RadioInput';

export default RadioInput;
