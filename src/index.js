import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavbarBrand } from 'react-bootstrap';
import About from './Components/About';

const Root = () =>
    <Router>
        <div>
            <Navbar inverse>
                <Navbar.Header>
                    <NavbarBrand>
                        <Link to="/">Home</Link>
                    </NavbarBrand>

                    <Navbar.Toggle/>
                </Navbar.Header>

                <Navbar.Collapse>
                    <Nav>
                        <NavItem>
                            <NavLink to="/about">About</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>


            <Route exact path='/' component={App} />
            <Route exact path='/about' component={About} />
        </div>
    </Router>

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
