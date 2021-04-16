import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import Home from './home/Home';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';
import Explore from './explore/Explore';
import DatabaseAPI from './APIs/DatabaseAPI';
import Login from './account/Login';
import Signup from './account/Signup';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customLocation: {
                lat: 43.335866,
                lng: -79.82493
            },
            userAddedPins: [],
            user: {
                loggedIn: false,
                firstName: "",
                lastName: "",
                email: "",
                created: null
            }
        }      
    }

    async componentDidMount() {
        let user = await DatabaseAPI.getUser()
        this.setState({user: user});
        console.log(user);
    }

    async handleLogout() {
        DatabaseAPI.logout();

        this.setState({
            user: {
                loggedIn: false,
                firstName: "",
                lastName: "",
                email: "",
                created: null
            }
        });
    }

    render() {
        return (
            <Router>
                <div>
                    <Header 
                        user={this.state.user}
                        onLogout={this.handleLogout.bind(this)}
                    />

                    <Switch>
                        <Route exact path="/">
                            <Home 
                                customLocation={this.state.customLocation}
                                userAddedPins={this.state.userAddedPins}
                            />
                        </Route>
                        <Route path="/explore">
                            <Explore />
                        </Route>
                        <Route path="/history">

                        </Route>
                        <Route path="/saved">
                            
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/signup">
                            <Signup />
                        </Route>
                        <Route path="/account">
                            
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ""
        };
    }

    handleSearchChange(event) {
        this.setState({search: event.target.value});
    }

    handleSearchSubmit() {
        console.log(this.state.search);
    }

    handleLogout() {
        this.props.onLogout();
    }

    getUserActions() {
        if (this.props.user.loggedIn) {
            return(
                <div className="login-actions">
                    <LinkContainer to="/account" >
                        <Button variant="success">Account</Button>
                    </LinkContainer>
                    <Button 
                        variant="primary"
                        onClick={this.handleLogout.bind(this)}
                    >Logout</Button>   
                </div>
            );
        } else {
            return(
                <div className="login-actions">
                    <LinkContainer to="/login" >
                        <Button variant="success">Login</Button>
                    </LinkContainer>
                    <LinkContainer to="/signup">
                        <Button variant="primary">Signup</Button>
                    </LinkContainer>  
                </div>
            );
        }
    }

    render() {
        return(
            <Navbar bg="light" expand="lg" className="shadow p-2 bg-body rounded">
                <LinkContainer to="/">
                    <Navbar.Brand>TrekSee</Navbar.Brand>
                </LinkContainer>   
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <LinkContainer to="/explore"><Nav.Link>Explore</Nav.Link></LinkContainer>
                        <LinkContainer to="/history"><Nav.Link>History</Nav.Link></LinkContainer>
                        <LinkContainer to="/saved"><Nav.Link>Saved Treks</Nav.Link></LinkContainer>
                    </Nav>
                    <Form inline className="mr-4">
                        <FormControl 
                            type="text" 
                            placeholder="Search" 
                            className="mr-2 search"
                            value={this.state.search}
                            onChange={this.handleSearchChange.bind(this)}
                            />
                        <Button 
                            variant="outline-success"
                            onClick={this.handleSearchSubmit.bind(this)}
                        >Search</Button>
                    </Form>
    
                    {this.getUserActions()}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default App;