import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useTranslation } from 'react-i18next';

import 'leaflet/dist/leaflet.css';

import { LatLngExpression } from 'leaflet';

interface MapLocationProps {
  location?: LatLngExpression;
}

const LocationMap = ({ location = [31.073, -8.407] }: MapLocationProps) => {
  const { t } = useTranslation();

  return (
    <MapContainer center={location} zoom={8} className="h-48 w-full z-[5]">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={location}>
        <Popup>{t('Help needed')}!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationMap;
