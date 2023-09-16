import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

class Map extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      currentPos: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: { latlng: any }) {
    this.setState({ currentPos: e.latlng });
  }

  render() {
    return (
      <div className="w-auto h-96">
        <MapContainer
          center={[31.073, -8.407]}
          zoom={6}
          maxZoom={20}
          attributionControl={true}
          zoomControl={true}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
          easeLinearity={0.35}
          className="w-auto h-96 z-[5]"
        >
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />

          <Marker position={[31.073, -8.407]} draggable={true}>
            <Popup>Current location:</Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }
}

export default Map;
