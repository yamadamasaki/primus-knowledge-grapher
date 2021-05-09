import React, {useState} from 'react'
import {Container, Header, Icon, Loader, Message, Popup} from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'
import {AutoForm} from 'uniforms-semantic'
import {ScenarioSchemata} from '../../api/scenarioSchema'
import {Programs} from '../../api/program/ProgramCollection'
import {useTracker} from 'meteor/react-meteor-data'
import {programUpdateMethod} from '../../api/program/ProgramCollection.methods'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router'
import {Helmet} from 'react-helmet'

const ScenarioFormPage = () => {
  const {programId} = useParams()

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
          <Message color="green" onDismiss={dismissSuccess}>{t('Success')}</Message> :
          <div/>
  )

  const submit = obj => {
    program.structure = obj
    program.structureAsJson = undefined
    programUpdateMethod.call(program, error => {
      if (error) {
        setError(error.message)
        setSuccess(null)
      } else setSuccess(<div>{t('Success')}</div>)
    })
  }

  return (
      <>
        <Helmet><title>Scenario Form</title></Helmet>
        {
          programLoading ?
              <Loader/> :
              (
                  <Container>
                    <Header as="h2">
                      {t('Scenarios')}
                      <Header.Subheader>{`${program.title}/${t('strict form')}`}</Header.Subheader>
                    </Header>
                    <AutoForm schema={schema} onSubmit={submit} model={structure}/>
                    <ShowError/>
                    <ShowSuccess/>
                    <Popup trigger={
                      <Link to="/programs" style={{float: 'right'}}>
                        <Icon link name="step backward"/>
                      </Link>
                    }>
                      {t('Return to Programs List')}
                    </Popup>

                  </Container>
              )
        }
      </>
  )
}

export default ScenarioFormPage

