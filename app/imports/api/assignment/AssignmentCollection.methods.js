import {Assignments} from './AssignmentCollection'
import {ValidatedMethod} from 'meteor/mdg:validated-method'
import {Meteor} from 'meteor/meteor'
import {check} from 'meteor/check'

export const assignmentDefineMethod = new ValidatedMethod({
  name: 'assignments.define',
  validate: Assignments.getSchema().validator(),
  run: obj => Meteor.isServer ? Assignments.define(obj) : true,
})

export const assignmentUpdateMethod = new ValidatedMethod({
  name: 'assignments.update',
  validate: Assignments.getSchema().validator(),
  run: doc => Meteor.isServer ? Assignments.update(doc._id, doc) : true,
})

export const assignmentDeleteMethod = new ValidatedMethod({
  name: 'assignments.delete',
  validate: args => check(args, String),
  run: id => Meteor.isServer ? Assignments.remove(id) : true,
})
