import BaseCollection from '../base/BaseCollection'
import SimpleSchema from 'simpl-schema'

const schema = {
  _id: {type: String, optional: true},
  createdAt: {type: Date, optional: true},
  updatedAt: {type: Date, optional: true},
  owner: {type: String, optional: true},

  programId: {type: String, optional: false},
  sessionId: {type: String, optional: false},
  subsession: {type: String, optional: true},

  title: {type: String, optional: true},
  draftText: {type: String, optional: true},
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
  title: {
    canRead: ['member'],
    canUpdate: ['member'],
    canCreate: ['member'],
  },
  draftText: {
    canRead: ['member'],
    canUpdate: ['member'],
    canCreate: ['member'],
  },
}

class DraftTextCollection extends BaseCollection {
  constructor() {
    super('DraftTexts', new SimpleSchema(schema), accessibility, channels)
  }
}

export const DraftTexts = new DraftTextCollection()
