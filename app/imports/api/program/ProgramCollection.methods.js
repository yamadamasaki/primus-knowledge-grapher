import {Meteor} from 'meteor/meteor'
import {ValidatedMethod} from 'meteor/mdg:validated-method'
import {Programs} from './ProgramCollection'
import {check} from 'meteor/check'

// 基本的なメソッド (define, update, delete) はそれぞれ,
//     server には MongoCollection の insert, update, remove の返値をそのまま返す
//     client には常に true を返す

/**
 * Meteor method used to define new instances of the given collection name.
 * @param collectionName the name of the collection.
 * @param definitionDate the object used in the collection.define method.
 * @memberOf api/base
 */
export const programDefineMethod = new ValidatedMethod({
  name: 'programs.define',
  validate: Programs.getSchema().validator(),
  run: obj => Meteor.isServer ? Programs.define(obj) : true,
})

export const programUpdateMethod = new ValidatedMethod({
  name: 'programs.update',
  validate: Programs.getSchema().validator(),
  run: doc => Meteor.isServer ? Programs.update(doc._id, doc) : true,
})

export const programDeleteMethod = new ValidatedMethod({
  name: 'programs.delete',
  validate: args => check(args, String),
  run: id => Meteor.isServer ? Programs.remove(id) : true,
})
