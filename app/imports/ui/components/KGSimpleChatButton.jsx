import React, {useCallback, useEffect, useState} from 'react'
import {Button, Label, Segment} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import {DialogComponent} from '@syncfusion/ej2-react-popups'
import KGSimpleChatSection from '../sections/KGSimpleChatSection'
import {useTracker, withTracker} from 'meteor/react-meteor-data'
import {Touches} from '../../api/touch/TouchCollection'
import {Meteor} from 'meteor/meteor'
import {touchDefineMethod, touchUpdateMethod} from '../../api/touch/TouchCollection.methods'
import {SimpleChats} from '../../api/simpleChat/SimpleChatCollection'

const KGSimpleChatButton = ({touchLoading, touch, touchSelector, documentLoading, document, selector, canRead, canWrite}) => {
  const {t} = useTranslation()

  const [isChatPanelOpen, setChatPanelOpen] = useState(false)
  const onClick = useCallback(() => setChatPanelOpen(!isChatPanelOpen), [isChatPanelOpen, setChatPanelOpen])

  // Touch はユーザに直接には見えない操作を意図しているので, 保存操作の結果の可否をユーザに提示しない
  const updateTouch = () =>
      !touch || !touch._id ?
          touchDefineMethod.call(touchSelector) :
          touchUpdateMethod.call({_id: touch._id, ...touchSelector})

  const onOpen = () => {
    setChatPanelOpen(true)
    updateTouch()
  }
  const onClose = () => {
    setChatPanelOpen(false)
    updateTouch()
  }

  const [chatList, setChatList] = useState([])
  useEffect(() => {
    if (!documentLoading)
      document ?
          setChatList(document.messages || []) :
          setChatList([])
  }, [documentLoading, document, setChatList])

  const {programId, sessionId, subsession} = selector
  const unread = touchLoading ? 0 : chatList?.filter(item => item.when > touch.updatedAt).length

  return (
      <div style={{border: 'solid 1px gray', width: '100%', backgroundColor: 'aliceblue'}}>
        <DialogComponent id="dialogDraggable" header={t('Chat')} isModal={false} showCloseIcon={true}
                         allowDragging={true} animationSettings={{effect: 'Fade'}} width="300px"
                         visible={isChatPanelOpen} open={onOpen} close={onClose}
                         enableResize={true} resizeHandles={['All']}>
          <KGSimpleChatSection programId={programId} sessionId={sessionId} subsession={subsession}
                               canWrite={canWrite} canRead={canRead}/>
        </DialogComponent>
        <Segment basic>
          <Segment.Inline>
            <Button onClick={onClick} disabled={isChatPanelOpen || !canRead}>{t('Chat')}</Button>
            <Label color={unread > 0 ? 'red' : undefined}>
              {t('Unread')}
              <Label.Detail>{unread}</Label.Detail>
            </Label>
          </Segment.Inline>
        </Segment>
      </div>
  )
}

export default withTracker(({programId, sessionId, subsession, section, id, canRead, canWrite}) => {
  const currentUser = useTracker(() => Meteor.user())
  const selector = id || (subsession ? {programId, sessionId, subsession} : {programId, sessionId})
  const documentLoading = !SimpleChats.subscribe(SimpleChats.getChannels().allWithMeta).ready()
  const document = SimpleChats.findOne(selector)

  const touchSelector = {...selector, owner: currentUser._id, section}
  const touchLoading = !Touches.subscribe(Touches.getChannels().allWithMeta).ready()
  const touch = Touches.findOne(touchSelector)

  return {touchLoading, touch, touchSelector, documentLoading, document, selector, canRead, canWrite}
})(KGSimpleChatButton)
