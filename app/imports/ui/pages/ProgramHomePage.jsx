import React, {useEffect, useState} from 'react'
import {Container, Grid, Header, Loader} from 'semantic-ui-react'
import ProgramIndexMenu from '../components/ProgramIndexMenu'
import {Programs} from '../../api/program/ProgramCollection'
import {useTracker} from 'meteor/react-meteor-data'
import {useParams} from 'react-router'
import {Helmet} from 'react-helmet'
import {registeredComponents} from '../../startup/client/registerComponents'

const DefaultProgramHomePage = ({program}) => {
  const {title} = program.structure
  const height = '100vh'

  return (
      <>
        <Grid columns={1} textAlign="center" verticalAlign="middle" style={{height: '100vh'}} padded>
          <Grid.Row style={{height}}>
            <Grid.Column>
              <Header as="h1">{title}</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
  )
}

const DelegatedProgramHomePage = ({program}) => {
  const [componentState, setComponentState] = useState({isLoaded: false, component: undefined})
  const componentName = registeredComponents[program.structure.indexComponent]

  useEffect(() => {
    if (componentName) import(componentName).then(component => setComponentState({isLoaded: true, component}))
  }, [])

  return (
      <ProgramIndexMenu program={program}>
        {
          componentName ?
              (
                  componentState.isLoaded ?
                      React.createElement(componentState.component.default, {program}) :
                      <Loader/>
              ) :
              <DefaultProgramHomePage program={program}/>
        }
      </ProgramIndexMenu>
  )
}

const ProgramHomePage = () => {
  const {programId} = useParams()
  const programLoading = useTracker(() => !Programs.subscribe(Programs.getChannels().allWithMeta).ready())
  const program = useTracker(() => Programs.findOne(programId))

  return (
      <>
        <Helmet><title>Program Home</title></Helmet>
        {
          programLoading ?
              <Loader/> :
              <Container><DelegatedProgramHomePage program={program}/></Container>
        }
      </>
  )
}

export default ProgramHomePage
