import React, {useState} from 'react'
import {Container, Header, Message} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import {AutoForm, ErrorsField, LongTextField, SubmitField, TextField} from 'uniforms-semantic'
import {Programs} from '../../api/program/ProgramCollection'
import {programDefineMethod} from '../../api/program/ProgramCollection.methods'

const ProgramForm = ({closer}) => {
  const {t} = useTranslation()
  const [error, setError] = useState(null)
  const submit = obj => {
    programDefineMethod.call(obj, error => {
      if (error) setError(error.message)
      else closer(false)
    })
  }
  const dismissError = () => setError(null)

  return (
      <Container>
        <Header as="h2">{t('Programs')}</Header>
        <AutoForm schema={Programs.getSchema()} onSubmit={submit}>
          <TextField name="title" label={t('Title')}/>
          <LongTextField name="structureAsJson" label={t('Structure (as JSON)')}/>
          <SubmitField value={t('Submit')}/>
          <ErrorsField/>
        </AutoForm>
        {
          error ?
              <Message onDismiss={dismissError} header={t('Error')} content={error}/> :
              <div/>
        }
      </Container>
  )
}

export default ProgramForm
