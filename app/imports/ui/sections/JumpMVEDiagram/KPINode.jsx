import React, {memo} from 'react'
import {Handle} from 'react-flow-renderer'
import {useTranslation} from 'react-i18next'
import {Form} from 'semantic-ui-react'

export default memo(({data}) => {
  const {t} = useTranslation()

  return (
      <div style={{border: '1px solid #777', padding: 10}}>
        <h3>{t('KPI')}</h3>
        <Handle type="target" position="top" id="phase" style={{background: '#555'}}/>
        <Handle type="target" position="left" id="lowers" style={{background: '#555'}}/>
        <Form>
          <Form.Input placeholder={t('Name')}/>
          <Form.TextArea placeholder={t('Description')}/>
          <Form.Input label={t('Goal')} type='number'/>
          <Form.Input label={t('Current')} type='number'/>
          <Form.Input label={t('Formula')}/>
          <Form.Input label={t('Due Date')} type="date"/>
        </Form>
        <Handle type="source" position="right" id="upper" style={{background: '#555'}}/>
        <Handle type="source" position="bottom" id="kpis" style={{background: '#555'}}/>
      </div>
  )
})
