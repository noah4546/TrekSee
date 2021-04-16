import React from 'react';
import { Button, FormControl } from 'react-bootstrap';
import DatabaseAPI from '../APIs/DatabaseAPI';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            databaseError: "",
            validation: {
                email: true,
                password: true
            },
            validationOn: false
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

    async checkValid() {
        let email = (this.state.email.length > 0);
        let password = (this.state.password.length >= 8);

        let validation = this.state.validation;

        if (email !== validation.email || password !== validation.password) {
            this.setState({
                validation: {
                    email: email,
                    password: password
                }
            });
        }
        console.log(this.state.validation);
    }

    allValid() {
        let validation = this.state.validation;
        return (validation.email && validation.password);
    }

    contains(array, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === value) return true;
        }
        return false;
    }

    async handleSubmit() {
        await this.checkValid();

        if (this.allValid()) {
            console.log(this.allValid());

            let response = await DatabaseAPI.login(
                this.state.email,
                this.state.password
            );
    
            if (response.success) {
                window.location.href = "/";
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

    render() {
        return(
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <h2 className="text-center">Login</h2>
                        { this.state.databaseError.length > 0 && (
                            <span className="text-danger">{this.state.databaseError}</span>
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
                        <Button
                            className="mt-4"
                            variant="success"
                            block
                            onClick={this.handleSubmit.bind(this)}
                        >Login
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;