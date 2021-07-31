import React, {memo} from 'react'
import {Handle} from 'react-flow-renderer'
import {useTranslation} from 'react-i18next'
import {Form} from 'semantic-ui-react'

export default memo(({data, addNode}) => {
  const {t} = useTranslation()

  return (
      <>
        <h3>{t('Experiment')}: {data.name}</h3>
        <Form>
          <Form.TextArea placeholder={t('Description')}/>
          <Form.Input label={t('Due Date')} type="date"/>
        </Form>
        <Handle type="source" position="bottom" id="phases" style={{background: '#555'}}/>
      </>
  )
})
