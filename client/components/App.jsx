import React from 'react';
import Header from './Header';
import AddBean from './beans/AddBean';

export default (props) => {
  return (
    <div>
      <Header />
      {
        Meteor.userId() !== null
        ? <AddBean />
        : ''
      }
      {props.children}
    </div>
  )
}