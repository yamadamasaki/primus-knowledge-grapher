import React from 'react'
import {withTracker} from 'meteor/react-meteor-data'
import {Assignments} from '../../api/assignment/AssignmentCollection'
import {Loader, Tab} from 'semantic-ui-react'
import {KGIfIHave} from '../components/KGIfIHave'
import KGSimpleChatButton from '../components/KGSimpleChatButton'
import KGDraftTextSection from './KGDraftTextSection'
import KGGeneralDiagramSection from './KGGeneralDiagramSection'

const sectionStyle = {
  padding: '1rem 2rem',
  borderLeft: '6px double orange',
  borderRight: '6px double orange',
  margin: '1rem 0rem',
}

const canTeamRead = {groups: ['member']}

const KGTeamsGallerySection = ({documentLoading, document, selector, canRead, sectionComponentName}) => {
  const documentToPanes = teams => teams.map(team => {
    const canTeamWrite = {users: team.members}
    return ({
      menuItem: {key: team.teamId, icon: 'users', content: team.name},
      render: () =>
          <Tab.Pane>
            <KGSimpleChatButton {...selector} canWrite={canTeamWrite} canRead={canTeamRead}/>
            <KGDraftTextSection {...selector} canWrite={canTeamWrite} canRead={canTeamRead}/>
            <KGGeneralDiagramSection {...selector} canWrite={canTeamWrite} canRead={canTeamRead}/>
          </Tab.Pane>,
    })
  })

  return (
      documentLoading ? <Loader/> : (
          <KGIfIHave permission={canRead}>
            <div style={sectionStyle}>
              <Tab panes={documentToPanes(document.teams)}/>
            </div>
          </KGIfIHave>
      )
  )
}

export default withTracker(({programId, sessionId, subsession, id, canRead, assignmentName, sectionComponentName}) => {
  const selector = id || (subsession ? {programId, sessionId, subsession} : {programId, sessionId})
  const documentLoading = !Assignments.subscribe(Assignments.getChannels().allWithMeta).ready()
  const document = Assignments.findOne({programId, sessionId, assignmentName})

  return {documentLoading, document, selector, canRead, sectionComponentName}
})(KGTeamsGallerySection)
