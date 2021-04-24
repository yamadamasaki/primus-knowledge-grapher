import React, {Fragment, useState} from 'react'
import { EditorState } from 'draft-js'
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import {Button, Header, Segment} from 'semantic-ui-react'
import {convertToRaw} from 'draft-js'

const toolbar = {
  image:{
    uploadCallback: file => {
      console.log({file})
      return (
          new Promise(
              (resolve, reject) => {
                console.log({resolve, reject})
                if (file) {
                  const reader = new FileReader()
                  reader.onload = e => {
                    console.log({e})
                    resolve({data: {link: e.target.result}})
                  }
                  reader.readAsDataURL(file)
                  console.log({reader})
                }
              }
          )
      )
    }
  }
}

const SimpleTextSection = () =>{
  const [editorState, onEditorStateChange] = useState(EditorState.createEmpty())

  return (
      <Fragment>
        <Header as="h2">SimpleTextSection</Header>
        <Segment>
        <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
            toolbar={toolbar}
        />
        </Segment>
        <Button onClick={() => console.log(convertToRaw(editorState.getCurrentContent()))}>Show</Button>
      </Fragment>
  )
}

export default SimpleTextSection
