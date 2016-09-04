import { Meteor } from 'meteor/meteor';
import { Beans } from '../imports/collections/Beans';
import { Accounts } from 'meteor/accounts-base'

Meteor.startup(() => {
  Meteor.publish('recentbeans', function(perPage) {
    return Beans.find({}, { limit: perPage });
  });

  Meteor.publish('mybeans', function(perPage) {
    return Beans.find({ ownerId: this.userId }, { limit: perPage });
  });

  Meteor.publish('userbeans', function(perPage, userName) {
    const user = Meteor.users.findOne({'services.twitter.screenName': userName});
    if(!user) { return; }
    return Beans.find({ownerId: user._id}, {limit: perPage});
  });

  Meteor.publish("allUsers", function () {
    return Meteor.users.find({}, {fields: {'services.twitter.screenName':1}});
  });
});
Meteor.users.deny({
  update: function() {
    return true;
  }
});