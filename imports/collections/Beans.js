import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'beans.insert': function(bean) {
    return Beans.insert({
      createdAt: new Date(),
      imageUrl: bean.imageUrl,
      title: bean.title,
      ownerId: this.userId,
      likedBy: bean.likedBy,
    });
  },
  'beans.remove': function(bean) {
    return Beans.remove(bean);
  },
  'bean.like': function(bean){
    const found = bean.likedBy && bean.likedBy.indexOf(this.userId) !== -1;
    if ( found ) return false;
    return Beans.update(bean._id, { $push: { likedBy: this.userId }});
  }
});

export const Beans = new Mongo.Collection('beans');