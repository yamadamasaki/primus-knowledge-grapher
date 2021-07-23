import {ReactFlowDiagrams} from './ReactFlowDiagramCollection'
import {ValidatedMethod} from 'meteor/mdg:validated-method'
import {Meteor} from 'meteor/meteor'
import {check} from 'meteor/check'

export const reactFlowDiagramDefineMethod = new ValidatedMethod({
  name: 'reactFlowDiagrams.define',
  validate: ReactFlowDiagrams.getSchema().validator(),
  run: obj => Meteor.isServer ? ReactFlowDiagrams.define(obj) : true,
})

export const reactFlowDiagramUpdateMethod = new ValidatedMethod({
  name: 'reactFlowDiagrams.update',
  validate: ReactFlowDiagrams.getSchema().validator(),
  run: doc => Meteor.isServer ? ReactFlowDiagrams.update(doc._id, doc) : true,
})

export const reactFlowDiagramDeleteMethod = new ValidatedMethod({
  name: 'reactFlowDiagrams.delete',
  validate: args => check(args, String),
  run: id => Meteor.isServer ? ReactFlowDiagrams.remove(id) : true,
})
