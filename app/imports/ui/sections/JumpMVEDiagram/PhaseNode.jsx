import React, {memo, useContext, useState} from 'react'
import {Handle} from 'react-flow-renderer'
import {useTranslation} from 'react-i18next'
import {Form} from 'semantic-ui-react'
import {JumpMVEDiagramContext} from '../JumpMVEDiagramSection'
import {isExperimentToPhase, isPhaseToKpi, isPhaseToPhase, isValidConnection} from './utils'
import {format} from 'date-fns'

const PhaseNode = memo(({id, data}) => {
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
      <div style={{border: '1px solid #777', padding: 10}}>
        <Handle type="target" position="top" id="experiment" style={{background: '#555'}}
                isValidConnection={isValidConnection(elements, isExperimentToPhase)}/>
        <Handle type="target" position="left" id="previous" style={{background: '#555'}}
                isValidConnection={isValidConnection(elements, isPhaseToPhase)}/>
        <Form>
          <Form.Input inline label={<span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{t('Phase')}: </span>}
                      placeholder={t('Name')} onChange={onChange('name')} value={state.name}/>
          <Form.TextArea placeholder={t('Description')} onChange={onChange('description')} value={state.description}/>
          <Form.Input inline label={t('Due Date')} type="date" onChange={onChange('dueDate')} value={state.dueDate}/>
        </Form>
        <Handle type="source" position="right" id="next" style={{background: '#555'}}
                isValidConnection={isValidConnection(elements, isPhaseToPhase)}/>
        <Handle type="source" position="bottom" id="kpis" style={{background: '#555'}}
                isValidConnection={isValidConnection(elements, isPhaseToKpi)}/>
      </div>
  )
})

PhaseNode.newData = {name: '', description: '', dueDate: format(new Date(), 'yyyy-MM-dd')}

export default PhaseNode
