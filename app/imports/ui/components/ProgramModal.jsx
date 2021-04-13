import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, Container, Header, Modal} from 'semantic-ui-react'
import ProgramForm from './ProgramForm'

const ProgramModal = () => {
  const {t} = useTranslation()
  const [open, setOpen] = useState()

  return (
      <Container>
        <Modal
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            open={open}
            trigger={<Button primary>{t('Add')}</Button>}
        >
          <Modal.Header>{t('Create a Program')}</Modal.Header>
          <Modal.Content>
            <ProgramForm closer={setOpen}/>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={() => setOpen(false)}>{t('Cancel')}</Button>
          </Modal.Actions>
        </Modal>
      </Container>
  )
}

export default ProgramModal
