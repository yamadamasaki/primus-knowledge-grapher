import React, {useContext, useEffect, useState} from 'react'
import {Handle} from 'react-flow-renderer'
import {useTranslation} from 'react-i18next'
import {Form} from 'semantic-ui-react'
import {getNeighborsOfNode} from './utils'
import {JumpMVEDiagramContext} from '../JumpMVEDiagramSection'
import {format} from 'date-fns'

export default node => {
  const {id, data} = node
  const {t} = useTranslation()

  const {elements, setElements} = useContext(JumpMVEDiagramContext)

  const downstream = getNeighborsOfNode(id, 'target', elements)
  const upstream = getNeighborsOfNode(id, 'source', elements)

  const [state, setState] = useState({
    name: data.name ?? '',
    description: data.description ?? '',
    goal: data.goal ?? 0,
    current: data.current ?? 0,
    formula: data.formula ?? '',
    dueDate: data.dueDate ?? format(new Date(), 'yyyy-MM-dd'),
  })

  const onChange = field => e => {
    const value = (field === 'goal' || field === 'current') ? Number(e.target.value) : e.target.value
    const newData = {...state, [field]: value}
    setState(newData)
    const newElements = elements.map(element => element.id === id ? {...element, data: newData} : element)
    setElements(newElements)
  }

  const recalculateKPI = (id, elements, field) => {
    const node = elements.find(e => e.id === id)
    const downstream = getNeighborsOfNode(id, 'target', elements)
    node.data[field] = downstream?.map(input => Number(input.data[field] ?? 0)).reduce((acc, val) => acc + val, 0)
    getNeighborsOfNode(id, 'source', elements)?.forEach(it => recalculateKPI(it.id, elements, field))
  }

  const invokeRecalculation = field => {
    if (upstream.length > 0) { // 今は上流はひとつだけ
      const newElements = JSON.parse(JSON.stringify(elements))
      recalculateKPI(upstream[0].id, newElements, field)
      setElements(newElements)
    }
  }

  useEffect(() => {
    invokeRecalculation('goal')
  }, [state.goal])

  useEffect(() => {
    invokeRecalculation('current')
  }, [state.current])

  return (
      <div style={{border: '1px solid #777', padding: 10}}>
        <Handle type="target" position="top" id="phase" style={{background: '#555'}}/>
        <Handle type="target" position="left" id="lowers" style={{background: '#555'}}/>
        <Form>
          <Form.Input inline label={<span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{t('KPI')}: </span>}
                      placeholder={t('Name')} onChange={onChange('name')} value={state.name}/>
          <Form.TextArea placeholder={t('Description')} onChange={onChange('description')} value={state.description}/>
          <Form.Input inline label={t('Goal')} type="number" readOnly={downstream?.length > 0}
                      onChange={onChange('goal')} value={downstream?.length > 0 ? data.goal : state.goal}/>
          <Form.Input inline label={t('Current')} type="number" readOnly={downstream?.length > 0}
                      onChange={onChange('current')} value={downstream?.length > 0 ? data.current : state.current}/>
          <Form.TextArea label={t('Formula')} onBlur={onChange('formula')} value={state.formula}/>
          <Form.Input inline label={t('Due Date')} type="date" onChange={onChange('dueDate')} value={state.dueDate}/>
        </Form>
        <Handle type="source" position="right" id="upper" style={{background: '#555'}}/>
        <Handle type="source" position="bottom" id="kpis" style={{background: '#555'}}/>
      </div>
  )
}
