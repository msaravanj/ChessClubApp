import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import classes from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";

const Map = () => {
  const position = [44.07036712849963, 15.287355083279662];

  return (
    <MapContainer
      className={classes.leaflet}
      center={position}
      zoom={15}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>Šahovski klub "Goran" Bibinje</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
