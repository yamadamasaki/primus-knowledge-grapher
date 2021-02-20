import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
class Signout extends React.Component {
  render() {
    const { t } = this.props

    Meteor.logout()
    return (
        <Header as="h2" textAlign="center">
          <p>{t('You are signed out')}</p>
        </Header>
    )
  }
}

Signout.propTypes = {
  t: PropTypes.func,
}

export default withTranslation()(Signout)
