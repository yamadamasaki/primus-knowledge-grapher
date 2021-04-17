import React, {useMemo, useState} from 'react'
import {Programs} from '../../api/program/ProgramCollection'
import {Button, Container, Header, Loader} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import ProgramModal from '../components/ProgramModal'
import ProgramTable from '../components/ProgramTable'

const ProgramPage = () => {
  const {t} = useTranslation()
  const [modalOpen, setModalOpen] = useState(false)

  return (
      <Container>
        <Header as="h2">{t('Programs')}</Header>
        <ProgramModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
        <Button primary onClick={() => setModalOpen(true)}>{t('Add')}</Button>
        <ProgramTable/>
      </Container>
  )
}

export default ProgramPage
