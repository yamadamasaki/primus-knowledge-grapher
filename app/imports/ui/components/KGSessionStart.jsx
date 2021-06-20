import React, {useState} from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import {SessionSpecs} from '../../api/sessionSpec/SessionSpecCollection'
import {Button, Loader, Message} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import {KGIfIHave} from './KGIfIHave'
import {sessionSpecDefineMethod} from '../../api/sessionSpec/SessionSpecCollections.methods'

const KGSessionStart = ({programId, sessionId, specs, canStart, children}) => {
  const specLoading = useTracker(() => !SessionSpecs.subscribe(SessionSpecs.getChannels().allWithMeta).ready())
  const sessionSpec = useTracker(() => SessionSpecs.findOne({programId, sessionId}))

  const [error, setError] = useState(null)
  const dismissError = () => setError(null)
  const ShowError = () => (
      error ?
          <Message onDismiss={dismissError} header={t('Error')} content={error}/> :
          <div/>
  )

  const {t} = useTranslation()

  const startSession = async () => {
    sessionSpecDefineMethod.call({programId, sessionId, specs}, error => error && setError(error.message))
  }

  return (
      specLoading ? <Loader/> :
          (
              sessionSpec ? children :
                  <div>
                    <KGIfIHave permission={canStart}>
                      <Button onClick={startSession}>{t('Start the Session')}</Button>
                    </KGIfIHave>
                    <ShowError/>
                  </div>
          )
  )
}

export default KGSessionStart
