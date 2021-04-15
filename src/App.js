import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import Home from './home/Home';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';
import Explore from './explore/Explore';

class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <Header />

                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/explore">
                            <Explore />
                        </Route>
                        <Route path="/history" />
                        <Route path="/saved" />
                        <Route path="/login" />
                        <Route path="/signup" />
                        <Route path="/account" />
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

    render() {
        return(
            <Navbar bg="light" expand="lg" className="px-5">
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
    
                    <div className="login-actions">
                        <Button variant="success">Login</Button>
                        <Button variant="primary">Signup</Button>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default App;