import React from 'react'
import {useTranslation} from 'react-i18next'
import {Button, Container, Modal} from 'semantic-ui-react'
import ProgramForm from './ProgramForm'

const ProgramModal = ({modalOpen, setModalOpen, model}) => {
  const {t} = useTranslation()

  return (
      <Container>
        <Modal
            onOpen={() => setModalOpen(true)}
            onClose={() => setModalOpen(false)}
            open={modalOpen}
        >
          <Modal.Header>{t('Create a Program')}</Modal.Header>
          <Modal.Content>
            <ProgramForm closer={setModalOpen} model={model}/>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={() => setModalOpen(false)}>{t('Cancel')}</Button>
          </Modal.Actions>
        </Modal>
      </Container>
  )
}

export default ProgramModal
