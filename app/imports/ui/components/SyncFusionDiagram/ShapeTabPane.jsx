import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Dropdown, Grid} from 'semantic-ui-react'
import {Slider} from 'react-semantic-ui-range'

const ShapeTabPane = ({symbols}) => {
  if (!symbols || !symbols[0]) return <div/>

  const [cornerRadius, setCornerRadius] = useState(symbols[0].shape.cornerRadius)
  const [shape, setShape] = useState(symbols[0].shape.shape)

  const {t} = useTranslation()

  symbols.forEach(symbol => {
    symbol.shape.cornerRadius = cornerRadius
    symbol.shape.shape = shape
  })

  const sliderDefaults = {min: 0, max: 32, step: 0.1}
  const shapes = [
    {key: 'Rectangle', text: t('Rectangle'), value: 'Rectangle'},
    {key: 'Ellipse', text: t('Ellipse'), value: 'Ellipse'},
    {key: 'Hexagon', text: t('Hexagon'), value: 'Hexagon'},
    {key: 'Parallelogram', text: t('Parallelogram'), value: 'Parallelogram'},
    {key: 'Triangle', text: t('Triangle'), value: 'Triangle'},
    {key: 'Plus', text: t('Plus'), value: 'Plus'},
    {key: 'Star', text: t('Star'), value: 'Star'},
    {key: 'Pentagon', text: t('Pentagon'), value: 'Pentagon'},
    {key: 'Heptagon', text: t('Heptagon'), value: 'Heptagon'},
    {key: 'Octagon', text: t('Octagon'), value: 'Octagon'},
    {key: 'Trapezoid', text: t('Trapezoid'), value: 'Trapezoid'},
    {key: 'Decagon', text: t('Decagon'), value: 'Decagon'},
    {key: 'RightTriangle', text: t('RightTriangle'), value: 'RightTriangle'},
    {key: 'Cylinder', text: t('Cylinder'), value: 'Cylinder'},
    {key: 'Diamond', text: t('Diamond'), value: 'Diamond'},
    {key: 'Polygon', text: t('Polygon'), value: 'Polygon'},
  ]

  return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Corner Radius')}</label></Grid.Column>
          <Grid.Column width={8}>
            <Slider settings={{start: cornerRadius, onChange: setCornerRadius, ...sliderDefaults}}/>
          </Grid.Column>
          <Grid.Column width={4}>{cornerRadius}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Shape')}</label></Grid.Column>
          <Grid.Column width={8}>
            <Dropdown options={shapes} onChange={(_, data) => {setShape(data.value)}}/>
          </Grid.Column>
          <Grid.Column width={4}>{t(shape)}</Grid.Column>
        </Grid.Row>
      </Grid>
  )
}

export default ShapeTabPane
