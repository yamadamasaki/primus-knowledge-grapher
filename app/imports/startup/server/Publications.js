import {Meteor} from 'meteor/meteor'
import {Stuffs} from '../../api/stuff/StuffCollection'
import {Programs} from '../../api/program/ProgramCollection'

/** Publish all the collections you need. */
Stuffs.publish()
Programs.publish()

/** Need this for the alanning:roles package */
Meteor.publish(null, function() {
  if (this.userId) {
    return Meteor.roleAssignment.find({'user._id': this.userId})
  }
  return this.ready()
})
