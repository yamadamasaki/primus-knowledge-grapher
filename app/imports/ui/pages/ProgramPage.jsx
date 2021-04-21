import React, {useState} from 'react'
import {Programs} from '../../api/program/ProgramCollection'
import {Button, Container, Header, Loader} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import ProgramModal from '../components/ProgramModal'
import ProgramTable from '../components/ProgramTable'
import {useTracker} from 'meteor/react-meteor-data'

const ProgramPage = () => {
  const programsLoading = useTracker(() => !Programs.subscribe(Programs.getChannels().allWithMeta).ready())
  const programs = useTracker(() => Programs.find().fetch())

  const {t} = useTranslation()

  const [modalOpen, setModalOpen] = useState(false)

  return (
      programsLoading ?
          <Loader/> :
          <Container>
            <Header as="h2">{t('Programs')}</Header>
            <ProgramModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
            <Button primary onClick={() => setModalOpen(true)}>{t('Add')}</Button>
            <ProgramTable programs={programs}/>
          </Container>
  )
}

export default ProgramPage
