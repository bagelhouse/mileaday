import _ from 'lodash'
export function objectToString(o) {
  if (!_.isEmpty(o)) {
    Object.keys(o).forEach(k => {
      if (typeof o[k] === 'object') {
        return objectToString(o[k])
      }
      const key = o[k]
      if (!_.isEmpty(key))
        o[k] = '' + o[k]
    })
  }
  
  return o
}
