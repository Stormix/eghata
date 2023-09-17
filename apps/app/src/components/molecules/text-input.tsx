import { cn } from '@/lib/utils';
import { BaseInputProps } from '@/types/form';
import { forwardRef } from 'react';
import { Input } from '../atoms/input';

interface TextProps extends BaseInputProps {
  value?: string;
  onChange: (value: string) => void;
}

const TextInput = forwardRef<HTMLInputElement, TextProps>((props, ref) => {
  const { label, optional = false, placeholder, type, value, onChange } = props;
  return (
    <div className={cn('flex flex-col gap-y-2.5')}>
      <div className="font-medium">
        <label>{label}</label>
        {!optional && <span className="text-red-500">*</span>}
      </div>
      <Input
        type={type ?? 'text'}
        placeholder={placeholder}
        className="pr-8 focus:outline-none focus:bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        ref={ref}
      />
    </div>
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;
