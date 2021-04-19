import React, {useMemo, useState} from 'react'
import {apply, date2string, identityString, userId2string} from '../utils/utils'
import {useTranslation} from 'react-i18next'
import {Programs} from '../../api/program/ProgramCollection'
import {useTracker} from 'meteor/react-meteor-data'
import {Container, Icon, Loader, Message, Table} from 'semantic-ui-react'
import {programDeleteMethod} from '../../api/program/ProgramCollection.methods'
import ProgramModal from './ProgramModal'
import {Link} from 'react-router-dom'

const mapper = {
  _id: identityString,
  createdAt: date2string,
  updatedAt: date2string,
  owner: userId2string,
  title: identityString,
  scenarioSchema: identityString,
  structure: it => it.title || '...',
  structureAsJson: identityString,
}

const ProgramTable = () => {
  const {t} = useTranslation()
  const [model, setModel] = useState()
  const [modalOpen, setModalOpen] = useState(false)

  const programsLoading = useTracker(() => !Programs.subscribe(Programs.getChannels().allWithMeta).ready())
  const programs = useTracker(() => Programs.find().fetch())

  const [error, setError] = useState(null)
  const dismissError = () => setError(null)

  const columns = useMemo(() => [
    {name: t('Title'), key: 'title'},
    {name: t('Scenario Schema'), key: 'scenarioSchema'},
    //{name: t('Structure (as JSON)'), key: 'structureAsJson'},
    {name: t('Structure'), key: 'structure'},
    {name: t('Created At'), key: 'createdAt'},
    {name: t('Updated At'), key: 'updatedAt'},
    {name: t('Owner'), key: 'owner'},
  ], [])

  const onEdit = () => doc => {
    setModel(doc)
    setModalOpen(true)
  }
  const onRemove = () => id => programDeleteMethod.call(id, error => {
    if (error) setError(error.message)
  })

  const HeaderRow = () => (
      <Table.Row>
        {
          columns.map(column => <Table.HeaderCell key={column.key}>{column.name}</Table.HeaderCell>)
        }
        <Table.HeaderCell width={1}>{t('Actions')}</Table.HeaderCell>
      </Table.Row>
  )

  const ActionCell = ({program}) => (
      <Table.Cell>
        <div>
          <Icon link name="edit" onClick={() => onEdit()(program)}/>
          <Icon link name="remove" onClick={() => onRemove()(program._id)}/>
        </div>
      </Table.Cell>
  )

  const Row = ({program}) => (
      <Table.Row key={program._id}>
        {
          columns.map(column => (
              <Table.Cell key={column.key}>
                {apply(mapper, program)[column.key]}
                {column.key === 'scenarioSchema' ?
                    (
                        <React.Fragment>
                          <Link to={`/scenario/show/${program._id}`}><Icon link name="eye"/></Link>
                          <Link to={`/scenario/edit/${program._id}`}><Icon link name="edit"/></Link>
                        </React.Fragment>
                    ) :
                    <div/>}
              </Table.Cell>
          ))
        }
        <ActionCell program={program}/>
      </Table.Row>
  )

  const ShowError = () => (
      error ?
          <Message onDismiss={dismissError} header={t('Error')} content={error}/> :
          <div/>
  )

  return (
      programsLoading ?
          <Loader/> :
          <Container>
            <ProgramModal modalOpen={modalOpen} setModalOpen={setModalOpen} model={model}/>
            <Table striped>
              <Table.Header>
                <HeaderRow/>
              </Table.Header>
              <Table.Body>
                {
                  programs.map(program => <Row key={program._id} program={program}/>)
                }
              </Table.Body>
            </Table>
            <ShowError/>
          </Container>
  )
}

export default ProgramTable
