import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

class BeanGrid extends Component {
  renderThumbnail(bean) {
    let screenName = '', user = {};
    if ( !this.props.loading ) {
      user = this.props.users.find((u) => u._id === bean.ownerId);
     if ( user ) {
       screenName = user.services.twitter.screenName || 'deleted';
     }
    }
    
    return (
      <div key={bean._id} className="card">
          <img className="card-img-top" src={bean.imageUrl} alt={bean.title} />
          <div className="card-block">
            <h3 className="card-title">{bean.title}</h3>
            <p className="card-text">
            <Link to={{pathname: `/users/${screenName}`}}>{screenName}</Link>
            </p>
            {
              this.props.showDelete
              ? <input className="btn btn-danger" type="button" value="Delete" onClick={(beanId) => this.handleDelete(bean._id)} />
              : null
            }
            {
              this.props.showLike
              ? <input className="btn btn-secondary" type="button" value="❤" onClick={(beanId) => this.handleLike(bean._id)} />
              : null
            }
          </div>
      </div>
    );
  }

  handleDelete(beanId) {
    this.props.handleDelete(beanId);
  }

  handleButtonClick() {
    this.props.handleLoadMore();
  }

  render() {
    const cards = this.props.beans.map((bean) => this.renderThumbnail(bean));
    return (
      <div>
        <div className="row">
        <div className=" card-columns">
            {cards}
            </div>
        </div>
        <div className="row">
          <button
            onClick={this.handleButtonClick}
            className="btn btn-primary"
          >
              Load more...
          </button>
        </div>
      </div>
    );
  }
}

BeanGrid.propTypes = {
  showDelete: PropTypes.bool.isRequired,
  showLike: PropTypes.bool.isRequired,
  handleButtonClick: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('allUsers');
  const loading = !subscription.ready();
  const users = Meteor.users.find({}).fetch();
  return { loading, users };
}, BeanGrid);
