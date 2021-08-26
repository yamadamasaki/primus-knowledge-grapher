import React from 'react'
import {Header} from 'semantic-ui-react'
import {withTranslation} from 'react-i18next'
import PropTypes from 'prop-types'

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class NotFound extends React.Component {
  render() {
    const {t} = this.props

    return (
        <Header as="h2" textAlign="center">
          <p>{t('Page not found')}</p>
        </Header>
    )
  }
}

NotFound.propTypes = {
  t: PropTypes.func,
}

export default withTranslation()(NotFound)
