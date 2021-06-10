import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Dropdown, Grid} from 'semantic-ui-react'
import {Slider} from 'react-semantic-ui-range'

const ConnectorEndsTabPane = ({symbols}) => {
  if (!symbols || !symbols[0]) return <div/>

  const [sheight, setSheight] = useState(symbols[0].sourceDecorator.height)
  const [theight, setTheight] = useState(symbols[0].targetDecorator.height)
  const [swidth, setSwidth] = useState(symbols[0].sourceDecorator.width)
  const [twidth, setTwidth] = useState(symbols[0].targetDecorator.width)
  const [sshape, setSshape] = useState(symbols[0].sourceDecorator.shape)
  const [tshape, setTshape] = useState(symbols[0].targetDecorator.shape)

  const setters = {
    sheight: setSheight,
    theight: setTheight,
    swidth: setSwidth,
    twidth: setTwidth,
    sshape: setSshape,
    tshape: setTshape,
  }
  const dmap = {
    s: 'sourceDecorator',
    t: 'targetDecorator',
  }

  const {t} = useTranslation()

  const onValueChange = (name, direction) => value => {
    setters[`${direction}${name}`](value)
    symbols.forEach(symbol => symbol[dmap[direction]][name] = value)
  }

  const shapes = [
    {key: 'None', text: t('None'), value: 'None'},
    {key: 'Arrow', text: t('Arrow'), value: 'Arrow'},
    {key: 'Diamond', text: t('Diamond'), value: 'Diamond'},
    //{key: 'Butt', text: t('Butt'), value: 'Butt'},
    //{key: 'Path', text: t('Path'), value: 'Path'},
    {key: 'OpenArrow', text: t('OpenArrow'), value: 'OpenArrow'},
    {key: 'Circle', text: t('Circle'), value: 'Circle'},
    {key: 'Square', text: t('Square'), value: 'Square'},
    //{key: 'Fletch', text: t('Fletch'), value: 'Fletch'},
    //{key: 'OpenFetch', text: t('OpenFetch'), value: 'OpenFetch'},
    {key: 'IndentedArrow', text: t('IndentedArrow'), value: 'IndentedArrow'},
    {key: 'OutdentedArrow', text: t('OutdentedArrow'), value: 'OutdentedArrow'},
    {key: 'DoubleArrow', text: t('DoubleArrow'), value: 'DoubleArrow'},
  ]

  return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}/>
          <Grid.Column width={7}><label>{t('Source')}</label></Grid.Column>
          <Grid.Column width={7}><label>{t('Target')}</label></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={2}><label>{t('Width')}</label></Grid.Column>
          <Grid.Column width={4}>
            <Slider settings={{start: swidth, onChange: onValueChange('width', 's'), min: 0, max: 20, step: 0.2}}/>
          </Grid.Column>
          <Grid.Column width={3}>{swidth}</Grid.Column>
          <Grid.Column width={4}>
            <Slider settings={{start: twidth, onChange: onValueChange('width', 't'), min: 0, max: 20, step: 0.2}}/>
          </Grid.Column>
          <Grid.Column width={3}>{twidth}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={2}><label>{t('Height')}</label></Grid.Column>
          <Grid.Column width={4}>
            <Slider settings={{start: sheight, onChange: onValueChange('height', 's'), min: 0, max: 20, step: 0.2}}/>
          </Grid.Column>
          <Grid.Column width={3}>{sheight}</Grid.Column>
          <Grid.Column width={4}>
            <Slider settings={{start: theight, onChange: onValueChange('height', 't'), min: 0, max: 20, step: 0.2}}/>
          </Grid.Column>
          <Grid.Column width={3}>{theight}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={2}><label>{t('Shape')}</label></Grid.Column>
          <Grid.Column width={4}>
            <Dropdown options={shapes} onChange={(_, data) => onValueChange('shape', 's')(data.value)}/>
          </Grid.Column>
          <Grid.Column width={3}>{sshape}</Grid.Column>
          <Grid.Column width={4}>
            <Dropdown options={shapes} onChange={(_, data) => onValueChange('shape', 't')(data.value)}/>
          </Grid.Column>
          <Grid.Column width={3}>{tshape}</Grid.Column>
        </Grid.Row>
      </Grid>
  )
}

export default ConnectorEndsTabPane
