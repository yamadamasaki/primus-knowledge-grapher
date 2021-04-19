import React, {useState} from 'react'
import {Container, Header, Message} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import {AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField} from 'uniforms-semantic'
import {Programs} from '../../api/program/ProgramCollection'
import {programDefineMethod, programUpdateMethod} from '../../api/program/ProgramCollection.methods'
import {ScenarioSchemata} from '../../api/scenarioSchema'

const scenarioSchemaNames = Object.entries(ScenarioSchemata).map(([key, _]) => key)

const ProgramForm = ({closer, model}) => {
  const {t} = useTranslation()

  const [error, setError] = useState(null)
  const submit = obj => {
    return obj._id ?
        programUpdateMethod.call(obj, error => error ? setError(error.message) : closer(false)) :
        programDefineMethod.call(obj, error => error ? setError(error.message) : closer(false))
  }
  const dismissError = () => setError(null)

  const ShowError = () => (
      error ?
          <Message onDismiss={dismissError} header={t('Error')} content={error}/> :
          <div/>
  )

  return (
      <Container>
        <Header as="h2">{t('Programs')}</Header>
        <AutoForm schema={Programs.getSchema()} onSubmit={submit} model={model}>
          <TextField name="title" label={t('Title')}/>
          <SelectField
              name="scenarioSchema" label={t('Scenario Schema')}
              allowedValues={scenarioSchemaNames}
              disabled={!!(model || {})._id}/>
          <LongTextField name="structureAsJson" label={t('Structure (as JSON)')}/>
          <SubmitField value={t('Submit')}/>
          <ErrorsField/>
        </AutoForm>
        <ShowError/>
      </Container>
  )
}

export default ProgramForm
