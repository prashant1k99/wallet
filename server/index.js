const express = require('express')

const routes = require('./routes')

const app = express()

app.disable('x-powered-by')

app.use('/api', routes)
if (process.env.NODE_ENV === 'production') {
  app.use(express.state(__dirname + '/public/'))
  // To Handle SPA
  app.get(/.*/, (_, res) => res.sendFile(__dirname + '/public/index.html'))
} else {
  app.use('/', (_, res) => res.send('Hello'))
}

module.exports = app
