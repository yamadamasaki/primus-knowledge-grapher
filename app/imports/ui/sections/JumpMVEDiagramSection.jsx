import React, {useRef} from 'react'
import {Button, Loader} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import {useToasts} from 'react-toast-notifications'
import {reactFlowDiagramDefineMethod, reactFlowDiagramUpdateMethod} from '../../api/reactFlowDiagram/ReactFlowDiagramCollection.methods'
import {withTracker} from 'meteor/react-meteor-data'
import {ReactFlowDiagrams} from '../../api/reactFlowDiagram/ReactFlowDiagramCollection'
import ReactFlow from 'react-flow-renderer'

const elements = [
  {
    id: '1',
    type: 'input', // input node
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  // default node
  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output', // output node
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
  // animated edge
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
]

const JumpMVEDiagramSection = ({documentLoading, document, selector, canRead, canWrite}) => {
  const {t} = useTranslation()
  const nodeEditor = useRef() // ToDo
  const {addToast} = useToasts()

  //const nodes = JSON.parse(!documentLoading && document && document.reactFlowDiagram) // ToDo

  const showError = message => addToast(message, {appearance: 'error', autoDismiss: false})
  const showSuccess = () => addToast(t('Success'), {appearance: 'success', autoDismiss: true})
  const onError = error => error ? showError(error.message) : showSuccess()

  const save = () => {
    //const nodes = JSON.stringify(nodeEditor.current.getNodes()) // ToDo
    !document || !document._id ?
        reactFlowDiagramDefineMethod.call({...selector, reactFlowDiagram: nodes}, onError) :
        reactFlowDiagramUpdateMethod.call({_id: document._id, ...selector, reactFlowDiagram: nodes}, onError)
  }

  return (
      documentLoading ? <Loader/> : (
          <>
            <div style={{width: '1920px', height: '1080px'}}>
              <ReactFlow elements={elements} />
            </div>
            <Button onClick={save}>{t('Save')}</Button>
          </>
      )
  )
}

export default withTracker(({programId, sessionId, subsession, id, canRead, canWrite}) => {
  const selector = id || (subsession ? {programId, sessionId, subsession} : {programId, sessionId})
  const documentLoading = !ReactFlowDiagrams.subscribe(ReactFlowDiagrams.getChannels().allWithMeta).ready()
  const document = ReactFlowDiagrams.findOne(selector)

  return {documentLoading, document, selector, canRead, canWrite}
})(JumpMVEDiagramSection)
