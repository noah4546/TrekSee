import { DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import React from 'react';

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

    componentDidUpdate() {

        // This stops the directions service from running too many times
        if (this.props.destination !== this.state.destination ||
            this.props.origin !== this.state.origin ||
            this.props.travelMode !== this.state.travelMode) {

            this.setState({
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

    render() {
        return(
            <div>  
                {this.state.runService && this.getDirectionsService()}
                {this.getDirectionsRender()}  
            </div>
        );
    }

}

export default Directions;