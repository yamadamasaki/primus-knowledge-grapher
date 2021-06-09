import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Checkbox, Dropdown, Grid} from 'semantic-ui-react'
import {Slider} from 'react-semantic-ui-range'
import KGColorPicker from '../KGColorPicker'

const TextStyleTabPane = ({symbols}) => {
  if (!symbols || !symbols[0]) return <div/>

  const [color, setColor] = useState(symbols[0].style.color)
  const [bold, setBold] = useState(!!symbols[0].style.bold)
  const [italic, setItalic] = useState(!!symbols[0].style.italic)
  const [fontFamily, setFontFamily] = useState(symbols[0].style.fontFamily)
  const [fontSize, setFontSize] = useState(symbols[0].style.fontSize)
  const [textAlign, setTextAlign] = useState(symbols[0].style.textAlign)

  const setters = {
    color: setColor,
    bold: setBold,
    italic: setItalic,
    fontFamily: setFontFamily,
    fontSize: setFontSize,
    textAlign: setTextAlign,
  }

  const {t} = useTranslation()

  const onValueChange = name => value => {
    setters[name](value)
    symbols.forEach(symbol => symbol.style[name] = value)
  }

  const alignOptions = [
    {key: 'Left', text: t('Left'), value: 'Left'},
    {key: 'Right', text: t('Right'), value: 'Right'},
    {key: 'Center', text: t('Center'), value: 'Center'},
    {key: 'Justify', text: t('Justify'), value: 'Justify'},
  ]

  const fontFamilies = [
    {key: 'sans-serif', text: t('sans-serif'), value: 'sans-serif'},
    {key: 'serif', text: t('serif'), value: 'serif'},
    {key: 'monospace', text: t('monospace'), value: 'monospace'},
  ]

  return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Color')}</label></Grid.Column>
          <Grid.Column width={8}>
            <KGColorPicker color={color} setColor={onValueChange('color')}/>
          </Grid.Column>
          <Grid.Column width={4}>{color}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Checkbox label={t('Bold')} checked={bold} onChange={(_, data) => onValueChange('bold')(data.checked)}/>
          </Grid.Column>
          <Grid.Column width={8}>
            <Checkbox label={t('Italic')} checked={italic} onChange={(_, data) => onValueChange('italic')(data.checked)}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Font Family')}</label></Grid.Column>
          <Grid.Column width={8}>
            <Dropdown options={fontFamilies} onChange={(_, data) => onValueChange('fontFamily')(data.value)}/>
          </Grid.Column>
          <Grid.Column width={4}>{fontFamily}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Font Size')}</label></Grid.Column>
          <Grid.Column width={8}>
            <Slider settings={{start: fontSize, onChange: onValueChange('fontSize'), min: 1, max: 64, step: 1}}/>
          </Grid.Column>
          <Grid.Column width={4}>{fontSize}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Text Align')}</label></Grid.Column>
          <Grid.Column width={8}>
            <Dropdown options={alignOptions} onChange={(_, data) => onValueChange('textAlign')(data.value)}/>
          </Grid.Column>
          <Grid.Column width={4}>{t(textAlign)}</Grid.Column>
        </Grid.Row>
      </Grid>
  )
}

export default TextStyleTabPane
