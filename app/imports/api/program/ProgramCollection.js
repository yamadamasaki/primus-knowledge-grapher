import SimpleSchema from 'simpl-schema'
import BaseCollection from '../base/BaseCollection'

const schema = {
  // meta
  _id: {type: String, optional: true},
  createdAt: {type: Date, optional: true},
  updatedAt: {type: Date, optional: true},
  owner: {type: String, optional: true},
  // ortho
  title: String,
  scenarioSchema: {type: String, optional: true},
  structureAsJson: {type: String, optional: true},
  structure: {type: Object, blackbox: true, optional: true},
}

const channels = {}

const accessibility = {
  _: {
    canRead: ['member'],
    canUpdate: ['admin'],
    canCreate: ['admin'],
    canDelete: ['admin'],
  },
  title: {
    canRead: ['member'],
    canUpdate: ['admin'],
    canCreate: ['admin'],
  },
  scenarioSchema: {
    canRead: ['member'],
    canUpdate: [],
    canCreate: ['admin'],
  },
  structure: {
    canRead: ['member'],
    canUpdate: ['admin'],
    canCreate: ['admin'],
  },
  structureAsJson: {
    canRead: ['member'],
    canUpdate: ['admin'],
    canCreate: ['admin'],
  },
}

class ProgramCollection extends BaseCollection {
  constructor() {
    super('Programs', new SimpleSchema(schema), accessibility, channels)
  }

  define(obj) {
    const {structureAsJson, structure} = obj
    if (!structureAsJson && structure) obj.structureAsJson = JSON.stringify(structure)
    if (structureAsJson && !structure) obj.structure = JSON.parse(structureAsJson)
    return super.define(obj)
  }

  update(docID, doc) {
    const {structureAsJson, structure} = doc
    if (!structureAsJson && structure) doc.structureAsJson = JSON.stringify(structure)
    if (structureAsJson && !structure) doc.structure = JSON.parse(structureAsJson)
    return super.update(docID, doc)
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the program associated to an owner.
   */
  publish() {
    super.publish()
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Programs = new ProgramCollection()
