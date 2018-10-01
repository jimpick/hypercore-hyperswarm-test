const hypercore = require('hypercore')
const ram = require('random-access-memory')

const feed = hypercore(ram)

feed.append(['a', 'b', 'c'], err => {
  if (err) throw err
  feed.getBatch(0, feed.length, (err, data) => {
    if (err) throw err
    data.forEach((value, index) => {
      console.log(index, value.toString())
    })
  })
})

