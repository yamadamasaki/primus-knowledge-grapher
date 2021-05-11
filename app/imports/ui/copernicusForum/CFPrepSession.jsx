import React from 'react'
import {useParams} from 'react-router'

const sessionName = '準備セッション'
const sessionComponentName = 'CFPrepSession'

const CFPrepSession = () => {
  const {programId, sessionId} = useParams()
  return (
      <>
        <h1>CFPrepSession</h1>
        <div>{sessionName}, {sessionComponentName}</div>
        <div>{programId}, {sessionId}</div>
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
