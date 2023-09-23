import { ZoomInIcon } from '@radix-ui/react-icons';
import { Button } from '../atoms/button';
import { useMap } from 'react-leaflet';

const ZoomInButton = () => {
  const map = useMap();
  const handleZoomIn = () => {
    map.zoomIn();
  };

  return (
    <Button className="" variant="outline" onClick={handleZoomIn}>
      <ZoomInIcon className="w-6 h-6" />
    </Button>
  );
};

export default ZoomInButton;
