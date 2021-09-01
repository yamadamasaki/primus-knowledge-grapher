import React from 'react'
import {withTracker} from 'meteor/react-meteor-data'
import {Assignments} from '../../api/assignment/AssignmentCollection'

const KGTeamsSection = () => {
  return (
      <h1>KGTeamsSection</h1>
  )
}

export default withTracker(({programId, sessionId, subsession, id, canRead, canWrite}) => {
  const selector = id || (subsession ? {programId, sessionId, subsession} : {programId, sessionId})
  const documentLoading = !Assignments.subscribe(Assignments.getChannels().allWithMeta).ready()
  const document = Assignments.findOne(selector)

  return {documentLoading, document, selector, canRead, canWrite}
})(KGTeamsSection)
