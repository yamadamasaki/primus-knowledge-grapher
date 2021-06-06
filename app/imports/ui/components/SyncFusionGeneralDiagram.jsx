import './SyncFusionGeneralDiagram.css'
import * as React from 'react'
import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {DiagramComponent, SymbolPaletteComponent} from '@syncfusion/ej2-react-diagrams'
import {
  DiagramContextMenu,
  Inject,
  PrintAndExport,
  UndoRedo,
} from '@syncfusion/ej2-react-diagrams/dist/es6/ej2-react-diagrams.es2015.js'
import {Button, Segment, Sidebar, Tab} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import NodeStyleTabPane from './SyncFusionDiagram/NodeStyleTabPane'

const interval = [
  1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
]
const gridlines = {lineColor: '#e0e0e0', lineIntervals: interval}

const SelectedNodesContext = createContext({})

const SyncFusionGeneralDiagram = ({sidebarVisible, setSidebarVisible}) => {
  const renderComplete = () => {
  }//diagram.current.fitToPage()

  useEffect(() => {
    setTimeout(() => renderComplete(), 0)
  })

  const diagram = useRef()
  const {t} = useTranslation()

  const nodesSettingMenuItemId = 'nodes-setting'
  const connectorsSettingMenuItemId = 'connectors-setting'

  const {selectedNodes, setSelectedNodes} = useContext(SelectedNodesContext)

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
        setSelectedNodes(diagram.current.selectedItems.nodes)
        setSidebarVisible(true)
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
              symbolHeight={40} symbolWidth={40}
              symbolMargin={{left: 5, right: 5, top: 5, bottom: 5}} getSymbolInfo={() => ({fit: true})}/>
        </div>
        <div style={{width: '100%'}}>
          <DiagramComponent
              id="diagram"
              ref={diagram} width={'100%'} height={'800px'}
              snapSettings={{horizontalGridlines: gridlines, verticalGridlines: gridlines}}
              contextMenuSettings={contextMenuSettings}
              contextMenuClick={menuClicked} contextMenuOpen={menuWillOpen}>
            <Inject services={[UndoRedo, DiagramContextMenu, PrintAndExport]}/>
          </DiagramComponent>
        </div>
        <Button onClick={() => diagram.current.exportDiagram({})}>{t('Export')}</Button>
        <Button onClick={() => diagram.current.print({})}>{t('Print')}</Button>
      </div>
  )
}

const SidebarWrapper = () => {
  const [visible, setVisible] = useState(false)
  const [selectedNodes, setSelectedNodes] = useState([])
  console.log({selectedNodes})

  const {t} = useTranslation()

  const sidebarPanes = [
    {menuItem: t('Node Style'), render: () => <Tab.Pane><NodeStyleTabPane nodes={selectedNodes}/></Tab.Pane>},
    {menuItem: t('Shape'), render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>},
    {menuItem: t('Shape Style'), render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>},
    {menuItem: t('Text Style'), render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>},
    {menuItem: t('Annotation'), render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>},
    {menuItem: t('Shadow'), render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>},
  ]

  return (
      <SelectedNodesContext.Provider value={{selectedNodes, setSelectedNodes}}>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
              as={Tab}
              animation="push"
              direction="bottom"
              icon="labeled"
              onHide={() => setVisible(false)}
              visible={visible}
              width="thin"
              panes={sidebarPanes}/>
          <Sidebar.Pusher>
            <SyncFusionGeneralDiagram sidebarVisible={visible} setSidebarVisible={setVisible}/>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </SelectedNodesContext.Provider>
  )
}

export default SidebarWrapper
