import React, { Component } from 'react';
import Accounts from './Accounts';
import { Link, browserHistory } from 'react-router';

class Header extends Component {
   isUserLoggedIn() {
    return Meteor.userId() !== null;
  }
  render() {
    return (
      <nav className="navbar navbar-dark bg-inverse">
        <div className="container">
          <Link to="/" className="navbar-brand">Beanterest</Link>
          <ul className="nav navbar-nav">
            {
              this.isUserLoggedIn()
              ? <li className="nav-item"><Link className="nav-link" to="/mybeans">My beans</Link></li>
              : ''
            }
          </ul>
          <div className="pull-xs-right"><Accounts /></div>
        </div>
      </nav>
    );
  }
}

export default Header;
