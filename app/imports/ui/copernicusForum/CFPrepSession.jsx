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

const sessionName = '準備セッション'
const sessionComponentName = 'CFPrepSession'

const CFPrepSession = () => {
  const params = useParams()
  const {programId, sessionId} = params
  const programLoading = useTracker(() => !Programs.subscribe(Programs.getChannels().allWithMeta).ready())
  const program = useTracker(() => Programs.findOne(programId))

  const {t} = useTranslation()

  const sections = [
    {
      name: t('guidance'),
      programId,
      sessionId,
      subsession: 'prep-guidance',
      componentName: 'KGTextAndDiagramSubsession',
    },
    {
      name: t('questionnaire'),
      programId,
      sessionId,
      subsession: 'prep-questionnaire',
      componentName: 'KGAssignmentSubsession',
    },
    {
      name: t('assignment'),
      programId,
      sessionId,
      subsession: 'prep-questionnaire',
      componentName: 'KGTeamsSubsession',
    },
  ]

  const specs = {
    sessionName,
    sessionComponentName,
    sections,
    'prep-guidance': {
      sectionName: 'ねらい',
      diagramComponentName: 'CFFrameworkDiagramSection',
      isTextEditable: {groups: ['admin']},
      isTextReadable: {groups: ['member']},
      isDiagramSavable: {groups: ['admin']},
      isDiagramReadable: {groups: ['member']},
    },
    'prep-questionnaire': {
      sectionName: '課題',
      diagramComponentName: 'CFFrameworkDiagramSection',
      isTeamDefinable: {groups: ['admin']},
      isTeamAnswerable: {groups: ['member']}, // Not Implemented Yet
      delegatedComponentName: 'KGAnswerSubsession',      // 以下は問い掛け部分の permission
      // isText... があれば showText: true, isDiagram... があれば showDiagram: true
      isTextEditable: {groups: ['admin']},
      isTextReadable: {groups: ['member']},
      isDiagramSavable: {groups: ['admin']},
      isDiagramReadable: {groups: ['member']},
      // 課題成果物の permission はその先で teamId で決める
    },
    'prep-questionnaire-answer': {
      sectionName: '課題',
      diagramComponentName: 'CFFrameworkDiagramSection',
      isTextEditable: {groups: ['admin']},
      isTextReadable: {groups: ['member']},
      isDiagramSavable: {groups: ['admin']},
      isDiagramReadable: {groups: ['member']},
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
                    <Helmet>Prep Session {sessionId}</Helmet>
                    <ProgramIndexMenu program={program}>
                      <div style={{height: '100vh'}}>
                        <KGBreadCrumbs
                            {...params}
                            program={program} sessionName={sessionName} sessionComponent={sessionComponentName}/>
                        <KGSessionHeader sessionName={sessionName}/>
                        <KGSessionStart {...params} specs={specs} isStartable={{groups: ['admin']}}>
                          <KGSectionMenu sections={sections}/>
                          {/*
                              <Components.KGChatButton match={{
                                params: {
                                  programId,
                                  sessionId,
                                  subsession: 'prep-chat',
                                  isChattable: {groups: ['member']},
                                  isReadable: {groups: ['member']},
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
