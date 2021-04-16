import React from 'react';
import { Button, FormCheck, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DatabaseAPI from '../APIs/DatabaseAPI';
import './LoginSignup.css';

class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
            terms: false,
            validation: {
                firstName: true,
                lastName: true,
                email: true,
                password: true,
                passwordConfirm: true,
                terms: true,
            },
            validationOn: false,
            databaseError: ""
        }
    }

    handleFirstNameChange(event) {
        let value = event.target.value;

        if (value.length <= 100) {
            this.setState({firstName: value});
        }
    }

    handleLastNameChange(event) {
        let value = event.target.value;

        if (value.length <= 100) {
            this.setState({lastName: value});
        }
    }

    handleEmailChange(event) {
        let value = event.target.value;

        if (value.length <= 255) {
            this.setState({email: value});
        }
    }

    handlePasswordChange(event) {
        let value = event.target.value;

        if (value.length < 100) {
            this.setState({password: value});
        }
    }

    handlePasswordConfirmChange(event) {
        let value = event.target.value;

        if (value.length < 100) {
            this.setState({passwordConfirm: value});
        }
    }

    handleTermsChange() {
        this.setState({terms: (!this.state.terms)});
    }

    checkValid() {
        let firstName = (this.state.firstName.length > 0);
        let lastName = (this.state.lastName.length > 0);
        let email = (this.state.email.length > 0);
        let password = (this.state.password.length >= 8);
        let passwordConfirm = (this.state.password === this.state.passwordConfirm);
        let terms = this.state.terms;

        let validation = this.state.validation;

        if (firstName !== validation.firstName ||
            lastName !== validation.lastName ||
            email !== validation.email ||
            password !== validation.password ||
            passwordConfirm !== validation.passwordConfirm ||
            terms !== validation.terms) {

            this.setState({
                validation: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    passwordConfirm: passwordConfirm,
                    terms: terms
                }
            });
        }
    }

    allValid() {
        return (this.state.validation.firstName &&
                this.state.validation.lastName &&
                this.state.validation.email &&
                this.state.validation.password &&
                this.state.validation.passwordConfirm &&
                this.state.terms)
    }

    async handleSubmit() {
        this.checkValid();

        if (this.allValid()) {
            
            let response = await DatabaseAPI.signup(
                this.state.firstName,
                this.state.lastName,
                this.state.password,
                this.state.email
            );

            if (response.success) {
                this.componentWillUnmount();
            } else {
                let errors = "";

                for (let i = 0; i < response.errors.length-1; i++) {
                    errors += `${response.errors[i]}, `
                }
                errors += `${response.errors[response.errors.length-1]}`;

                this.setState({databaseError: errors});
            }
        }

        this.setState({validationOn: true});
    }

    componentDidUpdate() {
        if (this.state.validationOn) {
            this.checkValid();
        }
    }

    componentWillUnmount() {
        this.props.history.push('/');
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
                        { this.state.databaseError.length > 0 && (
                            <span className="text-danger">{this.state.databaseError}</span>
                        )}
                        <FormControl 
                            placeholder="First Name"
                            className="mt-4"
                            value={this.state.firstName}
                            onChange={this.handleFirstNameChange.bind(this)}
                        />
                        { !this.state.validation.firstName && (
                            <span className="text-danger">First Name must be not be empty</span>
                        )}
                        <FormControl 
                            placeholder="Last Name"
                            className="mt-4"
                            value={this.state.lastName}
                            onChange={this.handleLastNameChange.bind(this)}
                        />
                        { !this.state.validation.lastName && (
                            <span className="text-danger">Last Name must be not be empty</span>
                        )}
                        <FormControl 
                            placeholder="Email"
                            className="mt-4"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleEmailChange.bind(this)}
                        />
                        { !this.state.validation.email && (
                            <span className="text-danger">Email is invalid</span>
                        )}
                        <FormControl 
                            placeholder="Password"
                            className="mt-4"
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange.bind(this)}
                        />
                        { !this.state.validation.password && (
                            <span className="text-danger">Password must be 8 or more characters</span>
                        )}
                        <FormControl 
                            placeholder="Confirm Password"
                            className="mt-4"
                            type="password"
                            value={this.state.passwordConfirm}
                            onChange={this.handlePasswordConfirmChange.bind(this)}
                        />
                        { !this.state.validation.passwordConfirm && (
                            <span className="text-danger">Passwords do not match</span>
                        )}
                        <FormCheck
                            className="mt-4"
                            id="termsCheckbox"
                            label={terms}
                            checked={this.state.terms}
                            onChange={this.handleTermsChange.bind(this)}
                        />
                        <Button 
                            className="my-1"
                            variant="primary"
                            block
                            onClick={this.handleSubmit.bind(this)}
                        >Sign Up
                        </Button>
                        { !this.state.validation.terms && (
                            <span className="text-danger">You must agree to the terms to sign up</span>
                        )}
                    </div>               
                </div>
            </div>
        );
    }
}

export default Signup;