import { cn } from '@/lib/utils';
import { Input } from '../atoms/input';

interface FileProps {
  title: string;
  isOptional: boolean;
}

const FileInput = ({ title, isOptional }: FileProps) => {
  return (
    <div className={cn('flex flex-col gap-y-2.5')}>
      <div className="font-medium">
        <label>{title}</label>
        {!isOptional && <span className="text-red-500">*</span>}
      </div>
      <Input type="file" className="pr-8 focus:outline-none focus:bg-white" />
    </div>
  );
};

export default FileInput;
