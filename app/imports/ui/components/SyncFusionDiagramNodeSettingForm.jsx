import React, {useState} from 'react'
import {Container, Form, Tab} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import KGColorPicker from './KGColorPicker'

const NodeStyleForm = ({nodes}) => {
  console.log(nodes[0])
  const [bgColor, setBgColor] = useState(nodes[0].backgroundColor)
  const [borderColor, setBorderColor] = useState(nodes[0].borderColor)

  const {t} = useTranslation()

  nodes.forEach(node => {
    node.backgroundColor = bgColor
  })

  return (
      <Form>
        <Form.Group inline>
          <label>{t('Border Width')}</label>
          <Form.Field></Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>{t('Border Color')}</label>
          <Form.Field><KGColorPicker color={borderColor} setColor={setBorderColor}/></Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>{t('Background Color')}</label>
          <Form.Field><KGColorPicker color={bgColor} setColor={setBgColor}/></Form.Field>
        </Form.Group>
      </Form>
  )
}

const SyncFusionDiagramNodeSettingForm = ({nodes, setNodes}) => {
  const {t} = useTranslation()

  const panes = [
    { menuItem: t('Node Style'), render: () => <Tab.Pane><NodeStyleForm nodes={nodes}/></Tab.Pane> },
    { menuItem: t('Shape'), render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: t('Shape Style'), render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: t('Text Style'), render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: t('Annotation'), render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: t('Shadow'), render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  ]

  return (
      <>
        <h1>SyncFusionDiagramNodeSettingForm</h1>
        <Tab panes={panes} />
        <ul>
          {nodes.map((item, index) => (<li key={index}>{item.id}</li>))}
        </ul>
      </>
  )
}

export default SyncFusionDiagramNodeSettingForm
