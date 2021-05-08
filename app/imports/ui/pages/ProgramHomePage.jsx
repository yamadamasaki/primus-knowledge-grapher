import React, {useEffect, useState} from 'react'
import {Container, Loader} from 'semantic-ui-react'
import ProgramIndexMenu from '../components/ProgramIndexMenu'
import {Programs} from '../../api/program/ProgramCollection'
import {useTracker} from 'meteor/react-meteor-data'
import {useParams} from 'react-router'
import {Helmet} from 'react-helmet'

const DelegatedProgramHomePage = ({program}) => {
  const [component, setComponent] = useState({isLoaded: false, component: undefined})
  useEffect(() => {
    import(program.structure.indexComponent).then(component => setComponent({isLoaded: true, component}))
  }, [])

  return (
      <ProgramIndexMenu program={program}>
        {component.isLoaded ? React.createElement(component.component.default, {program}) : <Loader/>}
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
