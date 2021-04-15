import React from 'react';
import { Button, FormCheck, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LoginSignup.css';

class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: {
                value: "",
                valid: true,
            },
            lastName: {
                value: "",
                valid: true,
            },
            email: {
                value: "",
                valid: true,
            },
            password: {
                value: "",
                valid: true,
            },
            passwordConfirm: {
                value: "",
                valid: true,
            },
        }
    }

    handleFirstNameChange(event) {
        let value = event.target.value;

        if (value.length <= 100) {
            this.setState({firstName: {value: value}});
        }
    }

    handleLastNameChange(event) {
        let value = event.target.value;

        if (value.length <= 100) {
            this.setState({lastName: {value: value}});
        }
    }

    handleEmailChange(event) {
        let value = event.target.value;

        if (value.length <= 255) {
            this.setState({email: {value: value}});
        }
    }

    handlePasswordChange(event) {
        let value = event.target.value;

        if (value.length < 100) {
            this.setState({password: {value: value}});
        }
    }

    handlePasswordConfirmChange(event) {
        let value = event.target.value;

        if (value.length < 100) {
            this.setState({passwordConfirm: {value: value}});
        }
    }

    handleSubmit() {
        console.log(this.state);
    }

    render() {
        let terms = (
            <p>
                I have read and agree to the 
                <Link to="/privacy" target="_blank"> Privacy Policy </Link>
                &amp;
                <Link to="/terms" target="_blank"> Terms of Use </Link>
            </p>
        );

        return(
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <h2 className="text-center">Sign Up</h2>
                        <FormControl 
                            placeholder="First Name"
                            className="mt-4"
                            value={this.state.firstName.value}
                            onChange={this.handleFirstNameChange.bind(this)}
                        />
                        <FormControl 
                            placeholder="Last Name"
                            className="mt-4"
                            value={this.state.lastName.value}
                            onChange={this.handleLastNameChange.bind(this)}
                        />
                        <FormControl 
                            placeholder="Email"
                            className="mt-4"
                            type="email"
                            value={this.state.email.value}
                            onChange={this.handleEmailChange.bind(this)}
                        />
                        <FormControl 
                            placeholder="Password"
                            className="mt-4"
                            type="password"
                            value={this.state.password.value}
                            onChange={this.handlePasswordChange.bind(this)}
                        />
                        <FormControl 
                            placeholder="Password Confirm"
                            className="mt-4"
                            type="password"
                            value={this.state.passwordConfirm.value}
                            onChange={this.handlePasswordConfirmChange.bind(this)}
                        />
                        <FormCheck
                            className="mt-4"
                            id="termsCheckbox"
                            label={terms}
                        />
                        <Button 
                            className="mt-1"
                            variant="primary"
                            block
                            onClick={this.handleSubmit.bind(this)}
                        >Sign Up
                        </Button>
                    </div>               
                </div>
            </div>
        );
    }
}

export default Signup;