import { ZoomOutIcon } from '@radix-ui/react-icons';
import { Button } from '../atoms/button';
import { useMap } from 'react-leaflet';

const ZoomOutButton = () => {
  const map = useMap();
  const handleZoomOut = () => {
    map.zoomOut();
  };

  return (
    <Button className="" variant="outline" onClick={handleZoomOut}>
      <ZoomOutIcon className="w-6 h-6" />
    </Button>
  );
};

export default ZoomOutButton;
