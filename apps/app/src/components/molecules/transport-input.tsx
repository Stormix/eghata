import { ReactComponent as MarkerIcon } from '@/assets/icons/marker.svg';
import { ReactComponent as SwitchIcon } from '@/assets/icons/switch.svg';
import { Button } from '../atoms/button';
import IconSelect from './icon-select';

interface Value {
  start: string;
  end: string;
}

interface TransportInputProps {
  value?: Value;
  onChange?: (value: Value) => void;
}

const TransportInput = ({}: TransportInputProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col gap-2 flex-grow">
        <IconSelect icon={MarkerIcon} position="left" />
        <IconSelect icon={MarkerIcon} position="left" />
      </div>
      <Button variant="outline" className="">
        <SwitchIcon />
      </Button>
    </div>
  );
};

export default TransportInput;
