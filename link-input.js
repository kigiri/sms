const loop = require('izi/loop')
const observ = require('izi/emiter/observ')
const state = require('./state.js')
const h = require('izi/h')

module.exports = base => (key, properties = {}) => {
  const obs = state[key]
  const el = base(Object.assign({ value: obs() }, properties))

  loop(() => obs.set(el.value))

  return el
}

module.exports.input = module.exports(h.input)
module.exports.textarea = module.exports(h.textarea)
