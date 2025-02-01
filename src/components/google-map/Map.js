import React from "react";
import GoogleMapReact from "google-map-react";
import { fontSize, width } from "@mui/system";
/**
 * Map component displays a Google Map with markers for the country and its capital.
 *
 * @param {Object} obj1 - Coordinates for the country marker.
 * @param {Object} obj1.lat - Latitude of the country.
 * @param {Object} obj1.lng - Longitude of the country.
 * @param {Object} obj2 - Coordinates for the capital marker.
 * @param {Object} obj2.lat - Latitude of the capital.
 * @param {Object} obj2.lng - Longitude of the capital.
 */
export default function Map({obj1, obj2}) {
  const defaultProps = {
    center: {lat:20,lng:77},
    zoom: 2
  };
/**
 * Handles the initialization of the map and markers.
 *
 * @param {Object} map - The Google Map instance.
 * @param {Object} maps - The Google Maps library.
 */
  const handleApiLoaded = (map, maps) => {
    new maps.Marker({
      position: obj1,
      map,
      title: "country",
    });
    new maps.Marker({
      position: obj2,
      map,
      title: "Capital",
     
    });
    map.setCenter(obj2);
    map.setZoom(5);
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCBvIw5-XaAu9_TdfnhlP05QePD4p3LdMY" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals= {true}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
      </GoogleMapReact>
    </div>
  );
}
