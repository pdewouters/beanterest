import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Beans } from '../../../imports/collections/Beans';
import BeanGrid from './BeanGrid';
import { withRouter } from 'react-router';

const PER_PAGE = 20;
class UserBeans extends Component {
  isUserLoggedIn() {
    return Meteor.userId !== null;
  }

  handleLoadMore() {
    Meteor.subscribe('allbeans', PER_PAGE * (this.page + 1));
    this.page += 1;
  }

  render() {
    return (
      <div>
        <h1>{this.props.params.username} beans</h1>
        <BeanGrid beans={this.props.beans} handleLoadMore={this.handleLoadMore} showDelete={false} showLike={true} />
      </div>
    );
  }
}

export default createContainer((props) => {
  const { username } = props.params;
  const subscription = Meteor.subscribe('userbeans', PER_PAGE, username);
  const loading = subscription.ready();
  const beans = Beans.find({}).fetch()
  return { loading, beans };
}, withRouter(UserBeans));
