import React, {useContext} from 'react'
import {SideBarContext} from '../layouts/App'
import {List, Sidebar} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const children2items = (children, programId) => (
    (children || []).map(item => {
      const children = item.children ? <List.List>{children2items(item.children, programId)}</List.List> : undefined
      const content = <div>{item.name} {children}</div>
      return (
          <List.Item key={item.id}>
            {
              item.componentName ?
                  <Link to={`/sections/${programId}/${item.id}/${item.componentName}`}>{content}</Link> :
                  <div>{content}</div>
            }
          </List.Item>
      )
    })
)

const ProgramIndexMenu = ({program, children: childNodes}) => {
  const children = (program.structure || {}).children
  const {sideBarOpen} = useContext(SideBarContext)

  return (
      <Sidebar.Pushable>
        <Sidebar animation="push" visible={sideBarOpen}>
          <List bulleted>{children2items(children, program._id)}</List>
        </Sidebar>
        <Sidebar.Pusher>
          {childNodes}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
  )
}

export default ProgramIndexMenu
