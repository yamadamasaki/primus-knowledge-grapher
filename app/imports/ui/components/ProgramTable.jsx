import React, {useMemo} from 'react'
import {apply, date2string, identityObject, identityString, userId2string} from '../utils/utils'
import {useTranslation} from 'react-i18next'
import {Programs} from '../../api/program/ProgramCollection'
import {useTracker} from 'meteor/react-meteor-data'
import {Icon, Loader, Table} from 'semantic-ui-react'

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

  const columns = useMemo(() => [
    {name: t('Created At'), key: 'createdAt'},
    {name: t('Updated At'), key: 'updatedAt'},
    {name: t('Owner'), key: 'owner'},
    {name: t('Title'), key: 'title'},
    {name: t('Structure (as JSON)'), key: 'structureAsJson'},
  ], [])

   const toRow = program => (
      <Table.Row key={program._id}>
        {
          columns.map(column =>
              <Table.Cell key={column.key}>
                <div>{apply(mapper, program)[column.key]}</div>
              </Table.Cell>
          )
        }
      </Table.Row>
  )

  return (
      programsLoading ?
          <Loader/> :
          <Table>
            <Table.Header>
              <Table.Row>
              {
                columns.map(column => <Table.HeaderCell key={column.key}>{column.name}</Table.HeaderCell>)
              }
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                programs.map(toRow)
              }
            </Table.Body>
          </Table>
  )
}

export default ProgramTable
