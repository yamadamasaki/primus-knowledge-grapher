import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Checkbox, Dropdown, Grid} from 'semantic-ui-react'
import {Slider} from 'react-semantic-ui-range'
import KGColorPicker from '../KGColorPicker'

const TextStyleTabPane = ({nodes}) => {
  if (!nodes || !nodes[0]) return <div/>

  const [color, setColor] = useState(nodes[0].style.color)
  const [bold, setBold] = useState(!!nodes[0].style.bold)
  const [italic, setItalic] = useState(!!nodes[0].style.italic)
  const [fontFamily, setFontFamily] = useState(nodes[0].style.fontFamily)
  const [fontSize, setFontSize] = useState(nodes[0].style.fontSize)
  const [textAlign, setTextAlign] = useState(nodes[0].style.textAlign)

  const {t} = useTranslation()

  nodes.forEach(node => {
    node.style.color = color
    node.style.bold = bold
    node.style.italic = italic
    node.style.fontFamily = fontFamily
    node.style.fontSize = fontSize
    node.style.textAlign = textAlign
  })

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
            <KGColorPicker color={color} setColor={setColor}/>
          </Grid.Column>
          <Grid.Column width={4}>{color}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Checkbox label={t('Bold')} checked={bold} onChange={(_, data) => setBold(data.checked)}/>
          </Grid.Column>
          <Grid.Column width={8}>
            <Checkbox label={t('Italic')} checked={italic} onChange={(_, data) => setItalic(data.checked)}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Font Family')}</label></Grid.Column>
          <Grid.Column width={8}>
            <Dropdown options={fontFamilies} onChange={(_, data) => {setFontFamily(data.value)}}/>
          </Grid.Column>
          <Grid.Column width={4}>{fontFamily}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Font Size')}</label></Grid.Column>
          <Grid.Column width={8}>
            <Slider settings={{start: fontSize, onChange: setFontSize, min: 1, max: 64, step: 1}}/>
          </Grid.Column>
          <Grid.Column width={4}>{fontSize}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}><label>{t('Text Align')}</label></Grid.Column>
          <Grid.Column width={8}>
            <Dropdown options={alignOptions} onChange={(_, data) => {setTextAlign(data.value)}}/>
          </Grid.Column>
          <Grid.Column width={4}>{t(textAlign)}</Grid.Column>
        </Grid.Row>
      </Grid>
  )
}

export default TextStyleTabPane
