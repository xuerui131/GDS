import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import history from './history';

import { LoginHOC } from './Login';
import Main from './Main';
import './api/axiosInterceptors';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path='/login' component={LoginHOC}/>
          <Route path='/app' component={Main}/>
          <Route exact path='/' component={LoginHOC}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
