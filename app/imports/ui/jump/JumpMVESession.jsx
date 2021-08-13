import React from 'react'
import {useParams} from 'react-router'
import {Programs} from '../../api/program/ProgramCollection'
import {sessionInfoFromProgramTree} from '../utils/utils'
import {useTranslation} from 'react-i18next'
import {useTracker} from 'meteor/react-meteor-data'
import {Loader, Message} from 'semantic-ui-react'
import {Helmet} from 'react-helmet'
import ProgramIndexMenu from '../components/ProgramIndexMenu'
import KGBreadCrumbs from '../components/KGBreadCrumbs'
import KGSessionHeader from '../components/KGSessionHeader'
import KGSessionStart from '../components/KGSessionStart'
import KGSectionMenu from '../components/KGSectionMenu'

const JumpMVESession = () => {
  const params = useParams()
  const {programId, sessionId} = params
  const programLoading = useTracker(() => !Programs.subscribe(Programs.getChannels().allWithMeta).ready())
  const program = useTracker(() => Programs.findOne(programId))

  const sessionInfo = program && sessionInfoFromProgramTree(program.structure.children, sessionId)
  const sessionName = sessionInfo && sessionInfo.name
  const sessionComponentName = sessionInfo && sessionInfo.componentName

  const {t} = useTranslation()

  const subsessions = [
    {
      name: 'KPI & アクション',
      programId,
      sessionId,
      subsession: 'mve-kpi',
      componentName: 'JumpMVESubsession',
    }, {
      name: 'タイムライン',
      programId,
      sessionId,
      subsession: 'mve-timeline',
      componentName: 'KGTimeLineSubsession',
    }, {
      name: 'カンバン',
      programId,
      sessionId,
      subsession: 'mve-kanban',
      componentName: 'KGKanbanSubsession',
    }
  ]

  const specs = {
    sessionName, sessionComponentName, subsessions,
    'mve-kpi' :{
      subsessionName: 'KPI & アクション',
      canWrite: {groups: ['admin']},
      canRead: {groups: ['member']}
    },
    'mve-timeline': {subsessionName: 'タイムライン'},
    'mve-kanban': {subsessionName: 'カンバン'},
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
                    <Helmet><title>{`MVE セッション ${sessionId}`}</title></Helmet>
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

export default JumpMVESession
