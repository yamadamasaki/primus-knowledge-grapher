import React, {memo, useContext} from 'react'
import {Handle} from 'react-flow-renderer'
import {useTranslation} from 'react-i18next'
import {Form} from 'semantic-ui-react'
import {isExperimentToPhase, isValidConnection} from './utils'
import {JumpMVEDiagramContext} from '../JumpMVEDiagramSection'

export default memo(({data, addNode}) => {
  const {t} = useTranslation()

  const {elements, setElements} = useContext(JumpMVEDiagramContext)

  return (
      <>
        <h3>{t('Experiment')}: {data.name}</h3>
        <Form>
          <Form.TextArea placeholder={t('Description')}/>
          <Form.Input inline label={t('Due Date')} type="date"/>
        </Form>
        <Handle type="source" position="bottom" id="phases" style={{background: '#555'}}
                isValidConnection={isValidConnection(elements, isExperimentToPhase)}/>
      </>
  )
})
