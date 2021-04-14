import React, {useMemo} from 'react'
import {Programs} from '../../api/program/ProgramCollection'
import {Container, Header, Loader} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import ProgramModal from '../components/ProgramModal'
import ProgramTable from '../components/ProgramTable'

const ProgramPage = () => {
  const {t} = useTranslation()

  return (
      <Container>
        <Header as="h2">{t('Programs')}</Header>
        <ProgramModal/>
        <ProgramTable/>
      </Container>
  )
}

export default ProgramPage
