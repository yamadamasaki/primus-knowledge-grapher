import './SyncFusionGeneralDiagram.css'
import * as React from 'react'
import {useEffect, useRef, useState} from 'react'
import {DiagramComponent, SymbolPaletteComponent} from '@syncfusion/ej2-react-diagrams'
import {
  DiagramContextMenu,
  Inject,
  PrintAndExport,
  UndoRedo,
} from '@syncfusion/ej2-react-diagrams/dist/es6/ej2-react-diagrams.es2015.js'
import {Node} from '@syncfusion/ej2-diagrams'
import {Button} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import SyncFusionDiagramNodeSettingModal from './SyncFusionDiagramNodeSettingModal'

const interval = [
  1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
]
const gridlines = {lineColor: '#e0e0e0', lineIntervals: interval}

export default () => {
  const renderComplete = () => {
  }//diagram.current.fitToPage()

  useEffect(() => {
    setTimeout(() => renderComplete(), 0)
  })

  const diagram = useRef()
  const {t} = useTranslation()

  const nodesSettingMenuItemId = 'nodes-setting'
  const connectorsSettingMenuItemId = 'connectors-setting'

  const [nodeModalOpen, setNodeModalOpen] = useState(false)
  const [selectedNodes, setSelectedNodes] = useState()

  const contextMenuSettings = {
    items: [
      {separator: true},
      {text: 'Node setting...', id: nodesSettingMenuItemId, target: 'e-diagram-content'},
      {text: 'Connector setting...', id: connectorsSettingMenuItemId, target: 'e-diagram-content'},
    ],
    show: true,
    showCustomMenuOnly: false,
  }

  const menuClicked = event => {
    const item = event.item.id
    switch (item) {
      case nodesSettingMenuItemId:
        //setSelectedNodes(JSON.parse(JSON.stringify(diagram.current.selectedItems.nodes)))
        setSelectedNodes(diagram.current.selectedItems.nodes)
        setNodeModalOpen(true)
        break
      case connectorsSettingMenuItemId:
      default:
    }
  }
  const menuWillOpen = event => {
    const nNodeSelected = diagram.current.selectedItems.nodes.length
    const nEdgeSelected = diagram.current.selectedItems.connectors.length
    if (nNodeSelected === 0) event.hiddenItems.push(nodesSettingMenuItemId)
    if (nEdgeSelected === 0) event.hiddenItems.push(connectorsSettingMenuItemId)
  }

  const symbols = [
    {id: 'Node', shape: {type: 'Basic', shape: 'Rectangle'}},
    {
      id: 'Link',
      type: 'Orthogonal',
      sourcePoint: {x: 0, y: 0}, targetPoint: {x: 40, y: 40},
      targetDecorator: {shape: 'Arrow', style: {strokeColor: '#757575', fill: '#757575'}},
      style: {strokeWidth: 1, strokeColor: '#757575'},
    },
    {id: 'Text', shape: {type: 'Text', content: 'Text'}},
    //{id: 'Image', shape: {type: "Image", source: "/images/meteor-logo.png"}}, // DOES NOT WORK
    {id: 'Image', shape: {type: 'Image', source: 'https://www.w3schools.com/images/w3schools_green.jpg'}},
  ]

  const palettes = [
    {id: 'palette', symbols, title: t('Symbols')},
  ]

  return (
      <div>
        <div>
          <SymbolPaletteComponent
              id="symbol-palette"
              palettes={palettes}
              width={'100%'} height={'100px'} symbolHeight={40} symbolWidth={40}
              symbolMargin={{left: 5, right: 5, top: 5, bottom: 5}} getSymbolInfo={() => ({fit: true})}/>
        </div>
        <div style={{width: '100%'}}>
          <DiagramComponent
              id="diagram"
              ref={diagram} width={'100%'} height={'700px'}
              snapSettings={{horizontalGridlines: gridlines, verticalGridlines: gridlines}}
              contextMenuSettings={contextMenuSettings}
              contextMenuClick={menuClicked} contextMenuOpen={menuWillOpen}>
            <Inject services={[UndoRedo, DiagramContextMenu, PrintAndExport]}/>
          </DiagramComponent>
        </div>
        <SyncFusionDiagramNodeSettingModal
            modalOpen={nodeModalOpen} setModalOpen={setNodeModalOpen}
            nodes={selectedNodes} setNodes={setSelectedNodes}
        />
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
