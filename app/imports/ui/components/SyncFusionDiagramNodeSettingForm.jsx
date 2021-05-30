import React from 'react'

const reactControlPanel = require('react-control-panel')
const ControlPanel = reactControlPanel.default
const {
  Range: CPRange,
  Interval: CPInterval,
  Text: CPText,
  Checkbox: CPCheckbox,
  Color: CPColor,
  Button: CPButton,
  Select: CPSelect,
  Multibox: CPMultibox,
} = reactControlPanel

const initialState = {
  'range slider': 20,
  'stepped slider': 0.6,
  interval: [25, 50],
  text: 'my setting',
  checkbox: true,
  'color rgb': 'rgb(100, 200, 100)',
  'color hex': '#30b2ba',
  selection: 'option 1',
  'multiple checkboxes': [true, true],
}

const DemoPanel = () => (
    <ControlPanel
        theme="dark"
        title="Demo Panel"
        initialState={initialState}
        onChange={console.log}
        width={500}
        style={{marginRight: 30}}
    >
      <CPRange label="range slider" min={0} max={100}/>
      <CPRange label="stepped slider" min={0} max={1}/>
      <CPInterval label="interval" min={0} max={100}/>
      <CPText label="text"/>
      <CPCheckbox label="checkbox"/>
      <CPColor label="color rgb" format="rgb"/>
      <CPColor label="color hex" format="hex"/>
      <CPButton label="gimme an alert" action={() => alert('clicked')}/>
      <CPSelect label="selection" options={{'option 1': 1, 'option 2': 2}}/>
      <CPMultibox
          label="multiple checkboxes"
          colors={['rgb(100,120,230)', 'rgb(210,100,190)']}
          names={['box1', 'box2']}
      />
    </ControlPanel>
)

const SyncFusionDiagramNodeSettingForm = ({nodes, setNodes}) => {
  return (
      <>
        <h1>SyncFusionDiagramNodeSettingForm</h1>
        <ul>
          <DemoPanel/>
        </ul>
      </>
  )
}

export default SyncFusionDiagramNodeSettingForm
