// type should be one of source or target
export const getEdgesOfNode = (nodeId, type, elements) =>
    elements ? elements.filter(edge => edge[type] === nodeId) : []

const reverse = type => type === 'source' ? 'target' : 'source'

export const getNeighborsOfNode = (nodeId, type, elements) =>
    getEdgesOfNode(nodeId, type, elements).
        map(edge => edge[reverse(type)]).
        map(peerId => elements.find(node => peerId === node.id))

export const recalculateKPI = (node, elements, type) => {
  const {id} = node
  const downstream = getNeighborsOfNode(id, 'target', elements)
  node.data[type] = downstream?.map(input => Number(input.data[type])).reduce((acc, val) => acc + val)
  getNeighborsOfNode(id, 'source', elements)?.forEach(it => recalculateKPI(it, elements))
}

