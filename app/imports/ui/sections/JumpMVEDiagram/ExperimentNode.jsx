import React, {memo, useContext, useState} from 'react'
import {Handle} from 'react-flow-renderer'
import {useTranslation} from 'react-i18next'
import {Form} from 'semantic-ui-react'
import {isExperimentToPhase, isValidConnection} from './utils'
import {JumpMVEDiagramContext} from '../JumpMVEDiagramSection'
import {format} from 'date-fns'

const ExperimentNode =  memo(({id, data}) => {
  const {t} = useTranslation()

  const {elements, setElements} = useContext(JumpMVEDiagramContext)
  const [state, setState] = useState(data)

  const onChange = field => e => {
    const newData = {...state, [field]: e.target.value}
    setState(newData)
    const newElements = elements.map(element => element.id === id ? {...element, data: newData} : element)
    setElements(newElements)
  }

  return (
      <>
        <h3>{t('Experiment')}: {data.name}</h3>
        <Form>
          <Form.TextArea placeholder={t('Description')} onChange={onChange('description')} value={state.description}/>
          <Form.Input inline label={t('Due Date')} type="date" onChange={onChange('dueDate')} value={state.dueDate}/>
        </Form>
        <Handle type="source" position="bottom" id="phases" style={{background: '#555'}}
                isValidConnection={isValidConnection(elements, isExperimentToPhase)}/>
      </>
  )
})

ExperimentNode.newData = {name: '', description: '', dueDate: format(new Date(), 'yyyy-MM-dd')}

export default ExperimentNode
