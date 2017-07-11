const persist = require('izi/persistant')
const observ = require('izi/emiter/observ')
const map = require('izi/collection/map')

module.exports = map((defaults, key) => persist(observ(defaults), key))