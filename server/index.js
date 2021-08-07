const express = require('express')

const routes = require('./routes')

const app = express()

app.disable('x-powered-by')

app.use('/api', routes)
app.use('/', (req, res) => res.send('Hello'))

module.exports = app