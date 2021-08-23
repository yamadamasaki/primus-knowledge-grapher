import {Touches} from './TouchCollection'
import {ValidatedMethod} from 'meteor/mdg:validated-method'
import {Meteor} from 'meteor/meteor'
import {check} from 'meteor/check'

export const touchDefineMethod = new ValidatedMethod({
  name: 'touches.define',
  validate: Touches.getSchema().validator(),
  run: obj => Meteor.isServer ? Touches.define(obj) : true,
})

export const touchUpdateMethod = new ValidatedMethod({
  name: 'touches.update',
  validate: Touches.getSchema().validator(),
  run: doc => Meteor.isServer ? Touches.update(doc._id, doc) : true,
})

// ToDo: Use CappedCollection on db.createCollection()
// touchDeleteMethod does not exists
