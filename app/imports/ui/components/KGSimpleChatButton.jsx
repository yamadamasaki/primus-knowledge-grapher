import React, {useCallback, useState} from 'react'
import {Button} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import {DialogComponent} from '@syncfusion/ej2-react-popups'
import KGSimpleChatSection from '../sections/KGSimpleChatSection'
import {useTracker, withTracker} from 'meteor/react-meteor-data'
import {Touches} from '../../api/touch/TouchCollection'
import {Meteor} from 'meteor/meteor'
import {touchDefineMethod, touchUpdateMethod} from '../../api/touch/TouchCollection.methods'

const KGSimpleChatButton = ({document, selector, canRead, canWrite}) => {
  const {t} = useTranslation()

  const [isChatPanelOpen, setChatPanelOpen] = useState(false)
  const onClick = useCallback(() => setChatPanelOpen(!isChatPanelOpen), [isChatPanelOpen, setChatPanelOpen])

  // Touch はユーザに直接には見えない操作を意図しているので, 保存操作の結果の可否をユーザに提示しない
  const updateTouch = () =>
      !document || !document._id ?
          touchDefineMethod.call({...selector, section: 'simple-chat'}) :
          touchUpdateMethod.call({_id: document._id, ...selector, section: 'simple-chat'})

  const onOpen = () => {
    setChatPanelOpen(true)
    updateTouch()
  }
  const onClose = () => {
    setChatPanelOpen(false)
    updateTouch()
  }

  const {programId, sessionId, subsession} = selector

  return (
      <div style={{border: 'solid 1px gray', width: '100%', backgroundColor: 'aliceblue'}}>
        <DialogComponent id="dialogDraggable" header={t('Chat')} isModal={false} showCloseIcon={true}
                         allowDragging={true} animationSettings={{effect: 'Fade'}} width="300px"
                         visible={isChatPanelOpen} open={onOpen} close={onClose}
                         enableResize={true} resizeHandles={['All']}>
          <KGSimpleChatSection programId={programId} sessionId={sessionId} subsession={subsession}
                               canWrite={canWrite} canRead={canRead}/>
        </DialogComponent>
        <Button onClick={onClick} disabled={isChatPanelOpen || !canRead}>{t('Chat')}</Button>
      </div>
  )
}

export default withTracker(({programId, sessionId, subsession, id, canRead, canWrite}) => {
  const currentUser = useTracker(() => Meteor.user())
  const selector = id ||
      (subsession ?
          {programId, sessionId, subsession, owner: currentUser._id} :
          {programId, sessionId, owner: currentUser._id})
  const documentLoading = !Touches.subscribe(Touches.getChannels().allWithMeta).ready()
  const document = Touches.findOne(selector)

  return {documentLoading, document, selector, canRead, canWrite}
})(KGSimpleChatButton)
