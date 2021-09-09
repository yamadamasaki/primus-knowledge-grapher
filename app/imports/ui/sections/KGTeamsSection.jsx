import React, {useEffect, useState} from 'react'
import {useTracker, withTracker} from 'meteor/react-meteor-data'
import {Assignments} from '../../api/assignment/AssignmentCollection'
import {Button, Dropdown, Input, Loader, Message, Table} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import {isPermitted, KGIfIHave} from '../components/KGIfIHave'
import {useToasts} from 'react-toast-notifications'
import {Meteor} from 'meteor/meteor'
import {assignmentDefineMethod, assignmentUpdateMethod} from '../../api/assignment/AssignmentCollection.methods'
import {Link} from 'react-router-dom'

const sectionStyle = {
  padding: '1rem 2rem',
  borderLeft: '6px double brown',
  borderRight: '6px double brown',
  margin: '1rem 0rem',
}

const generateTeamId = elements => {
  const idLength = 5
  let result
  do {
    result = Math.floor(Math.random() * 10 ** idLength).toString()
  } while (elements.find(it => it.id === result))
  return result
}

const KGTeamsSection = ({documentLoading, document, selector, canRead, canWrite}) => {
  const currentUser = useTracker(() => Meteor.user())
  const {addToast} = useToasts()
  const {t} = useTranslation()

  if (!isPermitted(currentUser, canRead))
    return <Message color="yellow">{t('This section is not published')}</Message>

  const [teams, setTeams] = useState([])
  useEffect(() => {
    if (!documentLoading) document ? setTeams(document.teams) : setTeams([])
  }, [documentLoading, document, setTeams])

  const showError = message => addToast(message, {appearance: 'error', autoDismiss: false})
  const showSuccess = () => addToast(t('Success'), {appearance: 'success', autoDismiss: true})
  const onError = error => error ? showError(error.message) : showSuccess()

  const save = () => {
    !document || !document._id ?
        assignmentDefineMethod.call({...selector, teams}, onError) :
        assignmentUpdateMethod.call({_id: document._id, ...selector, teams}, onError)
  }

  const readOnly = !isPermitted(currentUser, canWrite)

  const addEmptyTeam = () => setTeams([
    ...teams,
    {name: '', members: [], teamId: generateTeamId(teams.map(it => it.teamId)), status: ''},
  ])
  const deleteTeam = index => () => setTeams(teams.filter((it, i) => i !== index))

  const onChange = (index, field) => e =>
      setTeams([...teams.slice(0, index), {...teams[index], [field]: e.target.value}, ...teams.slice(index + 1)])

  const onChangeMembers = index => (event, {value}) =>
    setTeams([...teams.slice(0, index), {...teams[index], members: value}, ...teams.slice(index + 1)])

  Meteor.subscribe('allUserData')
  const usernames = Meteor.users.find().fetch().
      map(user => ({key: user._id, text: user.username || user.profile.username, value: user._id}))

  return (
      documentLoading ? <Loader/> : (
          <KGIfIHave permission={canRead}>
            <div style={sectionStyle}>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell><Button icon="plus square outline" onClick={addEmptyTeam} disabled={readOnly}/></Table.HeaderCell>
                    <Table.HeaderCell>{t('Team Name')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('Members')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('Status')}</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {
                    teams.map((team, index) =>
                        <Table.Row key={index}>
                          <Table.Cell><Button icon="minus square outline" onClick={deleteTeam(index)} disabled={readOnly}/></Table.Cell>
                          <Table.Cell>
                            <Input placeholder={t('Team Name')} disabled={readOnly} value={team.name} onChange={onChange(index, 'name')}/>
                          </Table.Cell>
                          <Table.Cell>
                            <Dropdown selection multiple scrolling disabled={readOnly} value={team.members} options={usernames}
                                      onChange={onChangeMembers(index)}/>
                          </Table.Cell>
                          <Table.Cell>
                            <Input placeholder={t('Status')} disabled={readOnly} value={team.status} onChange={onChange(index, 'status')}/>
                          </Table.Cell>
                        </Table.Row>
                    )
                  }
                </Table.Body>
              </Table>
              <div style={{height: 480}}>
                <KGIfIHave permission={canWrite}>
                  <Button onClick={save}>{t('Save')}</Button>
                </KGIfIHave>
              </div>
            </div>
          </KGIfIHave>
      )
  )
}

export default withTracker(({programId, sessionId, subsession, id, canRead, canWrite}) => {
  const selector = id || (subsession ? {programId, sessionId, subsession} : {programId, sessionId})
  const documentLoading = !Assignments.subscribe(Assignments.getChannels().allWithMeta).ready()
  const document = Assignments.findOne(selector)

  return {documentLoading, document, selector, canRead, canWrite}
})(KGTeamsSection)
