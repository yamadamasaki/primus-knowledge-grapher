import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Form, Grid} from 'semantic-ui-react'
import KGColorPicker from '../KGColorPicker'
import {Slider} from 'react-semantic-ui-range'

const NodeStyleTabPane = ({nodes}) => {
  if (!nodes || !nodes[0]) return <div/>

  console.log({nodes})

  const [bgColor, setBgColor] = useState(nodes[0].backgroundColor)
  const [borderColor, setBorderColor] = useState(nodes[0].borderColor)
  const [borderWidth, setBorderWidth] = useState(nodes[0].borderWidth)

  const {t} = useTranslation()

  console.log({bgColor, borderColor})

  nodes.forEach(node => {
    node.backgroundColor = bgColor
    node.borderColor = borderColor
    node.borderWidth = borderWidth
  })

  const sliderDefaults = {min: 0, max: 10, step: 0.1}

  return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Border Width')}</label></Grid.Column>
          <Grid.Column width={8}>
            <Slider settings={{start: nodes[0].borderWidth, onChange: setBorderWidth, ...sliderDefaults}}/>
          </Grid.Column>
          <Grid.Column width={4}>{borderWidth}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Border Color')}</label></Grid.Column>
          <Grid.Column width={8}>
            <Form.Field><KGColorPicker color={borderColor} setColor={setBorderColor}/></Form.Field>
          </Grid.Column>
          <Grid.Column width={4}>{borderColor}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Background Color')}</label></Grid.Column>
          <Grid.Column width={8}>
            <Form.Field><KGColorPicker color={bgColor} setColor={setBgColor}/></Form.Field>
          </Grid.Column>
          <Grid.Column width={4}>{bgColor}</Grid.Column>
        </Grid.Row>
      </Grid>
  )
}

export default NodeStyleTabPane
