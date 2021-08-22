import BaseCollection from '../base/BaseCollection'
import SimpleSchema from 'simpl-schema'

// うまく行かない
const messageSchema = {
  who: {type: String, optional: false},
  when: {type: Date, optional: false},
  text: {type: String, optional: false},
}

const schema = {
  _id: {type: String, optional: true},
  createdAt: {type: Date, optional: true},
  updatedAt: {type: Date, optional: true},
  owner: {type: String, optional: true},

  programId: {type: String, optional: false},
  sessionId: {type: String, optional: false},
  subsession: {type: String, optional: true},

  title: {type: String, optional: true},
  messages: {type: Array, optional: true},
  'messages.$': {type: Object, blackbox:true, optional: true},
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
  messages: {
    canRead: ['member'],
    canUpdate: ['member'],
    canCreate: ['member'],
  },
}

class SimpleChatCollection extends BaseCollection {
  constructor() {
    super('SimpleChats', new SimpleSchema(schema), accessibility, channels)
  }
}

export const SimpleChats = new SimpleChatCollection()
