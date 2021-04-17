import React from 'react';
import { Button, FormControl, Table } from 'react-bootstrap';
import UserActions from '../APIs/UserActions';

class Account extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            location: {
                lat: "",
                lng: ""
            }
        }
    }

    handleLatUpdate(event) {
        let lat = event.target.value;

        if (lat >= -90 && lat <= 90) {
            this.setState({location: {lat: lat}});
        }
    }

    handleLngUpdate(event) {
        let lng = event.target.value;

        if (lng >= -180 && lng <= 180) {
            this.setState({location: {lng: lng}});
        } 
    }

    async handleSubmit() {
        let location = this.state.location;

        if (location.lat === 0 && location.lng === 0) {
            UserActions.updateLatLng(
                null,
                null
            );
        } else {
            UserActions.updateLatLng(
                location.lat,
                location.lng
            );
        }

        

        this.getUser();
    }

    async getUser() {
        let user = await UserActions.getUser();
        this.setState({user: user});
        console.log(user);

        if (user.location !== null) {
            this.setState({location: user.location});
        }
    }

    async componentDidMount() {
        this.getUser();
    }

    render() {

        if (this.state.user === null) return null;

        return(
            <div className="container pt-5">
                <h2 className="text-center pb-3">Account Management</h2>
                <Table>
                    <tbody>
                        <tr>
                            <td><b>First Name</b></td>
                            <td>{this.state.user.firstName}</td>
                        </tr>
                        <tr>
                            <td><b>Last Name</b></td>
                            <td>{this.state.user.lastName}</td>
                        </tr>
                        <tr>
                            <td><b>Email</b></td>
                            <td>{this.state.user.email}</td>
                        </tr>
                        <tr>
                            <td><b>Location</b></td>
                            <td>
                                <div className="d-flex">
                                    <p className="mt-1 mr-3"><b>Lat:</b></p>
                                    <FormControl 
                                        type="number"
                                        value={this.state.location.lat}
                                        onChange={this.handleLatUpdate.bind(this)}
                                    />
                                </div>
                                <div className="d-flex">
                                    <p className="mt-1 mr-3"><b>Lng:</b></p>
                                    <FormControl 
                                        type="number"
                                        value={this.state.location.lng}
                                        onChange={this.handleLngUpdate.bind(this)}
                                    />
                                </div>
                                <Button
                                    block
                                    onClick={this.handleSubmit.bind(this)}
                                >Update
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <td><b>Created</b></td>
                            <td>{this.state.user.created}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Account;