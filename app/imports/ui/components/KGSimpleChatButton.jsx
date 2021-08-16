import React, {useState} from 'react'
import {Button} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import {DialogComponent} from '@syncfusion/ej2-react-popups'

const KGSimpleChatButton = ({program, sessionId, subsessionName, chatSectionName}) => {
  console.log({program, sessionId, subsessionName, chatSectionName})

  const {t} = useTranslation()

  const [isChatPanelOpen, setChatPanelOpen] = useState(false)
  const onClick = () => setChatPanelOpen(!isChatPanelOpen)

  return (
      <div style={{border: 'solid 1px gray', width: '100%', backgroundColor: 'aliceblue'}}>
        <DialogComponent id="dialogDraggable" header="Drag Me!!!" isModal={false} showCloseIcon={true}
                         allowDragging={true} animationSettings={{effect: 'Fade'}} width="300px"
                         visible={isChatPanelOpen} open={() => setChatPanelOpen(true)}
                         close={() => setChatPanelOpen(false)}
                         enableResize={true} resizeHandles={['All']}>
          This is a dialog with draggable support.
        </DialogComponent>
        <Button onClick={onClick} disabled={isChatPanelOpen}>{t('Chat')}</Button>
      </div>
  )
}

export default KGSimpleChatButton
