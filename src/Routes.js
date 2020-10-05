import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import Menu from './core/Menu';



const Routes = () =>{
  return (
    <BrowserRouter>
      <Menu/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Signin" exact component={Signin} />
        <Route path="/Signup" exact component={Signup} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;


