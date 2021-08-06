// type should be one of source or target
export const getEdgesOfNode = (nodeId, type, elements) =>
    elements ? elements.filter(edge => edge[type] === nodeId) : []

const reverse = type => type === 'source' ? 'target' : 'source'

export const getNeighborsOfNode = (nodeId, type, elements) =>
    getEdgesOfNode(nodeId, type, elements).
        map(edge => edge[reverse(type)]).
        map(peerId => elements.find(node => peerId === node.id))

