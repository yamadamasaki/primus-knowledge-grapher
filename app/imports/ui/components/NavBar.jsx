import React from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { NavLink, withRouter } from 'react-router-dom'
import { Dropdown, Header, Menu } from 'semantic-ui-react'
import { Roles } from 'meteor/alanning:roles'
import { withTranslation } from 'react-i18next'

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const { t, currentUser } = this.props
    const { applicationName, selfRegistration } = Meteor.settings.public
    const menuStyle = { marginBottom: '10px' }
    return (
        <Menu style={menuStyle} attached="top" borderless inverted>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header inverted as='h1'>{applicationName}</Header>
          </Menu.Item>
         {currentUser ? (
             <Menu.Item>
               <Dropdown text='Stuff'>
                 <Dropdown.Menu>
                   <Dropdown.Item text='add' as={NavLink} exact to="/add"/>
                   <Dropdown.Item text='list' as={NavLink} exact to="/list"/>
                 </Dropdown.Menu>
               </Dropdown>
             </Menu.Item>
         ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/users" key='users'>{t('Users')}</Menu.Item>,
          ]) : ''}
          <Menu.Item position="right">
            {currentUser === '' ? (
                <Dropdown text={t('Login')} pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="user" text={t('Sign In')} as={NavLink} exact to="/signin"/>
                    <Dropdown.Item icon="add user" text={t('Sign Up')} as={NavLink} exact to="/signup"
                                   disabled={selfRegistration !== true}/>
                  </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Dropdown text={currentUser} pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="sign out" text={t('Sign Out')} as={NavLink} exact to="/signout"/>
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Menu.Item>
        </Menu>
    )
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
  t: PropTypes.func,
}

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(withTranslation()(NavBar))

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer)
