import React from 'react'
import {isAccessible} from '../../api/user/UserId'
import {Meteor} from 'meteor/meteor'
import {useTracker} from 'meteor/react-meteor-data'

export const isPermitted = ({_id}, permission) =>
    !permission || // permission がなければ任意アクセス可
    isAccessible(_id, permission.groups) ||
    (permission.users || {}).some(it => it === _id)

const KGIfIHave = ({permission, children}) => {
  const currentUser = useTracker(() => Meteor.user())
  return currentUser && isPermitted(currentUser, permission) ?
      <div>
        {children}
      </div> : <div/>
}

export default KGIfIHave
