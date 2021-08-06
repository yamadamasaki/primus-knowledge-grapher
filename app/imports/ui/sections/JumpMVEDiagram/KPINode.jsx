import React, {useContext, useEffect, useState} from 'react'
import {Handle} from 'react-flow-renderer'
import {useTranslation} from 'react-i18next'
import {Form} from 'semantic-ui-react'
import {getNeighborsOfNode} from './utils'
import {JumpMVEDiagramContext} from '../JumpMVEDiagramSection'

export default node => {
  const {id, data} = node
  const {t} = useTranslation()

  const {elements, setElements} = useContext(JumpMVEDiagramContext)

  const downstream = getNeighborsOfNode(id, 'target', elements)
  const upstream = getNeighborsOfNode(id, 'source', elements)

  const [state, setState] = useState(data)

  const onChange = type => e => {
    const value = (type === 'goal' || type === 'current') ? Number(e.target.value) : e.target.value
    const newData = {...state, [type]: value}
    setState(newData)
    const newElements = elements.map(element => element.id === id ? {...element, data: newData} : element)
    setElements(newElements)
  }

  const recalculateKPI = (id, elements, type) => {
    const node = elements.find(e => e.id === id)
    const downstream = getNeighborsOfNode(id, 'target', elements)
    node.data[type] = downstream?.map(input => Number(input.data[type] ?? 0.0)).reduce((acc, val) => acc + val, 0.0)
    getNeighborsOfNode(id, 'source', elements)?.forEach(it => recalculateKPI(it.id, elements, type))
  }

  const invokeRecalculation = type => {
    if (upstream.length > 0) {
      const newElements = JSON.parse(JSON.stringify(elements))
      recalculateKPI(upstream[0].id, newElements, type)
      setElements(newElements)
    }
  }

  useEffect(() => {
    invokeRecalculation('goal')
  }, [state.goal])

  useEffect(() => {
    invokeRecalculation('current')
  }, [state.current])

  //const calculateKPI = type => downstream.map(node => Number(node.data[type] ?? 0.0)).reduce((val, acc) => val + acc, 0.0)

  return (
      <div style={{border: '1px solid #777', padding: 10}}>
        <h3>{t('KPI')}</h3>
        <Handle type="target" position="top" id="phase" style={{background: '#555'}}/>
        <Handle type="target" position="left" id="lowers" style={{background: '#555'}}/>
        <Form>
          <Form.Input placeholder={t('Name')} onChange={onChange('name')} value={state.name}/>
          <Form.TextArea placeholder={t('Description')} onChange={onChange('description')} value={state.description}/>
          <Form.Input inline label={t('Goal')} type="number" readOnly={downstream?.length > 0}
                      onChange={onChange('goal')} value={state.goal}/>
          <Form.Input inline label={t('Current')} type="number" onChange={onChange('current')} value={state.current}/>
          <Form.TextArea label={t('Formula')} onBlur={onChange('formula')} value={state.formula}/>
          <Form.Input inline label={t('Due Date')} type="date" onChange={onChange('dueDate')} value={state.dueDate}/>
        </Form>
        <Handle type="source" position="right" id="upper" style={{background: '#555'}}/>
        <Handle type="source" position="bottom" id="kpis" style={{background: '#555'}}/>
      </div>
  )
}
