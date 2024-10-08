import React from 'react'
import {useParams} from 'react-router'
import {SessionSpecs} from '../../api/sessionSpec/SessionSpecCollection'
import {useTracker} from 'meteor/react-meteor-data'
import {useTranslation} from 'react-i18next'
import {Loader, Message} from 'semantic-ui-react'
import {Helmet} from 'react-helmet'
import KGBreadCrumbs from '../components/KGBreadCrumbs'
import KGSessionHeader from '../components/KGSessionHeader'
import KGSectionMenu from '../components/KGSectionMenu'
import KGSectionHeader from '../components/KGSectionHeader'
import {Programs} from '../../api/program/ProgramCollection'
import KGDraftTextSection from '../sections/KGDraftTextSection'
import KGGeneralDiagramSection from '../sections/KGGeneralDiagramSection'
import ProgramIndexMenu from '../components/ProgramIndexMenu'
import KGSimpleChatButton from '../components/KGSimpleChatButton'

const KGTextAndDiagramSubsession = () => {
  const params = useParams()
  const {programId, sessionId, subsessionName: subsession} = params
  params.subsession = subsession

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
  const {subsessionName, canReadText, canWriteText, canReadDiagram, canWriteDiagram} = mySpec
  const canComment = {groups: ['member']}

  return (
      <>
        {
          sessionSpecLoading || programLoading ? <Loader/> :
              mySpec ? (
                  <>
                    <Helmet><title>{`${sessionName} - ${subsessionName}`}</title></Helmet>
                    <ProgramIndexMenu program={program}>
                      <div style={{/*height: '100vh'*/}}>
                        <KGBreadCrumbs {...params} program={program} sessionName={sessionName}
                                       sessionComponent={sessionComponentName}/>
                        <KGSessionHeader sessionName={sessionName}/>
                        <KGSectionMenu subsessions={subsessions}/>
                        <KGSectionHeader sectionName={subsessionName}/>
                        <KGSimpleChatButton {...params} canWrite={canComment} canRead={canComment}/>
                        <KGDraftTextSection {...params} canRead={canReadText} canWrite={canWriteText}/>
                        <KGGeneralDiagramSection {...params} canRead={canReadDiagram} canWrite={canWriteDiagram}/>
                      </div>
                    </ProgramIndexMenu>
                  </>
              ) : <ShowError/>
        }
      </>
  )
}

export default KGTextAndDiagramSubsession
