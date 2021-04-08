import React from 'react';
import { Circle, GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { googleMapAPI } from '../config.json';
import './Home.css';
import OptionsMenu from './components/OptionsMenu';

const mapOptions = {
    styles: [
        {
            featureType: "poi",
            stylers: [{ visibility: "off" }],
        },
        {
            featureType: "transit",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
        },
    ]
};

class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentLocation: {
                lat: 43.645831,
                lng: -79.393641
            },
            circleOptions: {
                strokeColor: '#0022FF',
                strokeOpacity: 0.5,
                strokeWeight: 2,
                fillOpacity: 0,
                radius: 250,
                zIndex: 1
            },
            trekOptions: {

            }
        }
    }

    handleTrekOptionsUpdate(options) {
        this.setState({trekOptions: options});
        this.setState({circleOptions: {radius: Number(options.radius)}});
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.setState({currentLocation: pos});
                },
                () => {
                    window.alert("Unable to find location, location set to downtown Toronto");
                }
            )
        }
    }

    render() {
      return (
        <LoadScript
          googleMapsApiKey={googleMapAPI}
        >
          <GoogleMap
            mapContainerClassName="map"
            center={this.state.currentLocation}
            zoom={15}
            options={mapOptions}
          >

            <OptionsMenu 
                onChange={this.handleTrekOptionsUpdate.bind(this)}
            />
            <Marker 
                position={this.state.currentLocation}
                icon="https://www.google.ca/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow_v3-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v3-2-medium.png,assets/icons/poi/tactile/pinlet_v3-2-medium.png,assets/icons/poi/quantum/pinlet/dot_pinlet-2-medium.png&highlight=ff000000,ffffff,78909c,ffffff?scale=1"
            />
            <Circle 
                center={this.state.currentLocation}
                options={this.state.circleOptions}
            />

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