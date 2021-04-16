import { DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Directions.css';

class Directions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            response: null,
            destination: '',
            origin: '',
            travelMode: '',
            runService: false
        };
    }

    directionsCallback(response) {
        console.log(response);
        if (response != null) {
            if (response.status === 'OK') {
                this.setState({response: response});
                console.log(response);
            }
        }
    }

    getDirectionsService() {
        if (this.state.destination !== '' && this.state.origin !== '') {
            console.log("ran directions service");
            return (
                <DirectionsService
                    options={{
                        destination: this.props.destination,
                        origin: this.props.origin,
                        travelMode: this.props.travelMode
                    }}
                    callback={this.directionsCallback.bind(this)}
                />
            );
        }
        return null;
    }

    getDirectionsRender() {
        if (this.state.response !== null) {
            return (
                <DirectionsRenderer 
                    options={{
                        directions: this.state.response
                    }}
                />
            );
        }
        return null;
    }

    checkService() {
        // This stops the directions service from running too many times
        if (this.props.destination !== this.state.destination ||
            this.props.origin !== this.state.origin ||
            this.props.travelMode !== this.state.travelMode) {

            this.setState({
                response: null,
                destination: this.props.destination,
                origin: this.props.origin,
                travelMode: this.props.travelMode,
                runService: true
            });
        } else {
            if (this.state.runService === true && this.state.response !== null)
                this.setState({runService: false});
        }
    }

    componentDidUpdate() {
        this.checkService();
    }

    componentDidMount() {
        this.checkService();
    }

    render() {
        let distance = "";
        let time = "";

        if (this.state.response !== null) {
            let route = this.state.response.routes[0].legs[0];
            distance = route.distance.text;
            time = route.duration.text;
        }

        return(
            <div>  
                <div className="directions-options">
                    <Button
                        onClick={this.props.onClearDirections}
                    >Clear Directions</Button>
                    <p className="text-center">Distance: {distance}</p>
                    <p className="text-center">Time: {time}</p>
                </div>
                <div>
                    {this.state.runService && this.getDirectionsService()}
                    {this.getDirectionsRender()}  
                </div>
            </div>
        );
    }

}

export default Directions;