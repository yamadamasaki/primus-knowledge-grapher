import {Meteor} from 'meteor/meteor'
import {ValidatedMethod} from 'meteor/mdg:validated-method'
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin'
import {Programs} from './ProgramCollection'
import ProgramForm from '../../ui/components/ProgramForm'

/**
 * Meteor method used to define new instances of the given collection name.
 * @param collectionName the name of the collection.
 * @param definitionDate the object used in the collection.define method.
 * @memberOf api/base
 */
export const programDefineMethod = new ValidatedMethod({
  name: 'programs.define',
  validate: Programs.getSchema().validator(),
  run(obj) {
    if (Meteor.isServer) {
      return  Programs.define(obj)
    }
    return ''
  },
})
