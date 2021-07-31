import React from 'react'
import {Container, Grid} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'

export default () => {
  const {t} = useTranslation()

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
      <Container>
        <Grid>
          <Grid.Column>
            <div onDragStart={event => onDragStart(event, 'phase')} draggable>
              {t('Phase')}
            </div>
          </Grid.Column>
          <Grid.Column>
            <div onDragStart={event => onDragStart(event, 'kpi')} draggable>
              {t('KPI')}
            </div>
          </Grid.Column>
        </Grid>
      </Container>
  )
}
