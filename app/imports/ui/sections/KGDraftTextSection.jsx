import React, {useEffect, useState} from 'react'
import {convertFromRaw, convertToRaw, EditorState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {Button, Loader, Message} from 'semantic-ui-react'
import {DraftTexts} from '../../api/draftText/DraftTextCollection'
import {useTracker, withTracker} from 'meteor/react-meteor-data'
import {draftTextDefineMethod, draftTextUpdateMethod} from '../../api/draftText/DraftTextCollection.methods'
import {useTranslation} from 'react-i18next'
import {isPermitted, KGIfIHave} from '../components/KGIfIHave'
import {Meteor} from 'meteor/meteor'
import {useToasts} from 'react-toast-notifications'

const toolbar = {
  image: {
    uploadCallback: file => (
        new Promise((resolve, reject) => {
          if (file) {
            const reader = new FileReader()
            reader.onload = e => {
              resolve({data: {link: e.target.result}})
            }
            reader.readAsDataURL(file)
          }
        })
    ),
  },
}

const sectionStyle = {
  padding: '1rem 2rem',
  borderLeft: '6px double blue',
  borderRight: '6px double blue',
  margin: '1rem 0rem',
}

const KGDraftTextSection = ({documentLoading, document, selector, canRead, canWrite}) => {
  const currentUser = useTracker(() => Meteor.user())
  const {addToast} = useToasts()
  const {t} = useTranslation()

  if (!isPermitted(currentUser, canRead))
    return <Message color="yellow">{t('This section is not published')}</Message>

  const [editorState, setEditorState] = useState()
  useEffect(() => {
    if (!documentLoading)
      document ?
          setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(document.draftText)))) :
          setEditorState(EditorState.createEmpty())
  }, [documentLoading, document, setEditorState])

  const showError = message => addToast(message, {appearance: 'error', autoDismiss: false})
  const showSuccess = () => addToast(t('Success'), {appearance: 'success', autoDismiss: true})
  const onError = error => error ? showError(error.message) : showSuccess()

  const save = () => {
    const currentContent = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    !document || !document._id ?
        draftTextDefineMethod.call({...selector, draftText: currentContent}, onError) :
        draftTextUpdateMethod.call({_id: document._id, ...selector, draftText: currentContent}, onError)
  }

  const readOnly = !isPermitted(currentUser, canWrite)

  return (
      documentLoading ? <Loader/> : (
          <KGIfIHave permission={canRead}>
            <div style={sectionStyle}>
              <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={setEditorState}
                  toolbar={toolbar}
                  readOnly={readOnly} toolbarHidden={readOnly}
              />
              <KGIfIHave permission={canWrite}>
                <Button onClick={save}>{t('Save')}</Button>
              </KGIfIHave>
            </div>
          </KGIfIHave>
      )
  )
}

// id は直接 mongo ドキュメントにアクセスする場合に, {programId, sessionId, subsession} と排他的に用いられる
// 今のところ, そういう usecase はない
export default withTracker(({programId, sessionId, subsession, id, canRead, canWrite}) => {
  const selector = id || (subsession ? {programId, sessionId, subsession} : {programId, sessionId})
  const documentLoading = !DraftTexts.subscribe(DraftTexts.getChannels().allWithMeta).ready()
  const document = DraftTexts.findOne(selector)

  return {documentLoading, document, selector, canRead, canWrite}
})(KGDraftTextSection)
