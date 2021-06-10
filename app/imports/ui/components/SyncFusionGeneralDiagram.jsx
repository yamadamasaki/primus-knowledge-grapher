import './SyncFusionGeneralDiagram.css'
import * as React from 'react'
import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {DiagramComponent, SymbolPaletteComponent} from '@syncfusion/ej2-react-diagrams'
import {AnnotationConstraints} from '@syncfusion/ej2-diagrams/src/diagram/enum/enum'
import {
  DiagramContextMenu,
  Inject,
  PrintAndExport,
  UndoRedo,
} from '@syncfusion/ej2-react-diagrams/dist/es6/ej2-react-diagrams.es2015.js'
import {Button, Segment, Sidebar, Tab} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import ShapeTabPane from './SyncFusionDiagram/ShapeTabPane'
import ShapeStyleTabPane from './SyncFusionDiagram/ShapeStyleTabPane'
import TextStyleTabPane from './SyncFusionDiagram/TextStyleTabPane'
import ConnectorTabPane from './SyncFusionDiagram/ConnectorTabPane'
import ConnectorStyleTabPane from './SyncFusionDiagram/ConnectorStyleTabPane'
import ConnectorEndsTabPane from './SyncFusionDiagram/ConnectorEndsTabPane'

const NODES = 'nodes'
const CONNECTORS = 'connectors'

const interval = [
  1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
]
const gridlines = {lineColor: '#e0e0e0', lineIntervals: interval}

const SelectedSymbolsContext = createContext({})

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

  const {selectedSymbols, setSelectedSymbols, settingMode, setSettingMode} = useContext(SelectedSymbolsContext)

  const contextMenuSettings = {
    items: [
      {separator: true},
      {text: `${t('Node settings')}...`, id: nodesSettingMenuItemId, target: 'e-diagram-content'},
      {text: `${t('Connector settings')}...`, id: connectorsSettingMenuItemId, target: 'e-diagram-content'},
    ],
    show: true,
    showCustomMenuOnly: false,
  }

  const menuClicked = event => {
    const item = event.item.id
    switch (item) {
      case nodesSettingMenuItemId:
        setSelectedSymbols(diagram.current.selectedItems.nodes)
        setSettingMode(NODES)
        setSidebarVisible(true)
        break
      case connectorsSettingMenuItemId:
        setSelectedSymbols(diagram.current.selectedItems.connectors)
        setSettingMode(CONNECTORS)
        setSidebarVisible(true)
        break
      default:
        setSelectedSymbols([])
        setSettingMode()
        break
    }
  }
  const menuWillOpen = event => {
    const nNodeSelected = diagram.current.selectedItems.nodes.length
    const nEdgeSelected = diagram.current.selectedItems.connectors.length
    if (nNodeSelected === 0 || nEdgeSelected !== 0) event.hiddenItems.push(nodesSettingMenuItemId)
    if (nEdgeSelected === 0 || nNodeSelected !== 0) event.hiddenItems.push(connectorsSettingMenuItemId)
  }

  const symbols = [
    {
      id: 'Node',
      shape: {type: 'Basic', shape: 'Rectangle'},
      annotations: [{content: t('label'), constraints: AnnotationConstraints.Interaction}],
    },
    {
      id: 'Link',
      type: 'Orthogonal',
      sourcePoint: {x: 0, y: 0}, targetPoint: {x: 40, y: 40},
      targetDecorator: {shape: 'Arrow', style: {strokeColor: '#757575', fill: '#757575'}},
      style: {strokeWidth: 1, strokeColor: '#757575'},
      annotations: [{content: t('label'), constraints: AnnotationConstraints.Interaction}],
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
  const [selectedSymbols, setSelectedSymbols] = useState([])
  const [settingMode, setSettingMode] = useState() // setSettingMode: NODES, CONNECTORS, undefined

  const {t} = useTranslation()

  const sidebarPanes = ({
    [NODES]: [
      {menuItem: t('Shape'), render: () => <Tab.Pane><ShapeTabPane symbols={selectedSymbols}/></Tab.Pane>},
      {menuItem: t('Shape Style'), render: () => <Tab.Pane><ShapeStyleTabPane symbols={selectedSymbols}/></Tab.Pane>},
      {menuItem: t('Text Style'), render: () => <Tab.Pane><TextStyleTabPane symbols={selectedSymbols}/></Tab.Pane>},
      {menuItem: t('Annotation'), render: () => <Tab.Pane>{t('Not Yet Implemented')}</Tab.Pane>},
      {menuItem: t('Shadow'), render: () => <Tab.Pane>{t('Not Yet Implemented')}</Tab.Pane>},
      {menuItem: t('Gradient'), render: () => <Tab.Pane>{t('Not Yet Implemented')}</Tab.Pane>},
    ],
    [CONNECTORS]: [
      {menuItem: t('Connector'), render: () => <Tab.Pane><ConnectorTabPane symbols={selectedSymbols}/></Tab.Pane>},
      {menuItem: t('Connector Style'), render: () => <Tab.Pane><ConnectorStyleTabPane symbols={selectedSymbols}/></Tab.Pane>},
      {menuItem: t('Connector Ends'), render: () => <Tab.Pane><ConnectorEndsTabPane symbols={selectedSymbols}/></Tab.Pane>},
      {menuItem: t('Annotation'), render: () => <Tab.Pane>{t('Not Yet Implemented')}</Tab.Pane>},
    ],
    undefined: [],
  })[settingMode]

  return (
      <SelectedSymbolsContext.Provider value={{selectedSymbols, setSelectedSymbols, settingMode, setSettingMode}}>
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
      </SelectedSymbolsContext.Provider>
  )
}

export default SidebarWrapper
