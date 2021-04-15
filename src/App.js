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
                        <Route exact path="/explore">
                            <Explore />
                        </Route>
                        <Route exact path="/history">
                            
                        </Route>
                        <Route exact path="/saved">
                            
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

function Header() {
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
                    <FormControl type="text" placeholder="Search" className="mr-2 search"/>
                    <Button variant="outline-success">Search</Button>
                </Form>

                <div className="login-actions">
                    <Button variant="success">Login</Button>
                    <Button variant="primary">Signup</Button>
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default App;