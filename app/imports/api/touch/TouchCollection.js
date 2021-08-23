import SimpleSchema from 'simpl-schema'
import BaseCollection from '../base/BaseCollection'

const schema = {
  _id: {type: String, optional: true},
  createdAt: {type: Date, optional: true},
  updatedAt: {type: Date, optional: true},
  owner: {type: String, optional: true},

  programId: {type: String, optional: false},
  sessionId: {type: String, optional: false},
  subsession: {type: String, optional: true},

  section: {type: String, optional: true},
}

const channels = {}

const accessibility = {
  _: {
    canRead: ['member'],
    canUpdate: ['member'],
    canCreate: ['member'],
    canDelete: ['member'],
  },
  programId: {
    canRead: ['member'],
    canUpdate: ['admin'],
    canCreate: ['member'],
  },
  sessionId: {
    canRead: ['member'],
    canUpdate: ['admin'],
    canCreate: ['member'],
  },
  subsession: {
    canRead: ['member'],
    canUpdate: ['admin'],
    canCreate: ['member'],
  },
  userId: {
    canRead: ['member'],
    canUpdate: ['admin'],
    canCreate: ['member'],
  },
  section: {
    canRead: ['member'],
    canUpdate: ['admin'],
    canCreate: ['member'],
  },
}

class TouchCollection extends BaseCollection {
  constructor() {
    super('Touches', new SimpleSchema(schema), accessibility, channels)
  }
}

export const Touches = new TouchCollection()
