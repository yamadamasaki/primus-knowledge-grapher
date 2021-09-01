import React from 'react'
import {useParams} from 'react-router'
import {SessionSpecs} from '../../api/sessionSpec/SessionSpecCollection'
import {Programs} from '../../api/program/ProgramCollection'
import {useTranslation} from 'react-i18next'
import {Loader, Message} from 'semantic-ui-react'
import {useTracker} from 'meteor/react-meteor-data'
import {Helmet} from 'react-helmet'
import ProgramIndexMenu from '../components/ProgramIndexMenu'
import KGBreadCrumbs from '../components/KGBreadCrumbs'
import KGSessionHeader from '../components/KGSessionHeader'
import KGSectionMenu from '../components/KGSectionMenu'
import KGSectionHeader from '../components/KGSectionHeader'
import JumpMVEDiagramSection from '../sections/JumpMVEDiagramSection'

const JumpMVESubsession = () => {
  const params = useParams()
  const {programId, sessionId, subsessionName: subsession} = params

  const sessionSpecLoading = useTracker(() => !SessionSpecs.subscribe(SessionSpecs.getChannels().allWithMeta).ready())
  const sessionSpec = useTracker(() => SessionSpecs.findOne({programId, sessionId}))
  const programLoading = useTracker(() => !Programs.subscribe(Programs.getChannels().allWithMeta).ready())
  const program = useTracker(() => Programs.findOne(programId))

  const {t} = useTranslation()

  const dismissError = () => history.goBack()
  const ShowError = () => (
      error && (
          <Message onDismiss={dismissError} header={t('Error')}
                   content={t('Unregistered Component', {componentName})}/>
      )
  )

  const mySpec = (sessionSpec && sessionSpec.specs[subsession]) || {}
  const {sessionName, sessionComponentName, subsessions} = (sessionSpec && sessionSpec.specs) || {}
  const {subsessionName, canRead, canWrite} = mySpec // ToDo

  return (
      <>
        {
          sessionSpecLoading || programLoading ? <Loader/> :
              mySpec ? (
                  <>
                    <Helmet><title>{`${sessionName} - $subsessionName}`}</title></Helmet>
                    <ProgramIndexMenu program={program}>
                      <div style={{/*height: '100vh'*/}}>
                        <KGBreadCrumbs {...params} program={program} sessionName={sessionName}
                                       sessionComponent={sessionComponentName}/>
                        <KGSessionHeader sessionName={sessionName}/>
                        <KGSectionMenu subsessions={subsessions}/>
                        <KGSectionHeader sectionName={subsessionName}/>
                        <JumpMVEDiagramSection {...params} canRead={canRead} canWrite={canWrite}/>
                      </div>
                    </ProgramIndexMenu>
                  </>
              ) : <ShowError/>
        }
      </>
  )
}

export default JumpMVESubsession
