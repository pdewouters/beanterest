import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import RecentBeans from './components/beans/RecentBeans';
import MyBeans from './components/beans/MyBeans';
import UserBeans from './components/beans/UserBeans';

import { Meteor } from 'meteor/meteor';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={RecentBeans} />
      <Route path="/mybeans" component={MyBeans} />
      <Route path="/users/:username" component={UserBeans} />
    </Route>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector('.root'));
});
