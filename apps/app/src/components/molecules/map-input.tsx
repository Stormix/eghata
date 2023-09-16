import { cn } from '@/lib/utils';
import { BaseInputProps } from '@/types/form';
import { forwardRef, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { Location } from './address-input';

interface MapProps extends BaseInputProps {
  value: Location;
  onChange: (value: Location) => void;
}

const MarkerComponent = ({ value, onChange }: MapProps) => {
  const map = useMap();

  useEffect(() => {
    map.setView([value.lat, value.lng]);
  }, [value.lat, value.lng]);

  return (
    <Marker
      position={[value.lat, value.lng]}
      draggable={true}
      eventHandlers={{
        dragend: (values) => {
          onChange({
            ...value,
            lat: values.target.getLatLng().lat,
            lng: values.target.getLatLng().lng
          });
        }
      }}
    >
      <Popup>Current location: {value.address}</Popup>
    </Marker>
  );
};

const MapInput = forwardRef<HTMLDivElement, MapProps>((props, ref) => {
  const { label, optional, value } = props;

  return (
    <div className={cn('flex flex-col gap-y-2.5')} ref={ref}>
      <div className="font-medium">
        <label>
          {label} {!optional && <span className="text-red-500">*</span>}
        </label>
        <p className="text-xs text-gray-400">We will use the address GPS location if you don&apos;t specify this.</p>
      </div>
      <MapContainer
        center={[value.lat, value.lng]}
        zoom={12}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        easeLinearity={0.35}
        className="w-auto h-96 z-[5]"
      >
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <MarkerComponent {...props} />
      </MapContainer>
    </div>
  );
});

MapInput.displayName = 'MapInput';

export default MapInput;
