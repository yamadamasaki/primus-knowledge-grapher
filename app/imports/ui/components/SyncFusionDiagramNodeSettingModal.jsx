import React from 'react'
import {useTranslation} from 'react-i18next'
import {Button, Container, Modal} from 'semantic-ui-react'
import SyncFusionDiagramNodeSettingForm from './SyncFusionDiagramNodeSettingForm'

const SyncFusionDiagramNodeSettingModal = ({setModalOpen, modalOpen, nodes, setNodes}) => {
  const {t} = useTranslation()

  return (
      <Container>
        <Modal onOpen={() => setModalOpen(true)} onClose={() => setModalOpen(false)} open={modalOpen}>
          <Modal.Header>{t('Node Attributes')}</Modal.Header>
          <Modal.Content>
            <SyncFusionDiagramNodeSettingForm nodes={nodes} setNodes={setNodes}/>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={() => setModalOpen(false)}>{t('Cancel')}</Button>
          </Modal.Actions>
        </Modal>
      </Container>
  )
}

export default SyncFusionDiagramNodeSettingModal
