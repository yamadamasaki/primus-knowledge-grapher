import React, {useContext} from 'react'
import {Handle} from 'react-flow-renderer'
import {useTranslation} from 'react-i18next'
import {Form} from 'semantic-ui-react'
import {getNeighborsOfNode, recalculateKPI} from './utils'
import {JumpMVEDiagramContext} from '../JumpMVEDiagramSection'

export default ({id, data}) => {
  const {t} = useTranslation()

  const {elements, setElements} = useContext(JumpMVEDiagramContext)

  const downstream = getNeighborsOfNode(id, 'target', elements)
  const upstream = getNeighborsOfNode(id, 'source', elements)

  const onChange = type => e => {
    data[type] = e.target.value
    if ((type === 'goal' || type === 'current') && upstream.length > 0) recalculateKPI(upstream[0], elements, type)
    setElements(elements)
  }

  return (
      <div style={{border: '1px solid #777', padding: 10}}>
        <h3>{t('KPI')}</h3>
        <Handle type="target" position="top" id="phase" style={{background: '#555'}}/>
        <Handle type="target" position="left" id="lowers" style={{background: '#555'}}/>
        <Form>
          <Form.Input placeholder={t('Name')} onChange={onChange('name')} value={data.name}/>
          <Form.TextArea placeholder={t('Description')} onChange={onChange('description')} value={data.description}/>
          <Form.Input inline label={t('Goal')} type="number" readOnly={downstream?.length > 0}
                      onChange={onChange('goal')} value={data.goal}/>
          <Form.Input inline label={t('Current')} type="number" onChange={onChange('current')} value={data.current}/>
          <Form.TextArea label={t('Formula')} onBlur={onChange('formula')} value={data.formula}/>
          <Form.Input inline label={t('Due Date')} type="date" onChange={onChange('dueDate')} value={data.dueDate}/>
        </Form>
        <Handle type="source" position="right" id="upper" style={{background: '#555'}}/>
        <Handle type="source" position="bottom" id="kpis" style={{background: '#555'}}/>
      </div>
  )
}
