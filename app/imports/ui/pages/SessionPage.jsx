import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router'
import {Programs} from '../../api/program/ProgramCollection'
import {useTracker} from 'meteor/react-meteor-data'
import {Helmet} from 'react-helmet'
import {registeredComponents} from '../../startup/client/registerComponents'
import {Loader, Message} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'

const DelegatedSessionPage = ({componentName, ...restProps}) => {
  const [componentState, setComponentState] = useState({isLoaded: false, component: undefined})
  const componentPath = registeredComponents[componentName]

  const {t} = useTranslation()
  const history = useHistory()

  useEffect(() => {
    if (componentPath) import(componentPath).then(component => setComponentState({isLoaded: true, component}))
  }, [])

  const dismissError = () => history.goBack()
  const error = t('Unregistered Component', {componentName})
  const ShowError = () => (
      error ?
          <Message onDismiss={dismissError} header={t('Error')} content={error}/> :
          <div/>
  )

  return (
      componentPath ?
          (
              componentState.isLoaded ?
                  React.createElement(componentState.component.default, {...restProps}) :
                  <Loader/>
          ) :
          <ShowError/>
  )
}

const SessionPage = () => {
  const {programId, ...restParams} = useParams()
  const programLoading = useTracker(() => !Programs.subscribe(Programs.getChannels().allWithMeta).ready())
  const program = useTracker(() => Programs.findOne(programId))

  return (
      <>
        <Helmet><title>Session Page</title></Helmet>
        {
          programLoading ?
              <Loader/> :
              <DelegatedSessionPage {...restParams} program={program}/>
        }
      </>
  )
}

export default SessionPage
