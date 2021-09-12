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

const KGTeamsGallerySection = ({documentLoading, document, selector, canRead, sectionComponents}) => {
  console.log({documentLoading, document, selector, canRead, sectionComponents})
  const documentToPanes = teams => teams?.map(team => {
    const canTeamWrite = {users: team.members}
    return ({
      menuItem: {key: team.teamId, icon: 'users', content: team.name},
      render: () =>
          <Tab.Pane>
            <KGSimpleChatButton {...selector} canWrite={canTeamWrite} canRead={canTeamRead}/>
            {
              Object.entries(sectionComponents).map(([key, value]) => {
                React.createElement(key, {...selector, canWrite: canTeamWrite, canRead: canTeamRead, ...value})
              })
            }
          </Tab.Pane>,
    })
  })

  return (
      documentLoading ? <Loader/> : (
          <KGIfIHave permission={canRead}>
            <div style={sectionStyle}>
              <Tab panes={documentToPanes(document?.teams)}/>
            </div>
          </KGIfIHave>
      )
  )
}

export default withTracker(({programId, sessionId, subsession, id, canRead, assignmentName, sectionComponents}) => {
  console.log({programId, sessionId, subsession, id, canRead, assignmentName, sectionComponents})
  const selector = id || (subsession ? {programId, sessionId, subsession} : {programId, sessionId})
  const documentLoading = !Assignments.subscribe(Assignments.getChannels().allWithMeta).ready()
  const document = Assignments.findOne({programId, sessionId, subsession: assignmentName})

  return {documentLoading, document, selector, canRead, sectionComponents}
})(KGTeamsGallerySection)

/*
            <KGDraftTextSection {...selector} canWrite={canTeamWrite} canRead={canTeamRead}/>
            <KGGeneralDiagramSection {...selector} canWrite={canTeamWrite} canRead={canTeamRead}/>

 */
