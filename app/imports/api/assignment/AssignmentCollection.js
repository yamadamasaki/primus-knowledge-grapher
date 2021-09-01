import BaseCollection from '../base/BaseCollection'
import SimpleSchema from 'simpl-schema'

const teamSchema = new SimpleSchema({
  name: {type: String, optional: true},
  members: {type: Array, optional: true},
  'members.$': {type: String, optional: false}, // userId
  teamId: {type: String, optional: false},
  status: {type: String, optional: true},
})

const schema = new SimpleSchema({
  _id: {type: String, optional: true},
  createdAt: {type: Date, optional: true},
  updatedAt: {type: Date, optional: true},
  owner: {type: String, optional: true},

  programId: {type: String, optional: false},
  sessionId: {type: String, optional: false},
  subsession: {type: String, optional: true},

  title: {type: String, optional: true},
  teams: {type: Array, optional: true},
  'teams.$': {type: teamSchema, optional: true},
})

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
  teams: {
    canRead: ['member'],
    canUpdate: ['member'],
    canCreate: ['member'],
  },
}

class AssignmentCollection extends BaseCollection {
  constructor() {
    super('Assignments', new SimpleSchema(schema), accessibility, channels)
  }
}

export const Assignments = new AssignmentCollection()
