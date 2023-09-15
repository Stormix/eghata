import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import SearchInput from '../atoms/search-input';

const Map = () => {
  return (
    <div className="flex w-screen h-screen">
      <SearchInput className="absolute top-16 z-10 w-11/12 my-4 left-1/2 -translate-x-1/2" />
      <MapContainer center={[31.073, -8.407]} zoom={8} className="w-full h-full z-[5]">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default Map;
