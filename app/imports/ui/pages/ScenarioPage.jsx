import React, {useState} from 'react'
import {Button, Container, Header, Icon, Loader, Message, Popup} from 'semantic-ui-react'
import {Programs} from '../../api/program/ProgramCollection'
import {useTranslation} from 'react-i18next'
import {useTracker} from 'meteor/react-meteor-data'
import ReactJson from 'react-json-view'
import {ScenarioSchemata} from '../../api/scenarioSchema'
import {programUpdateMethod} from '../../api/program/ProgramCollection.methods'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router'

const validateJson = (obj, schema, setError) => {
  if (obj && schema) {
    const validationContext = schema.newContext()
    if (validationContext) {
      validationContext.validate(obj)
      if (!validationContext.isValid()) {
        setError(JSON.stringify(validationContext.validationErrors()))
        return false
      }
    }
  }
  return true
}

const ScenarioPage = () => {
  const {programId} = useParams()

  const programLoading = useTracker(() => !Programs.subscribe(Programs.getChannels().allWithMeta).ready())
  const program = useTracker(() => Programs.findOne({_id: programId}))
  const {scenarioSchema, structure} = program || {}
  const schema = ScenarioSchemata[scenarioSchema]

  const [source, setSource] = useState(structure)

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

  const {t} = useTranslation()

  const onUpdate = event => {
    const {updated_src: updatedSource} = event
    setError(null)
    if (validateJson(updatedSource, schema, setError)) setSource(updatedSource)
  }

  const onSave = () => {
    setError(null)
    if (validateJson(source, schema, setError)) {
      program.structure = source
      program.structureAsJson = ''
      programUpdateMethod.call(program, error => {
        if (error) {
          setError(error.message)
          setSuccess(null)
        } else setSuccess(<div>{t('Success')}</div>)
      })
    }
  }

  return (
      programLoading ?
          <Loader/> :
          (
              <Container>
                <Header as="h2">
                  {t('Scenarios')}
                  <Header.Subheader>{`${program.title}/${t('compact form')}`}</Header.Subheader>
                </Header>
                <ReactJson src={source} onEdit={onUpdate} onAdd={onUpdate} onDelete={onUpdate}/>
                <ShowError/>
                <ShowSuccess/>
                <Button onClick={onSave}>{t('Save')}</Button>
                <Popup trigger={<Link to="/programs" style={{float: 'right'}}><Icon link name="step backward"/></Link>}>
                  {t('Return to Programs List')}
                </Popup>

              </Container>
          )
  )
}

export default ScenarioPage
