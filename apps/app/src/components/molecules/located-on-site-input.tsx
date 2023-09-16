import { cn } from '@/lib/utils';
import { Input } from '../atoms/input';

interface LocatedOnSiteProps {
  title: string;
  isOptional: boolean;
}

const LocatedOnSiteInput = ({ title, isOptional }: LocatedOnSiteProps) => {
  return (
    <div className={cn('flex flex-col gap-y-2.5')}>
      <div className="font-medium">
        <label>{title}</label>
        {!isOptional && <span className="text-red-500">*</span>}
      </div>
      <div className="flex flex-row gap-4">
        <label className="flex flex-row items-center gap-2">
          <Input type="radio" className="w-5 focus:outline-none focus:bg-white" id="yes" name="locatedInSite" />
          Yes
        </label>
        <label className="flex flex-row items-center gap-2">
          <Input type="radio" className="w-5 focus:outline-none focus:bg-white0" id="no" name="locatedInSite" />
          No
        </label>
      </div>
    </div>
  );
};

export default LocatedOnSiteInput;
