import React from 'react'

const findPath = (me, target, path) => {
  if (!me.children || me.children.length === 0) return null
  if (me.name) path.push(me.name)
  if (me.children.find(it => it.id === target)) return path
  return me.children.map(it => findPath(it, target, Array.from(path))).find(it => it && it.length > 0)
}

const KGBreadCrumbs = ({program, programId, sessionId, sessionComponent, sessionName}) => {
  const path = findPath(program.structure, sessionId, [])

  const programLink = <a href={`/programs/${programId}`}>{program.title}</a>
  const sections = path ? path.join(' / ') : ''
  const sessionLink = <a href={`/sessions/${programId}/${sessionComponent}/${sessionId}`}>{sessionName}</a>

  return (
      <>
        {
          sessionName && sessionComponent ?
              <div>{programLink} / {sections} / {sessionLink}</div> :
              program.title ?
                  <div>{programLink} / {sections}</div> :
                  <div/>
        }
      </>
  )
}

export default KGBreadCrumbs
