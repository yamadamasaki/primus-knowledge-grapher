import {SimpleChats} from './SimpleChatCollection'
import {ValidatedMethod} from 'meteor/mdg:validated-method'
import {Meteor} from 'meteor/meteor'
import {check} from 'meteor/check'

export const simpleChatDefineMethod = new ValidatedMethod({
  name: 'simpleChats.define',
  validate: SimpleChats.getSchema().validator(),
  run: obj => Meteor.isServer ? SimpleChats.define(obj) : true,
})

export const simpleChatUpdateMethod = new ValidatedMethod({
  name: 'simpleChats.update',
  validate: SimpleChats.getSchema().validator(),
  run: doc => Meteor.isServer ? SimpleChats.update(doc._id, doc) : true,
})

export const simpleChatDeleteMethod = new ValidatedMethod({
  name: 'simpleChats.delete',
  validate: args => check(args, String),
  run: id => Meteor.isServer ? SimpleChats.remove(id) : true,
})
