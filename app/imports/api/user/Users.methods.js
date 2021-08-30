//import Meteor from 'meteor/meteor'

Meteor.methods({
  'users.updateProfile'({userId, profile}) {
    Meteor.users.update(userId, {
      $set: {
        profile
      }
    })
  }
})
