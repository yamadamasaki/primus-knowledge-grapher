import {Meteor} from 'meteor/meteor'
import {Roles} from 'meteor/alanning:roles'

export const isAccessible = (userId, roles) => {
  if (!roles || roles.length === 0) return false
  if (!userId) return !!roles.includes('guest')

  if (roles.includes('member')) return true

  const user = Meteor.users.findOne(userId)
  if (user.isAdmin && roles.includes('admin')) return true

  return Roles.userIsInRole(userId, roles)
}
