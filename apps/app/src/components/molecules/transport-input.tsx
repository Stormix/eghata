import { ReactComponent as SwitchIcon } from '@/assets/icons/switch.svg';
import { useState } from 'react';
import { Button } from '../atoms/button';
import AddressInput, { Location } from './address-input';
import { useTranslation } from 'react-i18next';

interface TransportValue {
  start: Location;
  end: Location;
}

interface TransportInputProps {
  value: TransportValue;
  onChange: (value: TransportValue) => void;
}

const TransportInput = ({ value, onChange }: TransportInputProps) => {
  const { t } = useTranslation();

  const [transportValue, setTransportValue] = useState<TransportValue>(value);
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col gap-2 flex-grow">
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
        <SwitchIcon />
      </Button>
    </div>
  );
};

export default TransportInput;
