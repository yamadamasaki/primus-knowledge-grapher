import {Meteor} from 'meteor/meteor'
import {Roles} from 'meteor/alanning:roles'

const defaultRoles = ['root', 'admin', 'user'] // This could be tied to its own admin :)
const roleNames = Roles.getAllRoles()
  .fetch()
  .map(it => it.name)

defaultRoles
  .filter(it => !roleNames.includes(it))
  .forEach(it => Roles.createRole(it))
