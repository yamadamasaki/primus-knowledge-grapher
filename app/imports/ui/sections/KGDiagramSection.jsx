import './KGDiagramSection.css'
import * as React from 'react'
import {useEffect, useRef} from 'react'
import {DiagramComponent} from '@syncfusion/ej2-react-diagrams'
import {
  DiagramContextMenu,
  Inject,
  PrintAndExport,
  UndoRedo,
} from '@syncfusion/ej2-react-diagrams/dist/es6/ej2-react-diagrams.es2015.js'
import {Node} from '@syncfusion/ej2-diagrams'
import {Button} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import SyncFusionDiagramNodeSettingModal from '../components/SyncFusionDiagramNodeSettingModal'

const interval = [
  1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
]
const gridlines = {lineColor: '#e0e0e0', lineIntervals: interval}

const sectionStyle = {
  padding: '1rem 2rem',
  borderLeft: '6px double orange',
  borderRight: '6px double orange',
  margin: '1rem 0rem',
  height: '1000px',
}

export default () => {
  const renderComplete = () => {
  }//diagram.current.fitToPage()

  useEffect(() => {
    setTimeout(() => renderComplete(), 0)
  })

  const diagram = useRef()
  const {t} = useTranslation()

  const contextMenuSettings = {
    items: [
      {text: 'Save', id: 'save', target: '.e-elementcontent', iconCss: 'e-save'},
      {text: 'Load', id: 'load', target: '.e-elementcontent', iconCss: 'e-load'},
      {text: 'Clear', id: 'clear', target: '.e-elementcontent', iconCss: 'e-clear'},
    ],
    show: true,
    showCustomMenuOnly: false,
  }

  return (
      <div style={sectionStyle}>
        <div style={{width: '100%'}}>
          <DiagramComponent
              id="diagram"
              ref={diagram} width={'100%'} height={'700px'}
              snapSettings={{horizontalGridlines: gridlines, verticalGridlines: gridlines}}
              getNodeDefaults={getNodeDefaultsForDiagram}
              getConnectorDefaults={getConnectorDefaults}
              contextMenuSettings={contextMenuSettings}>
            <Inject services={[UndoRedo, DiagramContextMenu, PrintAndExport]}/>
          </DiagramComponent>
        </div>
        <Button onClick={() => diagram.current.exportDiagram({})}>{t('Export')}</Button>
        <Button onClick={() => diagram.current.print({})}>{t('Print')}</Button>
      </div>
  )
}


const getNodeDefaultsForDiagram = node => {
  const obj = {}
  if (obj.width === undefined) {
    obj.width = 145
  } else {
    const ratio = 100 / obj.width
    obj.width = 100
    obj.height *= ratio
  }
  obj.style = {fill: '#357BD2', strokeColor: 'white'}
  obj.annotations = [{style: {color: 'white', fill: 'transparent'}}]
  obj.ports = getPorts(node)
  return obj
}

const getConnectorDefaults = obj => {
  if (obj.id.indexOf('connector') !== -1) {
    obj.type = 'Orthogonal'
    obj.targetDecorator = {shape: 'Arrow', width: 10, height: 10}
  }
}

const dragEnter = args => {
  const obj = args.element
  if (obj instanceof Node) {
    const oWidth = obj.width
    const oHeight = obj.height
    const ratio = 100 / obj.width
    obj.width = 100
    obj.height *= ratio
    obj.offsetX += (obj.width - oWidth) / 2
    obj.offsetY += (obj.height - oHeight) / 2
    obj.style = {fill: '#357BD2', strokeColor: 'white'}
  }
}

const getPorts = () => ([
  {id: 'port1', shape: 'Circle', offset: {x: 0, y: 0.5}},
  {id: 'port2', shape: 'Circle', offset: {x: 0.5, y: 1}},
  {id: 'port3', shape: 'Circle', offset: {x: 1, y: 0.5}},
  {id: 'port4', shape: 'Circle', offset: {x: 0.5, y: 0}},
])
