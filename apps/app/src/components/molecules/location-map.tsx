import { MapContainer, Marker, Popup } from 'react-leaflet';
import { BasemapLayer } from 'react-esri-leaflet';
import { useTranslation } from 'react-i18next';

import 'leaflet/dist/leaflet.css';

import { LatLngExpression } from 'leaflet';

interface MapLocationProps {
  location?: LatLngExpression;
}

const token = import.meta.env.VITE_ARCGIS_TOKEN;
const LocationMap = ({ location = [31.073, -8.407] }: MapLocationProps) => {
  const { t } = useTranslation();

  return (
    <MapContainer center={location} zoom={8} className="h-48 w-full z-[5]">
        <BasemapLayer name="ImageryLabels" token={`${token}`} />
        <BasemapLayer name="Imagery" token={`${token}`} />
      <Marker position={location}>
        <Popup>{t('Help needed')}!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationMap;
