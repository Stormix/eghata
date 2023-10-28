import { AttributionControl, MapContainer, TileLayer } from 'react-leaflet';
import { BasemapLayer } from 'react-esri-leaflet';
import { Button } from '@/components/atoms/button';
import { LayersIcon } from '@radix-ui/react-icons';
import 'leaflet/dist/leaflet.css';

import SearchInput from '../components/atoms/search-input';
import { useState } from 'react';
import ZoomInButton from '@/components/atoms/zoom-in-button';
import ZoomOutButton from '@/components/atoms/zoom-out-button';

const Map = () => {
  const [view, setView] = useState('satellite');

  return (
    <div className="flex w-screen h-screen ">
      <SearchInput className="absolute z-10 w-11/12 my-4 -translate-x-1/2 top-4 left-1/2" />

      <MapContainer
        center={[31.073, -8.407]}
        minZoom={3}
        maxZoom={18}
        zoom={8}
        className="w-full h-full z-[5]"
        zoomControl={false}
        attributionControl={false}
      >
        <AttributionControl position="topleft" />
        <div className="flex flex-col gap-2 z-[9999] absolute bottom-[118px] right-4">
          <ZoomInButton />
          <ZoomOutButton />
          <Button variant="outline" onClick={() => setView((view) => (view === 'satellite' ? 'street' : 'satellite'))}>
            <LayersIcon className="w-5 h-5" />
          </Button>
        </div>

        {view === 'satellite' && (
          <>
            <BasemapLayer name="ImageryLabels" />
            <BasemapLayer name="Imagery" />
          </>
        )}

        {view === 'street' && <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />}
      </MapContainer>
    </div>
  );
};

export default Map;
