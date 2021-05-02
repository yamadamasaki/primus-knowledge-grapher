import React from 'react'
import {Container, Loader} from 'semantic-ui-react'
import ProgramIndexMenu from '../components/ProgramIndexMenu'
import {Programs} from '../../api/program/ProgramCollection'
import {useTracker} from 'meteor/react-meteor-data'
import {useParams} from 'react-router'

const ProgramHome = program => {
  return (
      program ? <h2>{program.title}</h2> : <div>ProgramHome</div>
  )
}

const ProgramHomePage = () => {
  const {programId} = useParams()
  const programLoading = useTracker(() => !Programs.subscribe(Programs.getChannels().allWithMeta).ready())
  const program = useTracker(() => Programs.findOne(programId))

  return (
      programLoading ?
          <Loader/> :
          <Container>
            <ProgramIndexMenu>
              {ProgramHome(program)}
            </ProgramIndexMenu>
          </Container>
  )
}

export default ProgramHomePage
