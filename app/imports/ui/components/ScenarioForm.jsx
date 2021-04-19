import React, {useState} from 'react'
import {Container, Header, Loader, Message} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import {AutoForm} from 'uniforms-semantic'
import {ScenarioSchemata} from '../../api/scenarioSchema/index'
import {Programs} from '../../api/program/ProgramCollection'
import {useTracker} from 'meteor/react-meteor-data'
import {programUpdateMethod} from '../../api/program/ProgramCollection.methods'
import {Link} from 'react-router-dom'

const ScenarioForm = ({match}) => {
  const {programId} = match.params

  const programLoading = useTracker(() => !Programs.subscribe(Programs.getChannels().allWithMeta).ready())
  const program = useTracker(() => Programs.findOne({_id: programId}))
  const {scenarioSchema, structure} = program || {}
  const schema = ScenarioSchemata[scenarioSchema]

  const {t} = useTranslation()

  const [error, setError] = useState(null)
  const dismissError = () => setError(null)
  const ShowError = () => (
      error ?
          <Message onDismiss={dismissError} header={t('Error')} content={error}/> :
          <div/>
  )

  const [success, setSuccess] = useState(null)
  const dismissSuccess = () => setSuccess(null)
  const ShowSuccess = () => (
      success ?
          <Message color="green">{t('Success')}</Message> :
          <div/>

  )

  const submit = obj => {
    program.structure = obj
    program.structureAsJson = ''
    programUpdateMethod.call(program, error => {
      if (error) {setError(error.message); setSuccess(null)}
      else setSuccess(<div>{t('Success')}</div>)
    })
  }

  return (
      programLoading ?
          <Loader/> :
          (
              <Container>
                <Header as="h2">{t('Scenarios')}
                  <Header.Subheader>{`${program.title}`}</Header.Subheader>
                </Header>
                <AutoForm schema={schema} onSubmit={submit} model={structure}/>
                <ShowError/>
                <ShowSuccess/>
                <Link to="/programs" style={{float: 'right'}}>{t('Return to Programs List')}</Link>
              </Container>
          )
  )
}

export default ScenarioForm

