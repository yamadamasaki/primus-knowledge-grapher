// map functions used in `apply()`
export const identityString = it => it || ''
export const identityObject = it => it || {}
export const date2string = it => it ? it.toLocaleString() : ''
export const userId2string = it => (Meteor.users.findOne(it) || {}).username || ''

// apply mapper to the obj
// mapper is an object of key=key of obj, value=map function
export const apply = (mapper, obj) => (
    obj ? (
        Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [key, mapper[key](value, obj)]),
        )
    ) : {}
)
