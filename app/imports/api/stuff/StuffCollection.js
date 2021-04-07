import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'
import { check } from 'meteor/check'
import { _ } from 'meteor/underscore'
import { Roles } from 'meteor/alanning:roles'
import BaseCollection from '../base/BaseCollection'

export const stuffConditions = ['excellent', 'good', 'fair', 'poor']
export const stuffPublications = {
  stuff: 'Stuff',
  stuffAdmin: 'StuffAdmin',
}

class StuffCollection extends BaseCollection {
  constructor() {
    super('Stuffs', new SimpleSchema({
      name: String,
      quantity: Number,
      owner: String,
      condition: {
        type: String,
        allowedValues: stuffConditions,
        defaultValue: 'good',
      },
    }))
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name)
    check(doc, Object)
    this._collection.remove(doc._id)
    return true
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the StuffCollection instance.
      const instance = this
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(stuffPublications.stuff, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username
          return instance._collection.find({ owner: username })
        }
        return this.ready()
      })

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(stuffPublications.stuffAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
          return instance._collection.find()
        }
        return this.ready()
      })
    }
  }

  /**
   * Subscription method for stuff owned by the current user.
   */
  subscribeStuff() {
    if (Meteor.isClient) {
      return Meteor.subscribe(stuffPublications.stuff)
    }
    return null
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeStuffAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(stuffPublications.stuffAdmin)
    }
    return null
  }

}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Stuffs = new StuffCollection()
