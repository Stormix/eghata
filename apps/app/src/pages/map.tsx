import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { BasemapLayer } from 'react-esri-leaflet';

import 'leaflet/dist/leaflet.css';

import SearchInput from '../components/atoms/search-input';

const token = import.meta.env.VITE_ARCGIS_TOKEN;

const Map = () => {
  return (
    <div className="fixed w-screen h-screen ">
      <SearchInput className="absolute z-10 w-11/12 my-4 -translate-x-1/2 top-4 left-1/2" />
      <MapContainer center={[31.073, -8.407]} zoom={8} className="w-full h-full z-[5]" zoomControl={false}>
        <BasemapLayer name="ImageryLabels" token={`${token}`} />
        <BasemapLayer name="Imagery" token={`${token}`} />
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
};

export default Map;
