import React, {useContext} from 'react'
import {SideBarContext} from '../layouts/App'
import {Icon, Menu, Sidebar} from 'semantic-ui-react'

const ProgramIndexMenu = ({program, children}) => {
  const {sideBarOpen} = useContext(SideBarContext)

  return (
      <Sidebar.Pushable>
        <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            vertical
            visible={sideBarOpen}
            width='thin'
        >
          <Menu.Item as='a'>
            <Icon name='home' />
            Home
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='gamepad' />
            Games
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='camera' />
            Channels
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
  )
}

export default ProgramIndexMenu
