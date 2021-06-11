import {SyncFusionDiagrams} from './SyncFusionDiagramCollection'
import {ValidatedMethod} from 'meteor/mdg:validated-method'
import {Meteor} from 'meteor/meteor'
import {check} from 'meteor/check'

export const syncfusionDiagramDefineMethod = new ValidatedMethod({
  name: 'syncfusionDiagrams.define',
  validate: SyncFusionDiagrams.getSchema().validator(),
  run: obj => Meteor.isServer ? SyncFusionDiagrams.define(obj) : true,
})

export const syncfusionDiagramUpdateMethod = new ValidatedMethod({
  name: 'syncfusionDiagrams.update',
  validate: SyncFusionDiagrams.getSchema().validator(),
  run: doc => Meteor.isServer ? SyncFusionDiagrams.update(doc._id, doc) : true,
})

export const syncfusionDiagramDeleteMethod = new ValidatedMethod({
  name: 'syncfusionDiagrams.delete',
  validate: args => check(args, String),
  run: id => Meteor.isServer ? SyncFusionDiagrams.remove(id) : true,
})
