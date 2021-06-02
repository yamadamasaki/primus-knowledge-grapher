import React from 'react'
import SyncFusionGeneralDiagram from '../components/SyncFusionGeneralDiagram.jsx'

const sectionStyle = {
  padding: '1rem 2rem',
  borderLeft: '6px double orange',
  borderRight: '6px double orange',
  margin: '1rem 0rem',
  height: '1000px',
}

const KGGeneralDiagramSection = () => {
  return (
      <div style={sectionStyle}>
        <SyncFusionGeneralDiagram/>
      </div>
  )
}

export default KGGeneralDiagramSection
