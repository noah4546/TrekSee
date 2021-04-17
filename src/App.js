import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Button, Nav, Navbar } from 'react-bootstrap';
import Home from './home/Home';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';
import Explore from './explore/Explore';
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

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customLocation: null,
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
                            <Home />
                        </Route>
                        <Route path="/explore">
                            <Explore />
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
                    <Nav className="mr-auto">
                        <LinkContainer to="/explore"><Nav.Link>Explore</Nav.Link></LinkContainer>
                    </Nav>
                    {this.getUserActions()}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default App;