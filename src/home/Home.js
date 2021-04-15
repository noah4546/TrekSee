import React from 'react';
import { Circle, GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { googleMapAPI } from '../config.json';
import './Home.css';
import OptionsMenu from './components/OptionsMenu';
import API from '../API';
import InfoMenu from './components/InfoMenu';

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
    ],
    disableDefaultUI: true,
};

const pinIcons = {
    gray: "https://www.google.ca/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow_v3-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v3-2-medium.png,assets/icons/poi/tactile/pinlet_v3-2-medium.png,assets/icons/poi/quantum/pinlet/dot_pinlet-2-medium.png&highlight=ff000000,ffffff,78909c,ffffff?scale=1"
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
            trekOptions: {},
            selectedLocation: {},
            places: []
        }
    }

    async handleTrekOptionsUpdate(options) {
        this.setState({trekOptions: options});
        this.setState({circleOptions: {radius: Number(options.radius*1000)}});

        let queries = [];

        for (let i = 0; i < options.checkboxes.length; i++) {
            if (options.checkboxes[i].value === true) {
                queries.push(options.checkboxes[i].place);
            }
        } 

        let yelp = await API.getYelpPlacesMultiple(queries, this.state.currentLocation, this.state.circleOptions.radius);
        console.log(yelp);
        this.setState({places: yelp});
    }

    handlePinClicked(location) {
        this.setState({selectedLocation: location});
    }

    getAllPins() {
        let pins = this.state.places.map(location => (
            <Marker 
                key={Math.random()*10000}
                onClick={this.handlePinClicked.bind(this, location)}
                position={{
                    lat: location.coordinates.latitude,
                    lng: location.coordinates.longitude
                }}
            />
        ));

        return pins;
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

            <InfoMenu 
                info={this.state.selectedLocation}
            />
            <OptionsMenu 
                onChange={this.handleTrekOptionsUpdate.bind(this)}
            />
            <Marker 
                position={this.state.currentLocation}
                icon={pinIcons.gray}
            />
            <Circle 
                center={this.state.currentLocation}
                options={this.state.circleOptions}
            />

            {this.getAllPins()}
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