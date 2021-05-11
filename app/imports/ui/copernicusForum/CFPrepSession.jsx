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

const sessionName = '準備セッション'
const sessionComponentName = 'CFPrepSession'

const CFPrepSession = () => {
  const params = useParams()
  const {programId, sessionId} = params
  const programLoading = useTracker(() => !Programs.subscribe(Programs.getChannels().allWithMeta).ready())
  const program = useTracker(() => Programs.findOne(programId))

  const {t} = useTranslation()

  const dismissError = () => history.goBack()
  const ShowError = () => (
      error ?
          <Message onDismiss={dismissError} header={t('Error')}
                   content={t('Unregistered Component', {componentName})}/> :
          <div/>
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
                        {/*KGSessionStart*/}
                        {/*    KGSectionMenu*/}
                        {/*    KGChatButton*/}
                      </div>
                    </ProgramIndexMenu>
                  </>
              ) : <ShowError/>
        }
      </>
  )
}

export default CFPrepSession

/*
const CFPrepSession = ({match}) => {
  const {params} = match
  const {programId, sessionId} = params

  const sections = [
    {name: 'ねらい', programId, sessionId, subsession: 'prep-guidance', componentName: 'KGTextDiagramSubsession'},
    {name: '課題', programId, sessionId, subsession: 'prep-questionnaire', componentName: 'KGAssignmentSubsession'},
    {name: 'アサイン', programId, sessionId, subsession: 'prep-questionnaire', componentName: 'KGTeamsSubsession'},
  ]

  const spec = {
    sessionName,
    sessionComponentName,
    sections,
    'prep-guidance': {
      sectionName: 'ねらい',
      diagramComponentName: 'CFFrameworkDiagramSection',
      isTextEditable: {groups: ['admins']},
      isTextReadable: {groups: ['members']},
      isDiagramSavable: {groups: ['admins']},
      isDiagramReadable: {groups: ['members']},
    },
    'prep-questionnaire': {
      sectionName: '課題',
      diagramComponentName: 'CFFrameworkDiagramSection',
      isTeamDefinable: {groups: ['admins']},
      isTeamAnswerable: {groups: ['members']}, // Not Implemented Yet
      delegatedComponentName: 'KGAnswerSubsession',      // 以下は問い掛け部分の permission
      // isText... があれば showText: true, isDiagram... があれば showDiagram: true
      isTextEditable: {groups: ['admins']},
      isTextReadable: {groups: ['members']},
      isDiagramSavable: {groups: ['admins']},
      isDiagramReadable: {groups: ['members']},
      // 課題成果物の permission はその先で teamId で決める
    },
    'prep-questionnaire-answer': {
      sectionName: '課題',
      diagramComponentName: 'CFFrameworkDiagramSection',
      isTextEditable: {groups: ['admins']},
      isTextReadable: {groups: ['members']},
      isDiagramSavable: {groups: ['admins']},
      isDiagramReadable: {groups: ['members']},
    },
  }

  return (
      <React.Fragment>
        <Helmet><title>Prep Session ({sessionId})</title></Helmet>
        <Components.KGBreadCrumbs programId={programId} sessionId={sessionId}/>
        <Components.KGSessionHeader sessionName={sessionName}/>

        <Components.KGSessionStart programId={programId} sessionId={sessionId} spec={spec}
                                   isStartable={{groups: ['admins']}}>
          <React.Fragment>
            <Components.KGSectionMenu sections={sections}/>

            <Components.KGChatButton match={{
              params: {
                programId,
                sessionId,
                subsession: 'prep-chat',
                isChattable: {groups: ['members']},
                isReadable: {groups: ['members']},
              },
            }}/>
          </React.Fragment>
        </Components.KGSessionStart>

      </React.Fragment>
  )
}

registerComponent({name: 'CFPrepSession', component: CFPrepSession})
*/
