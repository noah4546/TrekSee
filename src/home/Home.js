import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { googleMapAPI } from '../config.json';
import './Home.css';
  
const center = {
    lat: -3.745,
    lng: -38.523
};

class Map extends React.Component {
    render() {
      return (
        <LoadScript
          googleMapsApiKey={googleMapAPI}
        >
          <GoogleMap
            mapContainerClassName="map"
            center={center}
            zoom={10}
          >
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
          </GoogleMap>
        </LoadScript>
      )
    }
  }

class Home extends React.Component {

    render() {
        return(
            <div>
                <Map />
            </div>
        )
    }

}

export default Home;