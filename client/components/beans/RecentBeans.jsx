import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Beans } from '../../../imports/collections/Beans';
import BeanGrid from './BeanGrid';

const PER_PAGE = 20;
class RecentBeans extends Component {
  isUserLoggedIn() {
    return Meteor.userId !== null;
  }

  handleLoadMore() {
    Meteor.subscribe('recentbeans', PER_PAGE * (this.page + 1));
    this.page += 1;
  }

  render() {
    return (
      <div className="row">
        <h1>Recent beans</h1>
        <BeanGrid
        beans={this.props.beans}
        handleLoadMore={this.handleLoadMore}
        showDelete={false}
        showLike={true}
        />
      </div>
    );
  }
}

export default createContainer(() => {
  const subscription = Meteor.subscribe('recentbeans', PER_PAGE);
  const loading = !subscription.ready();
  const beans = Beans.find({}).fetch();
  return { loading, beans };
}, RecentBeans);
