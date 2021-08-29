import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'
import {check} from 'meteor/check'
import {Roles} from 'meteor/alanning:roles'
import {Email} from 'meteor/email'
import Invitations from '../invitations'
import PriviledgedRoles from '/imports/api/Users/PriviledgedRoles'

import {createUser} from '/imports/api/wekan/wekan'

import i18n from 'meteor/universe:i18n'

Meteor.methods({
  'invitations.send': function invitationsSend(invitation) {
    check(invitation, {
      emailAddress: String,
      role: String
    })

    if (Roles.userIsInRole(this.userId, PriviledgedRoles)) {
      const {emailAddress} = invitation
      const invitationExists =
        Invitations.findOne({emailAddress}) ||
        Meteor.users.findOne({'emails.address': emailAddress})

      if (!invitationExists) {
        const invitationId = Invitations.insert(invitation)
        const acceptLanguage =
          this.connection.httpHeaders['accept-language'] || 'en-US'
        const locale = i18n.runWithLocale(acceptLanguage, () =>
          i18n.getLocale()
        )
        const href = Meteor.absoluteUrl(`accept/${invitationId}`)
        Meteor.defer(() => {
          Email.send({
            to: emailAddress,
            from: i18n.runWithLocale(locale, () => i18n.__('invitation_from')),
            replyTo: i18n.runWithLocale(locale, () =>
              i18n.__('invitation_reply_to')
            ),
            subject: i18n.runWithLocale(locale, () =>
              i18n.__('invitation_subject')
            ),
            html: i18n.runWithLocale(locale, () =>
              i18n.__('invitation_html', {href})
            )
          })
        })
      } else {
        throw new Meteor.Error(
          '500',
          `Easy, cowpoke. ${emailAddress} has already been invited.`
        )
      }
    } else {
      throw new Meteor.Error(
        '500',
        "Well, shucks! You're not allowed to do that."
      )
    }
  },
  'invitations.accept': function invitationsAccept(userToCreate) {
    check(userToCreate, {
      invitationId: String,
      user: {
        email: String,
        username: String,
        password: Object, // Hash object using Accounts._hashPassword() on client.
        profile: Object
      }
    })

    const invitation = Invitations.findOne(userToCreate.invitationId)
    const userId = Accounts.createUser(userToCreate.user)

    createUser(userToCreate.user)

    if (userId) {
      Roles.addUsersToRoles(userId, invitation.role)
      Invitations.remove(userToCreate.invitationId)
    }

    return userId
  },
  'invitations.revoke': function invitationsRevoke(_id) {
    check(_id, String)
    if (Roles.userIsInRole(this.userId, PriviledgedRoles))
      Invitations.remove(_id)
  }
})
