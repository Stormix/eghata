import { ReactComponent as MinusIcon } from '@/assets/icons/circle-minus.svg';
import { ReactComponent as PlusIcon } from '@/assets/icons/circle-plus.svg';
import { cn } from '@/lib/utils';
import { BaseInputProps } from '@/types/form';
import { forwardRef } from 'react';
interface NumberInputProps extends BaseInputProps {
  value?: number;
  onChange: (value: number) => void;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
  const { label, optional = false, value, onChange } = props;
  return (
    <div className={cn('flex flex-row justify-between items-center')} ref={ref}>
      <div className="font-medium">
        <label>{label}</label>
        {!optional && <span className="text-red-500">*</span>}
      </div>

      <div className="flex flex-row border border-gray-400  text-gray-400 gap-4 items-center px-2 py-1 rounded-md">
        <PlusIcon className="flex w-6 h-6 rounded-full" onClick={() => onChange(value ? value + 1 : 1)} />
        <span className="font-medium text-black">{value ?? 0}</span>
        <MinusIcon className="flex w-6 h-6 rounded-full" onClick={() => onChange(value ? value - 1 : 0)} />
      </div>
    </div>
  );
});

NumberInput.displayName = 'TextInput';

export default NumberInput;
