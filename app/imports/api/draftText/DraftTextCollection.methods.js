import {DraftTexts} from '../draftText/DraftTextCollection'
import {ValidatedMethod} from 'meteor/mdg:validated-method'
import {Meteor} from 'meteor/meteor'
import {check} from 'meteor/check'

export const draftTextDefineMethod = new ValidatedMethod({
  name: 'draftTexts.define',
  validate: DraftTexts.getSchema().validator(),
  run: obj => Meteor.isServer ? DraftTexts.define(obj) : true,
})

export const draftTextUpdateMethod = new ValidatedMethod({
  name: 'draftTexts.update',
  validate: DraftTexts.getSchema().validator(),
  run: doc => Meteor.isServer ? DraftTexts.update(doc._id, doc) : true,
})

export const draftTextDeleteMethod = new ValidatedMethod({
  name: 'draftTexts.delete',
  validate: args => check(args, String),
  run: id => Meteor.isServer ? DraftTexts.remove(id) : true,
})
