const opts = { mode: 'no-cors' }
const qs = obj => Object.keys(obj)
  .map(key => `${key}=${encodeURIComponent(obj[key])}`)
  .join('&')


module.exports = (url, properties) =>
  fetch(`${location.protocol}//${url}?${qs(properties)}`)
    .catch(err => err.message === 'Failed to fetch'
      ? 'ok'
      : Promise.reject(err))