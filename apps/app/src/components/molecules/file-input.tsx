import { cn } from '@/lib/utils';
import { BaseInputProps } from '@/types/form';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../atoms/input';

interface FileProps extends BaseInputProps {
  value: File[];
  onChange: (value: File[]) => void;
}

const FileInput = forwardRef<HTMLInputElement, FileProps>((props, ref) => {
  const { t } = useTranslation();

  const { label, onChange, optional = false } = props;
  return (
    <div className={cn('flex flex-col gap-y-2.5')}>
      <div className="font-medium">
        <label>{t(label!)}</label>
        {!optional && <span className="text-red-500">*</span>}
      </div>
      <Input
        type="file"
        className="pr-8 focus:outline-none focus:bg-white"
        ref={ref}
        multiple
        onChange={(event) => {
          if (!event.target.files) return;
          console.log(event.target.files);
          onChange(
            Array.from({ length: event.target.files?.length }, (_, i) => event.target.files?.item(i)).filter(
              Boolean
            ) as File[]
          );
        }}
      />
    </div>
  );
});

FileInput.displayName = 'FileInput';

export default FileInput;
