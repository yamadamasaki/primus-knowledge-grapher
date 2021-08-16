import React, {useCallback, useState} from 'react'
import {Button} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import {DialogComponent} from '@syncfusion/ej2-react-popups'
import KGSimpleChatSection from '../sections/KGSimpleChatSection'

const KGSimpleChatButton = ({programId, sessionId, subsession, canWrite, canRead}) => {
  const {t} = useTranslation()

  const [isChatPanelOpen, setChatPanelOpen] = useState(false)
  const onClick = useCallback(() => setChatPanelOpen(!isChatPanelOpen), [isChatPanelOpen, setChatPanelOpen])
  const onOpen = useCallback(() => setChatPanelOpen(true), [setChatPanelOpen])
  const onClose = useCallback(() => setChatPanelOpen(false), [setChatPanelOpen])

  return (
      <div style={{border: 'solid 1px gray', width: '100%', backgroundColor: 'aliceblue'}}>
        <DialogComponent id="dialogDraggable" header="Drag Me!!!" isModal={false} showCloseIcon={true}
                         allowDragging={true} animationSettings={{effect: 'Fade'}} width="300px"
                         visible={isChatPanelOpen} open={onOpen} close={onClose}
                         enableResize={true} resizeHandles={['All']}>
          This is a dialog with draggable support.
          <KGSimpleChatSection programId={programId} sessionId={sessionId} subsession={subsession}
                               canWrite={canWrite} canRead={canRead}/>
        </DialogComponent>
        <Button onClick={onClick} disabled={isChatPanelOpen||!canRead}>{t('Chat')}</Button>
      </div>
  )
}

export default KGSimpleChatButton
