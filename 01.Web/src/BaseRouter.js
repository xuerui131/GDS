import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import history from './history';

import CreateTemplate from '../src/Forms/Template/CreateTemplate';
import TemplateList from '../src/Forms/Template/TemplateList';


class BaseRoute extends Component {

    render() {
      return (
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={CreateTemplate}/>
            <Route path="/template/create" component={CreateTemplate}/>          
            <Route path="/template/list" component={TemplateList}/>          
          </Switch>
        </Router>
      );
    }
  }
  
  export default BaseRoute;