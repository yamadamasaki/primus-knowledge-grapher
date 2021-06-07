import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Grid, Input} from 'semantic-ui-react'
import {Slider} from 'react-semantic-ui-range'
import KGColorPicker from '../KGColorPicker'

const ShapeStyleTabPane = ({nodes}) => {
  if (!nodes || !nodes[0]) return <div/>

  const [fillColor, setFillColor] = useState(nodes[0].style.fill)
  const [opacity, setOpacity] = useState(nodes[0].style.opacity)
  const [strokeColor, setStrokeColor] = useState(nodes[0].style.strokeColor)
  const [strokeWidth, setStrokeWidth] = useState(nodes[0].style.strokeWidth)
  const [strokeDashArray, setStrokeDashArray] = useState(nodes[0].style.strokeDashArray)

  const {t} = useTranslation()

  nodes.forEach(node => {
    node.style.fill = fillColor
    node.style.opacity = opacity
    node.style.strokeColor = strokeColor
    node.style.strokeWidth = strokeWidth
    node.style.strokeDashArray = strokeDashArray
  })

  return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Fill Color')}</label></Grid.Column>
          <Grid.Column width={8}>
            <KGColorPicker color={fillColor} setColor={setFillColor}/>
          </Grid.Column>
          <Grid.Column width={4}>{fillColor}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Opacity')}</label></Grid.Column>
          <Grid.Column width={8}>
            <Slider settings={{start: opacity, onChange: setOpacity, min: 0.0, max: 1.0, step: 0.05}}/>
          </Grid.Column>
          <Grid.Column width={4}>{opacity}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Stroke Color')}</label></Grid.Column>
          <Grid.Column width={8}>
            <KGColorPicker color={strokeColor} setColor={setStrokeColor}/>
          </Grid.Column>
          <Grid.Column width={4}>{strokeColor}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Stroke Width')}</label></Grid.Column>
          <Grid.Column width={8}>
            <Slider settings={{start: strokeWidth, onChange: setStrokeWidth, min: 0, max: 10, step: 0.2}}/>
          </Grid.Column>
          <Grid.Column width={4}>{strokeWidth}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Stroke Pattern')} (e.g. "2 2 ")</label></Grid.Column>
          <Grid.Column width={8}>
            <Input onChange={(_, data) => setStrokeDashArray(data.value)}/>
          </Grid.Column>
          <Grid.Column width={4}>{strokeDashArray}</Grid.Column>
        </Grid.Row>
      </Grid>
  )
}

export default ShapeStyleTabPane
