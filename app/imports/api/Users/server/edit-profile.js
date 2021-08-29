/* eslint-disable consistent-return */

import _ from 'lodash'
import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'

let action

const updateUser = (userId, {emailAddress, username, profile}) => {
  try {
    const currentProfile = Meteor.users.findOne({_id: userId})
    const currentEmail = _.get(currentProfile, 'emails.0.address', '')
    const currentUsername = currentProfile.username

    if (currentEmail.toLowerCase() !== emailAddress.toLowerCase()) {
      Accounts.addEmail(userId, emailAddress)
      Accounts.removeEmail(userId, currentEmail)
    }

    if (!currentUsername || currentUsername.toLowerCase() !== username.toLowerCase()) {
      Accounts.setUsername(userId, username)
    }

    Meteor.users.update(userId, {
      $set: {
        profile
      }
    })
  } catch (exception) {
    throw new Error(`[editProfile.updateUser] ${exception.message}`)
  }
}

const editProfile = ({userId, profile}, promise) => {
  try {
    action = promise
    updateUser(userId, profile)
    action.resolve()
  } catch (exception) {
    action.reject(exception.message)
  }
}

export default options =>
  new Promise((resolve, reject) => editProfile(options, {resolve, reject}))
