import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'beans.insert': function(bean) {
    return Beans.insert({
      createdAt: new Date(),
      imageUrl: bean.imageUrl,
      title: bean.title,
      ownerId: this.userId,
    });
  },
  'beans.remove': function(bean) {
    return Beans.remove(bean);
  }
});

export const Beans = new Mongo.Collection('beans');