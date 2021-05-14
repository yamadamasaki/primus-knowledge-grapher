import React from 'react'
import {Link} from 'react-router-dom'

const boxStyle = {
  margin: '10px 10px 10px 10px',
  border: '1px solid #afadad',
  borderRadius: '5px',
  padding: '5px',
}

const KGSectionMenu = ({sectionNames, subsessions}) => (
    <div>
      {
        subsessions ? (
            <div style={boxStyle}>
              <ol>
                {
                  subsessions.map((section, index) => {
                    const {name, programId, sessionId, subsession, componentName} = section
                    return (
                        <li key={index}>
                          <Link to={`/sessions/${programId}/${componentName}/${sessionId}/${subsession}`}>
                            {name}
                          </Link>
                        </li>
                    )
                  })
                }
              </ol>
            </div>
        ) : <div/>
      }
      {
        sectionNames ? (
            <div style={boxStyle}>
              <ol>
                {
                  sectionNames.map(
                      (sectionName, index) => (<li key={index}><a href={`#${sectionName}`}>{sectionName}</a></li>)
                  )
                }
              </ol>
            </div>
        ) : <div/>
      }
    </div>
)

export default KGSectionMenu
