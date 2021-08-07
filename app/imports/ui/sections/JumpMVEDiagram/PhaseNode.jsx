import React, {memo} from 'react'
import {Handle} from 'react-flow-renderer'
import {useTranslation} from 'react-i18next'
import {Form} from 'semantic-ui-react'

export default memo(({data}) => {
  const {t} = useTranslation()

  return (
      <div style={{border: '1px solid #777', padding: 10}}>
        <Handle type="target" position="top" id="experiment" style={{background: '#555'}}/>
        <Handle type="target" position="left" id="previous" style={{background: '#555'}}/>
        <Form>
          <Form.Input inline label={<span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{t('Phase')}: </span>}
                      placeholder={t('Name')}/>
          <Form.TextArea placeholder={t('Description')}/>
          <Form.Input inline label={t('Due Date')} type="date"/>
        </Form>
        <Handle type="source" position="right" id="next" style={{background: '#555'}}/>
        <Handle type="source" position="bottom" id="kpis" style={{background: '#555'}}/>
      </div>
  )
})
