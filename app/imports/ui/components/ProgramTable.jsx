import React, {useMemo, useState} from 'react'
import {apply, date2string, identityObject, identityString, userId2string} from '../utils/utils'
import {useTranslation} from 'react-i18next'
import {Programs} from '../../api/program/ProgramCollection'
import {useTracker} from 'meteor/react-meteor-data'
import {Container, Icon, Loader, Message, Table} from 'semantic-ui-react'
import {programDeleteMethod} from '../../api/program/ProgramCollection.methods'

const mapper = {
  _id: identityString,
  createdAt: date2string,
  updatedAt: date2string,
  owner: userId2string,
  title: identityString,
  structure: identityObject,
  structureAsJson: identityString,
}

const ProgramTable = () => {
  const {t} = useTranslation()

  const programsLoading = useTracker(() => !Programs.subscribe(Programs.getChannels().allWithMeta).ready())
  const programs = useTracker(() => Programs.find().fetch())

  const [error, setError] = useState(null)
  const dismissError = () => setError(null)

  const columns = useMemo(() => [
    {name: t('Created At'), key: 'createdAt'},
    {name: t('Updated At'), key: 'updatedAt'},
    {name: t('Owner'), key: 'owner'},
    {name: t('Title'), key: 'title'},
    {name: t('Structure (as JSON)'), key: 'structureAsJson'},
  ], [])

  const onEdit = () => id => console.log('onEdit', {id})
  const onRemove = () => id => programDeleteMethod.call(id, error => {
    if (error) setError(error.message)
  })

  const toRow = program => (
      <Table.Row key={program._id}>
        {
          columns.map(column =>
              <Table.Cell key={column.key}>
                <div>{apply(mapper, program)[column.key]}</div>
              </Table.Cell>,
          )
        }
        <Table.Cell>
          <div>
            <Icon link name="edit" onClick={() => onEdit()(program._id)}/>
            <Icon link name="remove" onClick={() => onRemove()(program._id)}/>
          </div>
        </Table.Cell>
      </Table.Row>
  )

  return (
      programsLoading ?
          <Loader/> :
          <Container>
            <Table>
              <Table.Header>
                <Table.Row>
                  {
                    columns.map(column => <Table.HeaderCell key={column.key}>{column.name}</Table.HeaderCell>)
                  }
                  <Table.HeaderCell>{t('Actions')}</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  programs.map(toRow)
                }
              </Table.Body>
            </Table>
            {
              error ?
                  <Message onDismiss={dismissError} header={t('Error')} content={error}/> :
                  <div/>
            }
          </Container>
  )
}

export default ProgramTable
