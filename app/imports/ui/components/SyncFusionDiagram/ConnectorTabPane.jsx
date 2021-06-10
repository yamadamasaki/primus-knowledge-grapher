import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Dropdown, Grid} from 'semantic-ui-react'
import {Slider} from 'react-semantic-ui-range'

const ConnectorTabPane = ({symbols}) => {
  if (!symbols || !symbols[0]) return <div/>

  const [cornerRadius, setCornerRadius] = useState(symbols[0].cornerRadius)
  const [type, setType] = useState(symbols[0].type)

  const setters = {
    cornerRadius: setCornerRadius,
    type: setType,
  }

  const {t} = useTranslation()

  const onValueChange = name => value => {
    setters[name](value)
    symbols.forEach(symbol => symbol[name] = value)
  }

  const sliderDefaults = {min: 0, max: 32, step: 0.1}
  const types = [
    {key: 'Straight', text: t('Straight'), value: 'Straight'},
    {key: 'Orthogonal', text: t('Orthogonal'), value: 'Orthogonal'},
    {key: 'Bezier', text: t('Bezier'), value: 'Bezier'},
  ]

  return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Corner Radius')}</label></Grid.Column>
          <Grid.Column width={8}>
            <Slider settings={{start: cornerRadius, onChange: onValueChange('cornerRadius'), ...sliderDefaults}}/>
          </Grid.Column>
          <Grid.Column width={4}>{cornerRadius}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Connector Type')}</label></Grid.Column>
          <Grid.Column width={8}>
            <Dropdown options={types} onChange={(_, data) => onValueChange('type')(data.value)}/>
          </Grid.Column>
          <Grid.Column width={4}>{t(type)}</Grid.Column>
        </Grid.Row>
      </Grid>
  )
}

export default ConnectorTabPane
