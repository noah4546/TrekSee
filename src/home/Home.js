import React from 'react';
import { Circle, GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { googleMapAPI } from '../config.json';
import './Home.css';
import OptionsMenu from './components/OptionsMenu';
import YelpAPI from '../APIs/YelpAPI';

import InfoMenu from './components/InfoMenu';
import Directions from './components/Directions';
import { Button } from 'react-bootstrap';

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

class Home extends React.Component {
    constructor(props) {
        super(props);

        let location = null;

        if (this.props.customLocation !== null) {
            location = this.props.customLocation;
        }

        this.state = {
            currentLocation: location,
            userAddedPins: this.props.userAddedPins,
            circleOptions: {
                strokeColor: '#0022FF',
                strokeOpacity: 0.5,
                strokeWeight: 2,
                fillOpacity: 0,
                radius: 250,
                zIndex: 1
            },
            trekOptions: {},
            selectedLocation: null,
            places: [],
            directionsOn: false,
            directions: {
                origin: null,
                destination: null,
                travelMode: null,
            },
            directionsJSX: null,
            mobile: {
                options: false,
                info: false,
            }
        }
    }

    async handleTrekOptionsUpdate(options) {
        this.setState({trekOptions: options});
        this.setState({circleOptions: {radius: Number(options.radius*1000)}});

        let queries = [];

        for (let i = 0; i < options.checkboxes.length; i++) {
            if (options.checkboxes[i].value === true) {
                queries.push(options.checkboxes[i].terms);
            }
        } 

        let yelp = await YelpAPI.getYelpPlacesMultiple(queries, this.state.currentLocation, this.state.circleOptions.radius);
        this.setState({places: yelp});
    }

    handleModeUpdate(mode) {
        this.setState({trekOptions: {mode: mode}});
    }

    handleRadiusChange(radius) {
        this.setState({circleOptions: {radius: Number(radius*1000)}});
    }

    handlePinClicked(location) {
        this.setState({selectedLocation: location});

        if (window.innerWidth <= 700) {
            this.setState({mobile: {options: false,info: true,}});
        } else {
            this.setState({mobile: {options: true,info: true,}});
        }
        
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

    getUserAddedPins() {
        if (this.state.userAddedPins && this.state.userAddedPins.length > 0) {
            let pins = this.state.userAddedPins.map(location => (
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
        return null;
    }

    getDirections() {
        let directions = this.state.directions;

        if (this.state.directionsOn && 
            directions.destination !== null &&
            directions.origin !== null) {
            return (
                <Directions 
                    destination={directions.destination}
                    origin={directions.origin}
                    travelMode={this.state.trekOptions.mode}
                    onClearDirections={this.handleClearDirections.bind(this)}
                />
            );
        } else {
            return null;
        }
    }

    handleStartTrek() {
        this.setState({
            directionsOn: true,
            directions: {
                destination: {
                    lat: this.state.selectedLocation.coordinates.latitude,
                    lng: this.state.selectedLocation.coordinates.longitude
                },
                origin: this.state.currentLocation
            }
        });
    }
    
    handleClearDirections() {
        this.setState({
            directionsOn: false,
            directions: {
                destination: null,
                origin: null
            }
        });
    }

    handleMobileChange(show) {
        if (show === 'options') {
            if (this.state.mobile.options) {
                this.setState({mobile: {options: false,info: false,}});
            } else {
                this.setState({mobile: {options: true,info: false,}});
            } 
        } else if (show === 'info') {
            if (this.state.mobile.info) {
                this.setState({mobile: {options: false,info: false,}});
            } else {
                this.setState({mobile: {options: false,info: true,}});
            }
        }
    }

    componentDidMount() {
        if (navigator.geolocation && this.state.currentLocation === null) {
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
                    const pos = {
                        lat: 43.645831,
                        lng: -79.393641
                    }
                    this.setState({currentLocation: pos});
                }
            )
        }
    }

    render() {
        let showOptions = true;
        let showInfo = true;
        
        if (window.innerWidth <= 700) {
            showOptions = this.state.mobile.options;
            showInfo = this.state.mobile.info;
        }

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
                    onRadiusChange={this.handleRadiusChange.bind(this)}
                    onModeChange={this.handleModeUpdate.bind(this)}
                    show={showOptions}
                />
                <InfoMenu 
                    info={this.state.selectedLocation}
                    onStartTrek={this.handleStartTrek.bind(this)}
                    show={showInfo}
                />
                <MobileSwitch 
                    onClick={this.handleMobileChange.bind(this)}
                    selectedLocation={this.state.selectedLocation}
                />
                <Marker 
                    position={this.state.currentLocation}
                    icon={pinIcons.gray}
                />
                <Circle 
                    center={this.state.currentLocation}
                    options={this.state.circleOptions}
                />

                {this.getDirections()}

                {this.getAllPins()}
                {this.getUserAddedPins()}
                <></>
                </GoogleMap>
            </LoadScript>
        )
    }
}

class MobileSwitch extends React.Component {

    getBoth() {
        return(
            <div className="mobile-switch mobile-switch-both">
                <div className="d-flex justify-content-center">
                    <Button
                        onClick={this.props.onClick.bind(this, 'info')}
                    >Place Info</Button>
                </div>
                <div className="d-flex justify-content-center">
                    <Button
                        onClick={this.props.onClick.bind(this, 'options')}
                    >Find a Trek</Button>
                </div>
            </div>
        );
    }

    getTrek() {
        return(
            <div className="mobile-switch">
                <div className="d-flex justify-content-center">
                    <Button
                        onClick={this.props.onClick.bind(this, 'options')}
                    >Find a Trek</Button>
                </div>
            </div>
        );
    }

    render() {
        if (this.props.selectedLocation == null) {
            return this.getTrek();
        } else {
            return this.getBoth();
        }  
    } 
}

export default Home;