import { cn } from '@/lib/utils';
import { BaseInputProps } from '@/types/form';
import { forwardRef } from 'react';
import { Textarea } from '../atoms/textarea';

interface TextProps extends BaseInputProps {
  value?: string;
  onChange: (value: string) => void;
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextProps>((props, ref) => {
  const { label, optional = false, placeholder, value, onChange } = props;
  return (
    <div className={cn('flex flex-col gap-y-2.5')}>
      <div className="font-medium">
        <label>{label}</label>
        {!optional && <span className="text-red-500">*</span>}
      </div>
      <Textarea placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} ref={ref} />
    </div>
  );
});

TextAreaInput.displayName = 'TextAreaInput';

export default TextAreaInput;
