import { cn } from '@/lib/utils';
import Map from '../atoms/map';

interface MapProps {
  title: string;
  isOptional: boolean;
}

const MapInput = ({ title, isOptional }: MapProps) => {
  return (
    <div className={cn('flex flex-col gap-y-2.5')}>
      <div className="font-medium">
        <label>{title}</label>
        {!isOptional && <span className="text-red-500">*</span>}
      </div>
      <Map />
    </div>
  );
};

export default MapInput;
