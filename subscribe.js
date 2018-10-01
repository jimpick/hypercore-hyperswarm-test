const hypercore = require('hypercore')
const ram = require('random-access-memory')
const network = require('@hyperswarm/network')
const pump = require('pump')

const key = process.argv[2]
if (!key) {
  console.error('Need key!')
  process.exit(1)
}

const feed = hypercore(ram, key)
const net = network({ephemeral: true})

feed.ready(() => {
  net.join(feed.discoveryKey)
  console.log('Waiting for connections...')
  net.on('connection', (socket, details) => {
    console.log('new connection!', details)

    // you can now use the socket as a stream, eg:
    // process.stdin.pipe(socket).pipe(process.stdout)
    pump(socket, feed.replicate(), socket, err => {
      console.log('Finished')
      process.exit(0)
    })
  })
  feed.update(() => {
    feed.getBatch(0, feed.length, (err, data) => {
      if (err) throw err
      console.log('Key:', feed.key.toString('hex'))
      data.forEach((value, index) => {
        console.log(index, value.toString())
      })
    })
  })
})

