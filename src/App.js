import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Create, Home } from './views/index.js';
// import Create from './views/Create.js';
import { Navbar, Nav, NavItem, } from 'react-bootstrap';

const Users  = () => <h2>Users</h2>;
const FriendWall  = () => <h2>FriendWall</h2>;

const App = () => (
  <Router>
    <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/home">Home</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem href="/create">
            create
          </NavItem>
          <NavItem>
            View Others
          </NavItem>
        </Nav>
      </Navbar>
      <Route path="/home" exact component={Home} />
      <Route path="/create/" component={Create} />
      <Route path="/users/" component={Users} />
    </div>
  </Router>
);


export default App;
