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
import UserActions from './APIs/UserActions';

const overrideLoggedIn = false;
const overrideUser = {
    loggedIn: true,
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    created: null
};

// Set to null to not override
/*const overrideCustomLocation = {
    lat: 43.335866,
    lng: -79.82493
}*/
const overrideCustomLocation = null;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customLocation: null,
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
        if (overrideLoggedIn) {
            this.setState({user: overrideUser});
        } else {
            let user = await UserActions.getUser();
            this.setState({user: user});
            console.log(user);
        }  

        if (overrideCustomLocation !== null) {
            this.setState({customLocation: overrideCustomLocation});
        }
    }

    async handleLogout() {
        UserActions.logout();

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
    handleLogout() {
        this.props.onLogout();
    }

    getLocations() {
        if (this.props.user.loggedIn) {
            return(
                <Nav className="mr-auto">
                    <LinkContainer to="/explore"><Nav.Link>Explore</Nav.Link></LinkContainer>
                    <LinkContainer to="/history"><Nav.Link>History</Nav.Link></LinkContainer>
                    <LinkContainer to="/saved"><Nav.Link>Saved Treks</Nav.Link></LinkContainer>
                </Nav>
            );
        } else {
            return(
                <Nav className="mr-auto">
                    <LinkContainer to="/explore"><Nav.Link>Explore</Nav.Link></LinkContainer>
                </Nav>
            );
        }
    }

    getUserActions() {
        if (this.props.user.loggedIn) {
            return(
                <div className="login-actions">
                    <div className="user mr-2">
                        <p>Welcome</p>
                        <p>{this.props.user.firstName} {this.props.user.lastName}</p>
                    </div>
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
                <Navbar.Collapse className="header-items">
                    {this.getLocations()}
                    {this.getUserActions()}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default App;