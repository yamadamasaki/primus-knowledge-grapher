import React from 'react'
import {withTracker, useTracker} from 'meteor/react-meteor-data'
import {Assignments} from '../../api/assignment/AssignmentCollection'
import {Menu, Label, Loader, Tab} from 'semantic-ui-react'
import {KGIfIHave} from '../components/KGIfIHave'

const sectionStyle = {
  padding: '1rem 2rem',
  borderLeft: '6px double orange',
  borderRight: '6px double orange',
  margin: '1rem 0rem',
}

const KGTeamsGallerySection = ({documentLoading, document, selector, canRead}) => {
  const panes = [
    {
      menuItem: { key: 'users', icon: 'users', content: 'Users' },
      render: () => <Tab.Pane>Tab 1 Content</Tab.Pane>,
    },
    {
      menuItem: (
          <Menu.Item key='messages'>
            Messages<Label>15</Label>
          </Menu.Item>
      ),
      render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
    },
  ]
  return(
      documentLoading ? <Loader/> : (
          <KGIfIHave permission={canRead}>
            <div style={sectionStyle}>
              <Tab panes={panes} />
            </div>
          </KGIfIHave>
      )
  )
}

export default withTracker(({programId, sessionId, subsession, id, canRead}) => {
  const selector = id || (subsession ? {programId, sessionId, subsession} : {programId, sessionId})
  const documentLoading = !Assignments.subscribe(Assignments.getChannels().allWithMeta).ready()
  const document = Assignments.findOne(selector)

  return {documentLoading, document, selector, canRead}
})(KGTeamsGallerySection)
