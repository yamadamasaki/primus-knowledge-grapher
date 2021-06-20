import React from 'react'
import {useParams} from 'react-router'
import {useTranslation} from 'react-i18next'
import {Helmet} from 'react-helmet'
import {Programs} from '../../api/program/ProgramCollection'
import {useTracker} from 'meteor/react-meteor-data'
import {Loader, Message} from 'semantic-ui-react'
import KGBreadCrumbs from '../components/KGBreadCrumbs'
import ProgramIndexMenu from '../components/ProgramIndexMenu'
import KGSessionHeader from '../components/KGSessionHeader'
import KGSessionStart from '../components/KGSessionStart'
import KGSectionMenu from '../components/KGSectionMenu'
import {sessionInfoFromProgramTree} from '../utils/utils'

const CFPrepSession = () => {
  const params = useParams()
  const {programId, sessionId} = params
  const programLoading = useTracker(() => !Programs.subscribe(Programs.getChannels().allWithMeta).ready())
  const program = useTracker(() => Programs.findOne(programId))

  const sessionInfo = program && sessionInfoFromProgramTree(program.structure.children, sessionId)
  const sessionName = sessionInfo && sessionInfo.name
  const sessionComponentName = sessionInfo && sessionInfo.componentName

  const {t} = useTranslation()

  // TODO: 保存されるデータを i18n してしまっても大丈夫か?
  const subsessions = [
    {
      name: 'ねらい',
      programId,
      sessionId,
      subsession: 'prep-guidance',
      componentName: 'KGTextAndDiagramSubsession',
    },
    {
      name: '課題',
      programId,
      sessionId,
      subsession: 'prep-questionnaire',
      componentName: 'KGAssignmentSubsession', // Not Yet Implemented
    },
    {
      name: 'アサイン',
      programId,
      sessionId,
      subsession: 'prep-questionnaire',
      componentName: 'KGTeamsSubsession', // Not Yet Implemented
    },
  ]

  const specs = {
    sessionName,
    sessionComponentName,
    subsessions,
    'prep-guidance': {
      subsessionName: 'ねらい',
      canWriteText: {groups: ['admin']},
      canReadText: {groups: ['member']},
      canWriteDiagram: {groups: ['admin']},
      canReadDiagram: {groups: ['member']},
    },
    'prep-questionnaire': {
      subsessionName: '課題',
      canQuestion: {groups: ['admin']},
      canAnswer: {groups: ['member']}, // Not Implemented Yet
      // isText... があれば showText: true, isDiagram... があれば showDiagram: true
      canWriteText: {groups: ['admin']},
      canReadText: {groups: ['member']},
      canWriteDiagram: {groups: ['admin']},
      canReadDiagram: {groups: ['member']},
      // 課題成果物の permission はその先で teamId で決める
    },
    'prep-questionnaire-answer': {
      subsessionName: 'アサイン',
      canWriteText: {groups: ['admin']},
      canReadText: {groups: ['member']},
      canWriteDiagram: {groups: ['admin']},
      canReadDiagram: {groups: ['member']},
    },
  }

  const dismissError = () => history.goBack()
  const ShowError = () => (
      error && (
          <Message onDismiss={dismissError} header={t('Error')}
                   content={t('Unregistered Component', {componentName})}/>
      )
  )

  return (
      <>
        {
          programLoading ? <Loader/> :
              program ? (
                  <>
                    <Helmet><title>{`準備セッション ${sessionId}`}</title></Helmet>
                    <ProgramIndexMenu program={program}>
                      <div style={{height: '100vh'}}>
                        <KGBreadCrumbs
                            {...params}
                            program={program} sessionName={sessionName} sessionComponent={sessionComponentName}/>
                        <KGSessionHeader sessionName={sessionName}/>
                        <KGSessionStart {...params} specs={specs} canStart={{groups: ['admin']}}>
                          <KGSectionMenu subsessions={subsessions}/>
                          {/*
                              <Components.KGChatButton match={{
                                params: {
                                  programId,
                                  sessionId,
                                  subsession: 'prep-chat',
                                  canWrite: {groups: ['member']},
                                  canRead: {groups: ['member']},
                                },
                              }}/>
                            */}
                        </KGSessionStart>
                      </div>
                    </ProgramIndexMenu>
                  </>
              ) : <ShowError/>
        }
      </>
  )
}

export default CFPrepSession
