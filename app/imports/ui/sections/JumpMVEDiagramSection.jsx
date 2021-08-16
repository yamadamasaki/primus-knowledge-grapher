import React, {createContext, useCallback, useEffect, useRef, useState} from 'react'
import {Button, Loader, Message} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import {useToasts} from 'react-toast-notifications'
import {
  reactFlowDiagramDefineMethod,
  reactFlowDiagramUpdateMethod,
} from '../../api/reactFlowDiagram/ReactFlowDiagramCollection.methods'
import {useTracker, withTracker} from 'meteor/react-meteor-data'
import {ReactFlowDiagrams} from '../../api/reactFlowDiagram/ReactFlowDiagramCollection'
import ReactFlow, {addEdge, ReactFlowProvider, removeElements} from 'react-flow-renderer'
import ExperimentNode from './JumpMVEDiagram/ExperimentNode'
import PhaseNode from './JumpMVEDiagram/PhaseNode'
import Header from './JumpMVEDiagram/Header'
import KPINode from './JumpMVEDiagram/KPINode'
import {format} from 'date-fns'
import {isPermitted, KGIfIHave} from '../components/KGIfIHave'
import {Meteor} from 'meteor/meteor'

const generateNodeId = elements => {
  const idLength = 5
  let result
  do {
    result = Math.floor(Math.random() * 10 ** idLength).toString()
  } while (elements.find(it => it.id === result))
  return result
}

export const JumpMVEDiagramContext = createContext(undefined)

const JumpMVEDiagramSection = ({documentLoading, document, selector, canRead, canWrite}) => {
  const currentUser = useTracker(() => Meteor.user())
  const {t} = useTranslation()

  if (!isPermitted(currentUser, canRead))
    return <Message color="yellow">{t('This section is not published')}</Message>

  const {addToast} = useToasts()

  const reactFlowWrapper = useRef()

  const rootElement =
      {
        id: '1',
        type: 'experiment',
        data: {name: '実験A', dueDate: format(new Date(), 'yyyy-MM-dd')},
        position: {x: 250, y: 25},
        style: {border: '1px solid #777', padding: 10},
      }
  const [elements, setElements] = useState([])
  useEffect(() => {
    if (!documentLoading)
      document ?
          setElements(JSON.parse(document.reactFlowDiagram).elements) :
          setElements([rootElement])
  }, [document, documentLoading, setElements])

  const [reactFlowInstance, setReactFlowInstance] = useState()

  const nodeTypes = {
    experiment: ExperimentNode,
    phase: PhaseNode,
    kpi: KPINode,
  }

  const addNode = node => {
    //setElements(els => els.concat({id: generateNodeId(), ...node}))
  }

  //const nodes = JSON.parse(!documentLoading && document && document.reactFlowDiagram) // ToDo

  const showError = message => addToast(message, {appearance: 'error', autoDismiss: false})
  const showSuccess = () => addToast(t('Success'), {appearance: 'success', autoDismiss: true})
  const onError = error => error ? showError(error.message) : showSuccess()

  const save = useCallback(() => {
    if (reactFlowInstance) {
      const nodes = JSON.stringify(reactFlowInstance.toObject())
      !document || !document._id ?
          reactFlowDiagramDefineMethod.call({...selector, reactFlowDiagram: nodes}, onError) :
          reactFlowDiagramUpdateMethod.call({_id: document._id, ...selector, reactFlowDiagram: nodes}, onError)
    }
  }, [reactFlowInstance, document])

  const onConnect = params => setElements(els => addEdge({...params, arrowHeadType: 'arrow'}, els))
  const onElementsRemove = elementsToRemove => setElements(els => removeElements(elementsToRemove, els))

  const onDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const onDrop = (event) => {
    event.preventDefault()

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const type = event.dataTransfer.getData('application/reactflow')
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    })

    const newNode = {
      id: generateNodeId(elements),
      type,
      position,
      data: nodeTypes[type].newData,
    }

    setElements((es) => es.concat(newNode))
  }

  const readOnly = !isPermitted(currentUser, canWrite)

  const sectionStyle = {
    padding: '1rem 2rem',
    borderLeft: '6px double green',
    borderRight: '6px double green',
    margin: '1rem 0rem',
  }

  return (
      documentLoading ? <Loader/> : (
          <>
            <div style={sectionStyle}>
              <JumpMVEDiagramContext.Provider value={{elements, setElements}}>
                <div ref={reactFlowWrapper} style={{width: '1920px', height: '1080px'}}>
                  <ReactFlowProvider>
                    <Header/>
                    <ReactFlow elements={elements} nodeTypes={nodeTypes} onDrop={onDrop} onDragOver={onDragOver}
                               onLoad={setReactFlowInstance} onConnect={onConnect} onElementsRemove={onElementsRemove}>
                    </ReactFlow>
                  </ReactFlowProvider>
                </div>
              </JumpMVEDiagramContext.Provider>
            </div>
            <KGIfIHave permission={canWrite}>
              <Button onClick={save}>{t('Save')}</Button>
            </KGIfIHave>
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
