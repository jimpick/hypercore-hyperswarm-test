const hypercore = require('hypercore')
const ram = require('random-access-memory')
const network = require('@hyperswarm/network')
const pump = require('pump')

const feed = hypercore(ram)
const net = network()

feed.append(['a', 'b', 'c'], err => {
  if (err) throw err
  feed.getBatch(0, feed.length, (err, data) => {
    if (err) throw err
    console.log('Key:', feed.key.toString('hex'))
    data.forEach((value, index) => {
      console.log(index, value.toString())
    })
    net.join(feed.discoveryKey, {
      lookup: true,
      announce: true
    })
    console.log('Waiting for connections...')
    net.on('connection', (socket, details) => {
      console.log('new connection!', details)

      // you can now use the socket as a stream, eg:
      // process.stdin.pipe(socket).pipe(process.stdout)
      pump(socket, feed.replicate(), socket, err => {
        console.log('Finished', err)
      })
    })
  })
})

