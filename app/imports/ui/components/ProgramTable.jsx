import React, {useMemo} from 'react'
import {apply, date2string, identityObject, identityString, userId2string} from '../utils/utils'
import {useTranslation} from 'react-i18next'
import ReactDataGrid from 'react-data-grid'
import {Programs} from '../../api/program/ProgramCollection'
import {useTracker} from 'meteor/react-meteor-data'
import {Loader} from 'semantic-ui-react'

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

  return (
      programsLoading ?
          <Loader/> :
          <ReactDataGrid
              columns={columns}
              rowGetter={i => apply(mapper, programs[i])}
              rowsCount={programs.length}
          />
  )

}

export default ProgramTable
