// type should be one of source or target
export const getEdgesOfNode = (nodeId, type, elements) =>
    elements ? elements.filter(edge => edge[type] === nodeId) : []

const reverse = type => type === 'source' ? 'target' : 'source'

export const getNeighborsOfNode = (nodeId, type, elements) =>
    getEdgesOfNode(nodeId, type, elements).
        map(edge => edge[reverse(type)]).
        map(peerId => elements.find(node => peerId === node.id))

const canConnect = (connection, spec, elements) => {
  const {sourceNodeType, sourceHandleId, targetNodeType, targetHandleId} = spec
  const sourceNode = elements.find(it => it.id === connection.source)
  const targetNode = elements.find(it => it.id === connection.target)
  return connection.sourceHandle === sourceHandleId &&
      connection.targetHandle === targetHandleId &&
      sourceNode?.type === sourceNodeType &&
      targetNode?.type === targetNodeType
}

export const isValidConnection = (elements, checker) => connection => checker(connection, elements)
export const isExperimentToPhase = (connection, elements) => canConnect(connection,
    {sourceNodeType: 'experiment', sourceHandleId: 'phases', targetNodeType: 'phase', targetHandleId: 'experiment'},
    elements)
export const isPhaseToPhase = (connection, elements) => canConnect(connection,
    {sourceNodeType: 'phase', sourceHandleId: 'next', targetNodeType: 'phase', targetHandleId: 'previous'}, elements)
export const isPhaseToKpi = (connection, elements) => canConnect(connection,
    {sourceNodeType: 'phase', sourceHandleId: 'kpis', targetNodeType: 'kpi', targetHandleId: 'phase'}, elements)
export const isKpiToKpi = (connection, elements) => canConnect(connection,
    {sourceNodeType: 'kpi', sourceHandleId: 'upper', targetNodeType: 'kpi', targetHandleId: 'lowers'}, elements)

