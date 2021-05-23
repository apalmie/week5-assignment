import '../css/App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import CharacterBio from './CharacterBio';
import SeasonSearch from './seasonSearch';
import HomePage from './homePage';

function NavBar() {
  return (
    <Navbar className="bg-light justify-content-between">
      <Navbar.Brand href="/">STAR TREK APP</Navbar.Brand>
      <Nav
        justify
        variant="tabs"
      >
        <Link to='/seasons'>
          Series
          </Link>
      </Nav>
    </Navbar>
  )
}

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/seasons' component={SeasonSearch} />
          <Route path='/character/:uid' component={CharacterBio} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;