import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Grid, Input} from 'semantic-ui-react'
import {Slider} from 'react-semantic-ui-range'
import KGColorPicker from '../KGColorPicker'

const ShapeStyleTabPane = ({symbols}) => {
  if (!symbols || !symbols[0]) return <div/>

  const [fill, setFill] = useState(symbols[0].style.fill)
  const [opacity, setOpacity] = useState(symbols[0].style.opacity)
  const [strokeColor, setStrokeColor] = useState(symbols[0].style.strokeColor)
  const [strokeWidth, setStrokeWidth] = useState(symbols[0].style.strokeWidth)
  const [strokeDashArray, setStrokeDashArray] = useState(symbols[0].style.strokeDashArray)

  const setters = {
    fill: setFill,
    opacity: setOpacity,
    strokeColor: setStrokeColor,
    strokeWidth: setStrokeWidth,
    strokeDashArray: setStrokeDashArray,
  }

  const {t} = useTranslation()

  const onValueChange = name => value => {
    setters[name](value)
    symbols.forEach(symbol => symbol.style[name] = value)
  }

  return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Fill Color')}</label></Grid.Column>
          <Grid.Column width={8}>
            <KGColorPicker color={fill} setColor={onValueChange('fill')}/>
          </Grid.Column>
          <Grid.Column width={4}>{fill}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Opacity')}</label></Grid.Column>
          <Grid.Column width={8}>
            <Slider settings={{start: opacity, onChange: onValueChange('opacity'), min: 0.0, max: 1.0, step: 0.05}}/>
          </Grid.Column>
          <Grid.Column width={4}>{opacity}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Stroke Color')}</label></Grid.Column>
          <Grid.Column width={8}>
            <KGColorPicker color={strokeColor} setColor={onValueChange('strokeColor')}/>
          </Grid.Column>
          <Grid.Column width={4}>{strokeColor}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Stroke Width')}</label></Grid.Column>
          <Grid.Column width={8}>
            <Slider settings={{start: strokeWidth, onChange: onValueChange('strokeWidth'), min: 0, max: 10, step: 0.2}}/>
          </Grid.Column>
          <Grid.Column width={4}>{strokeWidth}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Stroke Pattern')} (e.g. "2 2 ")</label></Grid.Column>
          <Grid.Column width={8}>
            <Input onChange={(_, data) => onValueChange('strokeDashArray')(data.value)}/>
          </Grid.Column>
          <Grid.Column width={4}>{strokeDashArray}</Grid.Column>
        </Grid.Row>
      </Grid>
  )
}

export default ShapeStyleTabPane
