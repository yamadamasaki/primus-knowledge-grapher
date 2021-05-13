import {SessionSpecs} from '../sessionSpec/SessionSpecCollection'
import {ValidatedMethod} from 'meteor/mdg:validated-method'
import {Meteor} from 'meteor/meteor'
import {check} from 'meteor/check'

export const sessionSpecDefineMethod = new ValidatedMethod({
  name: 'sessionSpecs.define',
  validate: SessionSpecs.getSchema().validator(),
  run: obj => Meteor.isServer ? SessionSpecs.define(obj) : true,
})

export const sessionSpecUpdateMethod = new ValidatedMethod({
  name: 'sessionSpecs.update',
  validate: SessionSpecs.getSchema().validator(),
  run: doc => Meteor.isServer ? SessionSpecs.update(doc._id, doc) : true,
})

export const sessionSpecDeleteMethod = new ValidatedMethod({
  name: 'sessionSpecs.delete',
  validate: args => check(args, String),
  run: id => Meteor.isServer ? SessionSpecs.remove(id) : true,
})
