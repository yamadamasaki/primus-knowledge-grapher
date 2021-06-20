import React, {useState} from 'react'
import SyncFusionGeneralDiagram from '../components/SyncFusionGeneralDiagram.jsx'
import {SyncFusionDiagrams} from '../../api/syncfusionDiagram/SyncFusionDiagramCollection'
import {useTracker, withTracker} from 'meteor/react-meteor-data'
import {useTranslation} from 'react-i18next'
import {Loader, Message} from 'semantic-ui-react'
import {
  syncfusionDiagramDefineMethod,
  syncfusionDiagramUpdateMethod,
} from '../../api/syncfusionDiagram/SyncFusionDiagramCollection.methods'
import {Meteor} from 'meteor/meteor'
import {isPermitted} from '../components/KGIfIHave'

const sectionStyle = {
  padding: '1rem 2rem',
  borderLeft: '6px double orange',
  borderRight: '6px double orange',
  margin: '1rem 0rem',
  height: '1000px',
}

const KGGeneralDiagramSection = ({documentLoading, document, selector, canRead, canWrite}) => {
  const currentUser = useTracker(() => Meteor.user())

  const {t} = useTranslation()

  if (!isPermitted(currentUser, canRead))
    return <Message color="yellow">{t('This section is not published')}</Message>

  const [error, setError] = useState(null)
  const dismissError = () => setError(null)
  const ShowError = () => error ? <Message onDismiss={dismissError} header={t('Error')} content={error}/> : <div/>

  const [success, setSuccess] = useState(null)
  const dismissSuccess = () => setSuccess(null)
  const ShowSuccess = () => success ? <Message color="green" onDismiss={dismissSuccess}>{success}</Message> : <div/>

  const onError = error => {
    if (error) {
      setError(<div>{error.message}</div>)
      setSuccess(null)
    } else {
      setSuccess(<div>{t('Success')}</div>)
      setError(null)
    }
  }

  const save = diagram => {
    !document || !document._id ?
        syncfusionDiagramDefineMethod.call({...selector, syncfusionDiagram: diagram}, onError) :
        syncfusionDiagramUpdateMethod.call({_id: document._id, ...selector, syncfusionDiagram: diagram}, onError)
  }

  return (
      documentLoading ? <Loader/> : (
          <div style={sectionStyle}>
            <SyncFusionGeneralDiagram diagram={(document || {}).syncfusionDiagram} canWrite={canWrite} save={save}/>
            <ShowError/>
            <ShowSuccess/>
          </div>
      )
  )
}

export default withTracker(({programId, sessionId, subsession, id, canRead, canWrite}) => {
  const selector = id || (subsession ? {programId, sessionId, subsession} : {programId, sessionId})
  const documentLoading = !SyncFusionDiagrams.subscribe(SyncFusionDiagrams.getChannels().allWithMeta).ready()
  const document = SyncFusionDiagrams.findOne(selector)

  return {documentLoading, document, selector, canRead, canWrite}
})(KGGeneralDiagramSection)
