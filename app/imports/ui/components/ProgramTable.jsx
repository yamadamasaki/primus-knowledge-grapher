import React, {Fragment, useMemo, useState} from 'react'
import {apply, date2string, identityString, userId2string} from '../utils/utils'
import {useTranslation} from 'react-i18next'
import {Button, Header, Icon, Message, Modal, Popup, Table} from 'semantic-ui-react'
import {programDeleteMethod} from '../../api/program/ProgramCollection.methods'
import ProgramModal from './ProgramModal'
import {Link} from 'react-router-dom'

const mapper = {
  _id: identityString,
  createdAt: date2string,
  updatedAt: date2string,
  owner: userId2string,
  title: (it, obj) => <Link to={`/programs/${obj._id}`}>{it}</Link>,
  scenarioSchema: identityString,
  structure: it => it.title || '...',
  structureAsJson: identityString,
}

const ProgramTable = ({programs}) => {
  const {t} = useTranslation()
  const [model, setModel] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [idToBeRemoved, setIdToBeRemoved] = useState(null)

  const [error, setError] = useState(null)
  const dismissError = () => setError(null)

  const columns = useMemo(() => [
    {name: t('Title'), key: 'title'},
    {name: t('Scenario Schema'), key: 'scenarioSchema'},
    {name: t('Structure'), key: 'structure'},
    {name: t('Created At'), key: 'createdAt'},
    {name: t('Updated At'), key: 'updatedAt'},
    {name: t('Owner'), key: 'owner'},
  ], [])

  const onEdit = () => doc => {
    setModel(doc)
    setModalOpen(true)
  }
  const onRemove = () => id => {
    setIdToBeRemoved(id)
  }
  const remove = () => {
    programDeleteMethod.call(idToBeRemoved, error => {
      if (error) setError(error.message)
    })
    setIdToBeRemoved(null)
  }

  const ConfirmToRemove = () => (
      <Modal basic open={!!idToBeRemoved} size="small">
        <Header icon><Icon name="warning sign"/>{t('You are Removing the Program')}</Header>
        <Modal.Content>{t('Are You Sure?')}</Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={() => setIdToBeRemoved(null)}>
            <Icon name="remove"/> {t('Dismiss')}
          </Button>
          <Button basic color="red" inverted onClick={remove}>
            <Icon name="checkmark"/> {t('Yes')}
          </Button>
        </Modal.Actions>
      </Modal>
  )

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
          <Popup trigger={<Icon link name="edit" onClick={() => onEdit()(program)}/>}>
            {t('Edit Program')}
          </Popup>
          <Popup trigger={<Icon link name="remove" onClick={() => onRemove()(program._id)}/>}>
            {t('Remove Program')}
          </Popup>
        </div>
      </Table.Cell>
  )

  const Row = ({program}) => (
      <Table.Row key={program._id}>
        {
          columns.map(column => (
              <Table.Cell key={column.key}>
                {apply(mapper, program)[column.key]}
                {column.key === 'structure' && program.scenarioSchema ?
                    (
                        <React.Fragment>
                          <Popup trigger={<Link to={`/scenario/show/${program._id}`}><Icon link name="eye"/></Link>}>
                            {t('View scenario in compact format')}
                          </Popup>
                          <Popup trigger={<Link to={`/scenario/edit/${program._id}`}><Icon link name="edit"/></Link>}>
                            {t('Edit scenario in strict format')}
                          </Popup>
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
      <Fragment>
        <ProgramModal modalOpen={modalOpen} setModalOpen={setModalOpen} model={model}/>
        <ConfirmToRemove open={idToBeRemoved}/>
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
      </Fragment>
  )
}

export default ProgramTable
