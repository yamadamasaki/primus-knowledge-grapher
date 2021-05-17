import React, {useEffect, useState} from 'react'
import {convertFromRaw, convertToRaw, EditorState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {Button, Header, Loader, Message} from 'semantic-ui-react'
import {DraftTexts} from '../../api/draftText/DraftTextCollection'
import {withTracker} from 'meteor/react-meteor-data'
import {draftTextDefineMethod, draftTextUpdateMethod} from '../../api/draftText/DraftTextCollection.methods'
import {useTranslation} from 'react-i18next'

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

const KGDraftTextSection = ({documentLoading, document, selector}) => {
  const {t} = useTranslation()

  const [editorState, setEditorState] = useState()
  useEffect(() => {
    if (!documentLoading)
      document ?
          setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(document.draftText)))) :
          setEditorState(EditorState.createEmpty())
  }, [document])

  const [error, setError] = useState(null)
  const dismissError = () => setError(null)
  const ShowError = () => error ? <Message onDismiss={dismissError} header={t('Error')} content={error}/> : <div/>

  const [success, setSuccess] = useState(null)
  const dismissSuccess = () => setSuccess(null)
  const ShowSuccess = () => success ? <Message color="green" onDismiss={dismissSuccess}>{success}</Message> : <div/>

  const onError = error => {
    if (error) {
      setError(<div>{error.message}</div>)
      setSuccess(null)
    } else {
      setSuccess(<div>{t('Success')}</div>)
      setError(null)
    }
  }

  const save = () => {
    const currentContent = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    !document || !document._id ?
        draftTextDefineMethod.call({...selector, draftText: currentContent}, onError) :
        draftTextUpdateMethod.call({_id: document._id, ...selector, draftText: currentContent}, onError)
  }

  return (
      documentLoading ? <Loader/> : (
          <>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={setEditorState}
                toolbar={toolbar}
            />
            <Button onClick={save}>{t('Save')}</Button>
            <ShowError/>
            <ShowSuccess/>
          </>
      )
  )
}

// id は直接 mongo ドキュメントにアクセスする場合に, {programId, sessionId, subsession} と排他的に用いられる
// 今のところ, そういう usecase はない
export default withTracker(({programId, sessionId, subsession, id}) => {
  const selector = id || (subsession ? {programId, sessionId, subsession} : {programId, sessionId})
  const documentLoading = !DraftTexts.subscribe(DraftTexts.getChannels().allWithMeta).ready()
  const document = DraftTexts.findOne(selector)

  return {
    documentLoading,
    document,
    selector,
  }
})(KGDraftTextSection)
