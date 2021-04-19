import React, {useState} from 'react'
import {Container, Header, Message} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import {AutoForm} from 'uniforms-semantic'
import {ScenarioSchemata} from '../../api/scenarioSchema/index'

const schema = ScenarioSchemata.CopernicusForum01

const ScenarioForm = ({closer, model = {}}) => {
  const {t} = useTranslation()

  const [error, setError] = useState(null)
  const submit = obj => {
    console.log({obj})
  }
  const dismissError = () => setError(null)

  const ShowError = () => (
      error ?
          <Message onDismiss={dismissError} header={t('Error')} content={error}/> :
          <div/>
  )

  return (
      <Container>
        <Header as="h2">{t('Scenarios')}</Header>
        <AutoForm schema={schema} onSubmit={submit} model={model}/>
        <ShowError/>
      </Container>
  )
}

export default ScenarioForm
