import { ReactComponent as SwitchIcon } from '@/assets/icons/switch.svg';
import { useState } from 'react';
import { Button } from '../atoms/button';
import AddressInput, { Location } from './address-input';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface TransportValue {
  start: Location;
  end: Location;
}

interface TransportInputProps {
  value: TransportValue;
  onChange: (value: TransportValue) => void;
}

const TransportInput = ({ value, onChange }: TransportInputProps) => {
  const { t, i18n } = useTranslation();
  const ar = i18n.language === 'ar-ma';

  const [transportValue, setTransportValue] = useState<TransportValue>(value);
  return (
    <div className="relative flex items-center gap-2">
      <div className="flex flex-col flex-grow gap-2">
        <AddressInput
          placeholder={t('Start address')}
          value={transportValue.start}
          onChange={(value) => {
            setTransportValue({
              ...transportValue,
              start: value
            });
            onChange({
              ...transportValue,
              start: value
            });
          }}
        />
        <AddressInput
          placeholder={t('End address')}
          value={transportValue.end}
          onChange={(value) => {
            setTransportValue({
              ...transportValue,
              end: value
            });
            onChange({
              ...transportValue,
              end: value
            });
          }}
        />
      </div>
      <Button
        className={cn('absolute w-10 px-0 rounded-full  top-9 ', {
          'left-8': ar,
          'right-6': !ar
        })}
        variant="outline"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setTransportValue({
            start: transportValue.end,
            end: transportValue.start
          });
          onChange({
            start: transportValue.end,
            end: transportValue.start
          });
        }}
      >
        <SwitchIcon className="text-teal-500" />
      </Button>
    </div>
  );
};

export default TransportInput;
