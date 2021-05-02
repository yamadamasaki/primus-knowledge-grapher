import SimpleSchema from 'simpl-schema'

const session = {
  name: String,
  id: String,
  componentName: {
    type: String,
    allowedValues: ['CFPrepSession', 'CFSyncSession', 'CFAsyncSession', 'CFFollowupSession'],
  },
  nodeLabels: {type: Array, optional: true},
  'nodeLabels.$': {type: String, optional: true},
  edgeLabels: {type: Array, optional: true},
  'edgeLabels.$': {type: String, optional: true},
  type: {
    type: String,
    allowedValues: ['association', 'abstraction'],
    optional: true,
  },
}

// javascript, simple-schema の制約により, セッションのネストは最大 5 レベルとする
const sessionLevel5 = new SimpleSchema({
  ...session,
})

const sessionLevel4 = new SimpleSchema({
  ...session,
  children: {type: Array, optional: true},
  'children.$': sessionLevel5,
})

const sessionLevel3 = new SimpleSchema({
  ...session,
  children: {type: Array, optional: true},
  'children.$': sessionLevel4,
})

const sessionLevel2 = new SimpleSchema({
  ...session,
  children: {type: Array, optional: true},
  'children.$': sessionLevel3,
})

const sessionLevel1 = new SimpleSchema({
  ...session,
  children: {type: Array, optional: true},
  'children.$': sessionLevel2,
})

const schema = new SimpleSchema({
  indexComponent: {type: String, allowedValues:['/imports/ui/copernicusForum/CFHomePage']},
  title: String,
  subtitle: {type: String, optional: true},
  fromDate: {type: String, optional: true},
  toDate: {type: String, optional: true},
  organization: {type: String, optional: true},
  children: {type: Array, optional: true},
  'children.$': sessionLevel1,
})

export default schema
