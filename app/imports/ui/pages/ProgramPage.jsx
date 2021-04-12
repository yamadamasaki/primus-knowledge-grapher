import React from 'react'
import {useTracker} from 'meteor/react-meteor-data'

const Programs = () => {
  const programs = useTracker()
  return (<h1>Programs</h1>)
}

export default Programs
