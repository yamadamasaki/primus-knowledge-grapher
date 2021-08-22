import React, {useEffect, useState} from 'react'
import {Button, Comment, Form, Header, Loader, Message} from 'semantic-ui-react'
import {useTracker, withTracker} from 'meteor/react-meteor-data'
import {SimpleChats} from '../../api/simpleChat/SimpleChatCollection'
import {isPermitted, KGIfIHave} from '../components/KGIfIHave'
import {useTranslation} from 'react-i18next'
import {Meteor} from 'meteor/meteor'
import {useToasts} from 'react-toast-notifications'
import {simpleChatDefineMethod, simpleChatUpdateMethod} from '../../api/simpleChat/SimpleChatCollection.methods'

const KGSimpleChatSection = ({documentLoading, document, selector, canRead, canWrite}) => {
  const currentUser = useTracker(() => Meteor.user())
  const {addToast} = useToasts()
  const {t} = useTranslation()

  const [chatList, setChatList] = useState([])
  useEffect(() => {
    if (!documentLoading)
      document ?
          setChatList(document.messages || []) :
          setChatList([])
  }, [documentLoading, document, setChatList])

  const [message, setMessage] = useState('')

  if (!isPermitted(currentUser, canRead))
    return <Message color="yellow">{t('This section is not published')}</Message>

  const showError = message => addToast(message, {appearance: 'error', autoDismiss: false})
  const showSuccess = () => addToast(t('Success'), {appearance: 'success', autoDismiss: true})
  const onError = error => error ? showError(error.message) : showSuccess()

  const onSubmit = () => {
    if (!message) return
    const newMessage = {
      who: currentUser._id,
      when: new Date(),
      text: message,
    }
    !document || !document._id ?
        simpleChatDefineMethod.call({...selector, messages: [newMessage]}, onError) :
        simpleChatUpdateMethod.call({_id: document._id, ...selector, messages: [...document.messages, newMessage]},
            onError)
    setMessage('')
  }

  return (
      //documentLoading ? <Loader/> : (
          <KGIfIHave permission={canRead}>
            <Comment.Group>
              <Header as="h3" dividing>{selector.subsession ?? selector.sessionId}</Header>
              {
                chatList?.map((comment, index) =>
                    <Comment key={index}>
                      <Comment.Avatar src={'foo'}/>
                      <Comment.Content>
                        <Comment.Author as="a">{'foo'}</Comment.Author>
                        <Comment.Metadata>
                          <div>{'foo'}</div>
                        </Comment.Metadata>
                        <Comment.Text>{'foo'}</Comment.Text>
                      </Comment.Content>
                    </Comment>,
                )
              }
              <KGIfIHave permission={canWrite}>
                {/*ToDo*/}
                <Form onSubmit={onSubmit}>
                  <Form.TextArea value={message} onChange={event => setMessage(event.target.value)}/>
                  <Button content="Add Reply" labelPosition="left" icon="edit" primary/>
                </Form>
              </KGIfIHave>
            </Comment.Group>
          </KGIfIHave>
      //)
  )
}

export default withTracker(({programId, sessionId, subsession, id, canRead, canWrite}) => {
  const selector = id || (subsession ? {programId, sessionId, subsession} : {programId, sessionId})
  const documentLoading = !SimpleChats.subscribe(SimpleChats.getChannels().allWithMeta).ready()
  const document = SimpleChats.findOne(selector)

  return {documentLoading, document, selector, canRead, canWrite}
})(KGSimpleChatSection)
