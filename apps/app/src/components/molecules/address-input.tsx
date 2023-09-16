import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover';
import { cn } from '@/lib/utils';
import { BaseInputProps } from '@/types/form';
import { FixType } from '@/types/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { forwardRef, useState } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { Button } from '../atoms/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../atoms/command';

interface TextProps extends BaseInputProps {
  value?: Location;
  onChange: (value: Location) => void;
}

export interface Location {
  address: string;
  lat: number;
  lng: number;
}

const AddressInput = forwardRef<HTMLDivElement, TextProps>((props, ref) => {
  const { label, optional = false } = props;
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<Location>({
    address: props.value?.address || 'Enter an address...',
    lat: props.value?.lat || 0,
    lng: props.value?.lng || 0
  });

  const { placesService, placePredictions, getPlacePredictions } = usePlacesService({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    debounce: 500
  });

  return (
    <div className={cn('flex flex-col gap-y-2.5')} ref={ref}>
      <div className="font-medium">
        <label>{label}</label>
        {!optional && <span className="text-red-500">*</span>}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-label="Enter an address..."
            aria-expanded={open}
            className="flex-1 justify-between w-full"
          >
            {location ? location.address : 'Enter an address...'}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-screen">
          <Command>
            <CommandInput
              placeholder="Enter an address..."
              onValueChange={(value) => getPlacePredictions({ input: value })}
            />

            {placePredictions.length ? (
              <CommandGroup>
                {placePredictions.map((place) => (
                  <CommandItem
                    key={place.place_id}
                    onSelect={() => {
                      placesService?.getDetails(
                        {
                          placeId: place.place_id
                        },
                        (placeDetails: FixType) => {
                          setLocation({
                            address: placeDetails.formatted_address,
                            lat: placeDetails.geometry.location.lat(),
                            lng: placeDetails.geometry.location.lng()
                          });

                          props.onChange({
                            address: placeDetails.formatted_address,
                            lat: placeDetails.geometry.location.lat(),
                            lng: placeDetails.geometry.location.lng()
                          });
                        }
                      );
                      setOpen(false);
                    }}
                  >
                    {place.description}

                    {/* <CheckIcon className={cn('ml-auto h-4 w-4', false ? 'opacity-100' : 'opacity-0')} /> */}
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty>Start typing your location..</CommandEmpty>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
});

AddressInput.displayName = 'TextInput';

export default AddressInput;
