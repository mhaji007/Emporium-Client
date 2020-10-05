import React from 'react';
// withRouter to access props history (e.g., /home, /about)
import {Link, withRouter} from 'react-router-dom';

const isActive = (history, path) => {
  // if the browser's history location matches
  // the path that is sent in mark link
  // as active
  if(history.location.pathname === path) {
    return {color: '#ff9900'};
  } else {
    return {color: '#ffffff'};
  }
}
// history props comes from react-router-dom
// through withRouter
 const Menu = ({history}) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, '/')} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
            Signin
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
            Signup
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Menu);
