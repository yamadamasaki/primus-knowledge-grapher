import React from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import {Programs} from '../../api/program/ProgramCollection'
import {Container, Header, Loader} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import ProgramModal from '../components/ProgramModal'

const ProgramPage = () => {
  const {t, i18n} = useTranslation()
  const programsLoading = useTracker(() => !Programs.subscribe(Programs.getChannels().allWithMeta).ready())
  const programs = useTracker(() => Programs.find().fetch())

  return (
      <Container>
        <Header as="h2">{t('Programs')}</Header>
        <ProgramModal/>
        {
          programsLoading ?
              <Loader/> :
              <ul>
                {
                  programs.map((item, index) => <li key={index}>{item.title}</li>)
                }
              </ul>
        }
      </Container>
  )
}

export default ProgramPage
