import React from "react";
import GoogleMapReact from "google-map-react";
import { fontSize, width } from "@mui/system";

export default function Map({obj1, obj2}) {
  const defaultProps = {
    center: {lat:20,lng:77},
    zoom: 2
  };

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
        {/* <AnyReactComponent
          lat={20}
          lng={77}
          text="My Marker"
        /> */}
      </GoogleMapReact>
    </div>
  );
}
