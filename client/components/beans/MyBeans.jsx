import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Beans } from '../../../imports/collections/Beans';
import BeanGrid from './BeanGrid';

const PER_PAGE = 20;
class MyBeans extends Component {
  isUserLoggedIn() {
    return Meteor.userId !== null;
  }

  handleDelete(beanId) {
    Meteor.call('beans.remove', beanId);
  }

  handleLoadMore() {
    Meteor.subscribe('mybeans', PER_PAGE * (this.page + 1));
    this.page += 1;
  }

  render() {
    return (
      <div>
        <h1>My beans</h1>
        <BeanGrid
          beans={this.props.beans}
          handleLoadMore={this.handleLoadMore}
          handleDelete={this.handleDelete}
          showDelete={true}
          showLike={false}
        />
      </div>
    );
  }
}

export default createContainer(() => {
  const subscription = Meteor.subscribe('mybeans', PER_PAGE);
  const loading = !subscription.ready();
  const beans = Beans.find({}).fetch();
  return { loading, beans };
}, MyBeans);
