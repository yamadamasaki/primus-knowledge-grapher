import React, {useMemo} from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import {Programs} from '../../api/program/ProgramCollection'
import {Container, Header, Loader} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import ProgramModal from '../components/ProgramModal'
import ReactDataGrid from 'react-data-grid'

const identityString = it => it || ''
const identityObject = it => it || {}
const date2string = it => it ? it.toLocaleString() : ''
const userId2string = it => (Meteor.users.findOne(it)) || {}.username || ''

const mapper = {
  _id: identityString,
  createdAt: date2string,
  updatedAt: date2string,
  owner: userId2string,
  title: identityString,
  structure: identityObject,
  structureAsJson: identityString,
}

const apply = (mapper, obj) => (
    obj ? (
        Object.fromEntries(
            Object.entries(obj).map(entry => [entry[0], mapper[entry[0]](entry[1])]),
        )
    ) : {}
)

const ProgramPage = () => {
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
      <Container>
        <Header as="h2">{t('Programs')}</Header>
        <ProgramModal/>
        {
          programsLoading ?
              <Loader/> :
              <ReactDataGrid
                  columns={columns}
                  rowGetter={i => apply(mapper, programs[i])}
                  rowsCount={programs.length}
              />
        }
      </Container>
  )
}

export default ProgramPage
