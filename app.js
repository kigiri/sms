const state = require('./state')
const post = require('./post')
const linkInput = require('./link-input')
const h = require('izi/h')
const arr = require('izi/arr')

const ipParts = arr.range(4).map(i => state[`ip${i}`])
const call = f => f()
const sendSms = number => post(`${ipParts.map(call).join('.')}:8766`, {
  number,
  message: state.message(),
  token: state.token(),
}).then(() => `Message sent to ${number}`)

const chainSend = (q, num) => q
  .then(() => sendSms(num))
  .then(console.log, console.error)

const sendAll = () => arr.unique(state.numbers()
  .replace(/[ ._-]/g, '') // remove number separators
  .replace(/([^0-9]+)/g, ',') // normalize
  .split(',') // split by number
  .filter(Boolean)) // cleanup
  .reduce(chainSend, Promise.resolve())


/// UI
const colors = {
  background: '#282A36',
  foreground: '#F8F8F2',
  selection: '#44475A',
  comment: '#6272A4',
  orange: '#FFB86C',
  yellow: '#F1FA8C',
  purple: '#BD93F9',
  green: '#50FA7B',
  cyan: '#8BE9FD',
  pink: '#FF79C6',
  red: '#FF5555',
}

const textArea = linkInput(h.style('textarea', {
  resize: 'vertical',
  border: 'none',
  width: '100%',
  minHeight: '12em',
  background: colors.selection,
  color: colors.foreground,
  padding: '5px',
  margin: '5px 0',
  borderRadius: '3px',
}))

const numInp = linkInput(h.style('input', {
  border: 'none',
  display: 'inline-block',
  width: '3em',
  background: colors.selection,
  color: colors.foreground,
  padding: '5px',
  margin: '5px 0',
  borderRadius: '3px',
}))

const input = linkInput(h.style('input', {
  border: 'none',
  display: 'inline-block',
  background: colors.selection,
  color: colors.foreground,
  padding: '5px',
  margin: '5px 0',
  borderRadius: '3px',
}))

const title = h.style('h4', {
  color: colors.green,
  fontWeight: 'normal',
  marginTop: '16px',
})

const text = h.style('span', { color: colors.comment })

document.body.appendChild(h.div.style({
  maxWidth: '640px',
  margin: '0 auto',
}, [
  h.div.style({
    border: '2px dashed',
    color: colors.pink,
    borderRadius: '20px',
    padding: '20px',
    width: '100%',
    margin: '20px 0',
  }, [
    '1 - Install and start',
    h.a({
      href: 'https://play.google.com/store/apps/details?id=com.bogdan.sms',
      style: {
        textDecoration: 'none',
        color: colors.yellow,
      },
    }, ' StartHere SMS Gateway App'),
    ' on your android phone',
    h.div('2 - Open this webpage on the same local network'),
    h.div('3 - fill the form'),
    h.div('4 - Send batch sms using your own phone number and credits'),
  ]),
  title('Token'),
  h.div([ input('token'), text(' (optionnal)') ]),
  title('SMS Gateway Address'),
  h.div([
    numInp('ip0'),
    text('.'),
    numInp('ip1'),
    text('.'),
    numInp('ip2'),
    text('.'),
    numInp('ip3', { autofocus: true }),
    text(':8766'),
  ]),
  title('Numbers'),
  textArea('numbers'),
  title('Message'),
  textArea('message'),
  h.button({
    style: {
      borderRadius: '3px',
      border: `2px solid`,
      color: colors.cyan,
      background: colors.selection,
      margin: '5px 0',
      padding: '5px',
    },
    onclick: sendAll,
  }, 'send'),
]))
