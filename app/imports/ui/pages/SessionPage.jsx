import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router'
import {registeredComponents} from '../../startup/client/registerComponents'
import {Loader, Message} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'

const SessionPage = () => {
  const {componentName, ...restParams} = useParams()

  const [componentState, setComponentState] = useState({isLoaded: false, component: undefined})
  const componentPath = registeredComponents[componentName]

  const {t} = useTranslation()
  const history = useHistory()

  useEffect(() => {
    if (componentPath) import(componentPath).then(component => setComponentState({isLoaded: true, component}))
  }, [componentName])

  const dismissError = () => history.goBack()
  const error = t('Unregistered Component', {componentName})
  const ShowError = () => (
      error ?
          <Message onDismiss={dismissError} header={t('Error')} content={error}/> :
          <div/>
  )

  return (
      componentPath ?
          (componentState.isLoaded ?
              React.createElement(componentState.component.default, {...restParams}) :
              <Loader/>) :
          <ShowError/>
  )
}

export default SessionPage
