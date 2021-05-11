import React from 'react'

const headerStyle = {
  padding: '1rem 2rem',
  background: '#f4f4f4',
}

const KGSessionHeader = ({sessionName}) => (<h1 style={headerStyle}>{sessionName}</h1>)

export default KGSessionHeader

