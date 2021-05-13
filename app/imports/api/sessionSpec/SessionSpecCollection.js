import SimpleSchema from 'simpl-schema'
import BaseCollection from '../base/BaseCollection'

const schema = {
  _id: {type: String, optional: true},
  createdAt: {type: Date, optional: true},
  updatedAt: {type: Date, optional: true},
  owner: {type: String, optional: true},

  programId: {type: String, optional: false},
  sessionId: {type: String, optional: false},
  specs: {type: Object, blackbox: true, optional: true},
}

const channels = {}

const accessibility = {
  _: {
    canRead: ['member'],
    canUpdate: ['admin'],
    canCreate: ['admin'],
    canDelete: ['admin'],
  },
  programId: {
    canRead: ['member'],
    canUpdate: ['admin'],
    canCreate: ['admin'],
  },
  sessionId: {
    canRead: ['member'],
    canUpdate: ['admin'],
    canCreate: ['admin'],
  },
  specs: {
    canRead: ['member'],
    canUpdate: ['admin'],
    canCreate: ['admin'],
  },
}

class SessionSpecCollection extends BaseCollection {
  constructor() {
    super('SessionSpecs', new SimpleSchema(schema), accessibility, channels)
  }

  define(obj) {
    return super.define(obj)
  }

  update(docID, doc) {
    return super.update(docID, doc)
  }

  publish() {
    super.publish()
  }
}

export const SessionSpecs = new SessionSpecCollection()
