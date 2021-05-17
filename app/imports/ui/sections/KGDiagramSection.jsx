import './KGDiagramSection.css'
import * as React from 'react'
import {DiagramComponent, SymbolPaletteComponent} from '@syncfusion/ej2-react-diagrams'
import {Node} from '@syncfusion/ej2-diagrams'

/**
 * Diagram Default sample
 */
//Initialize the flowShapes for the symbol palatte
const flowShapes = [
  {id: 'Terminator', shape: {type: 'Flow', shape: 'Terminator'}},
  {id: 'Process', shape: {type: 'Flow', shape: 'Process'}},
  {id: 'Decision', shape: {type: 'Flow', shape: 'Decision'}},
  {id: 'Document', shape: {type: 'Flow', shape: 'Document'}},
  {id: 'PreDefinedProcess', shape: {type: 'Flow', shape: 'PreDefinedProcess'}},
  {id: 'PaperTap', shape: {type: 'Flow', shape: 'PaperTap'}},
  {id: 'DirectData', shape: {type: 'Flow', shape: 'DirectData'}},
  {id: 'SequentialData', shape: {type: 'Flow', shape: 'SequentialData'}},
  {id: 'Sort', shape: {type: 'Flow', shape: 'Sort'}},
  {id: 'MultiDocument', shape: {type: 'Flow', shape: 'MultiDocument'}},
  {id: 'Collate', shape: {type: 'Flow', shape: 'Collate'}},
  {id: 'SummingJunction', shape: {type: 'Flow', shape: 'SummingJunction'}},
  {id: 'Or', shape: {type: 'Flow', shape: 'Or'}},
  {id: 'InternalStorage', shape: {type: 'Flow', shape: 'InternalStorage'}},
  {id: 'Extract', shape: {type: 'Flow', shape: 'Extract'}},
  {id: 'ManualOperation', shape: {type: 'Flow', shape: 'ManualOperation'}},
  {id: 'Merge', shape: {type: 'Flow', shape: 'Merge'}},
  {id: 'OffPageReference', shape: {type: 'Flow', shape: 'OffPageReference'}},
  {id: 'SequentialAccessStorage', shape: {type: 'Flow', shape: 'SequentialAccessStorage'}},
  {id: 'Annotation', shape: {type: 'Flow', shape: 'Annotation'}},
  {id: 'Annotation2', shape: {type: 'Flow', shape: 'Annotation2'}},
  {id: 'Data', shape: {type: 'Flow', shape: 'Data'}},
  {id: 'Card', shape: {type: 'Flow', shape: 'Card'}},
  {id: 'Delay', shape: {type: 'Flow', shape: 'Delay'}},
]

const connectorSymbols = [
  {
    id: 'Link1',
    type: 'Orthogonal',
    sourcePoint: {x: 0, y: 0},
    targetPoint: {x: 60, y: 60},
    targetDecorator: {shape: 'Arrow', style: {strokeColor: '#757575', fill: '#757575'}},
    style: {strokeWidth: 1, strokeColor: '#757575'},
  },
  {
    id: 'link3',
    type: 'Orthogonal',
    sourcePoint: {x: 0, y: 0},
    targetPoint: {x: 60, y: 60},
    style: {strokeWidth: 1, strokeColor: '#757575'},
    targetDecorator: {shape: 'None'},
  },
  {
    id: 'Link21',
    type: 'Straight',
    sourcePoint: {x: 0, y: 0},
    targetPoint: {x: 60, y: 60},
    targetDecorator: {shape: 'Arrow', style: {strokeColor: '#757575', fill: '#757575'}},
    style: {strokeWidth: 1, strokeColor: '#757575'},
  },
  {
    id: 'link23',
    type: 'Straight',
    sourcePoint: {x: 0, y: 0},
    targetPoint: {x: 60, y: 60},
    style: {strokeWidth: 1, strokeColor: '#757575'},
    targetDecorator: {shape: 'None'},
  },
  {
    id: 'link33',
    type: 'Bezier',
    sourcePoint: {x: 0, y: 0},
    targetPoint: {x: 60, y: 60},
    style: {strokeWidth: 1, strokeColor: '#757575'},
    targetDecorator: {shape: 'None'},
  },
]

const interval = [
  1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
]

const gridlines = {lineColor: '#e0e0e0', lineIntervals: interval}

let diagramInstance

export default class extends React.PureComponent {
  renderComplete() {
    addEvents()
    diagramInstance.fitToPage()
  }

  componentDidMount() {
    setTimeout(() => {
      this.renderComplete()
    })
  }

  render() {
    return (
        <div className="control-pane">
          <div className="control-section">
            <div style={{width: '100%'}}>
              <div className="sb-mobile-palette-bar">
                <div id="palette-icon" style={{float: 'right', role: 'button'}}
                     className="e-ddb-icons1 e-toggle-palette"/>
              </div>
              <div id="palette-space" className="sb-mobile-palette">
                <SymbolPaletteComponent
                    id="symbolpalette"
                    expandMode="Multiple" palettes={palettes}
                    width={'100%'} height={'700px'} symbolHeight={60} symbolWidth={60}
                    getNodeDefaults={getNodeDefaultsForPalette}
                    symbolMargin={{left: 15, right: 15, top: 15, bottom: 15}} getSymbolInfo={() => ({fit: true})}/>
              </div>
              <div id="diagram-space" className="sb-mobile-diagram">
                <DiagramComponent
                    id="diagram"
                    ref={diagram => (diagramInstance = diagram)} width={'100%'} height={'700px'}
                    snapSettings={{horizontalGridlines: gridlines, verticalGridlines: gridlines}}
                    getNodeDefaults={getNodeDefaultsForDiagram}
                    getConnectorDefaults={getConnectorDefaults}
                    dragEnter={dragEnter}/>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

const getNodeDefaultsForPalette = symbol => {
  switch (symbol.id) {
    case 'Terminator':
    case 'Process':
    case 'Delay':
      symbol.width = 80
      symbol.height = 40
      break
    case 'Decision':
    case 'Document':
    case 'PreDefinedProcess':
    case 'PaperTap':
    case 'DirectData':
    case 'MultiDocument':
    case 'Data':
      symbol.width = 50
      symbol.height = 40
      break
    default:
      symbol.width = 50
      symbol.height = 50
      break
  }
  symbol.style.strokeColor = '#757575'
}

const palettes = [
  {
    id: 'flow',
    expanded: true,
    symbols: flowShapes,
    iconCss: 'e-diagram-icons1 e-diagram-flow',
    title: 'Flow Shapes',
  },
  {
    id: 'connectors',
    expanded: true,
    symbols: connectorSymbols,
    iconCss: 'e-diagram-icons1 e-diagram-connector',
    title: 'Connectors',
  },
]

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

const addEvents = () => {
  const isMobile = window.matchMedia('(max-width:550px)').matches
  if (isMobile) {
    const paletteIcon = document.getElementById('palette-icon')
    if (paletteIcon) {
      paletteIcon.addEventListener('click', openPalette, false)
    }
  }
}
