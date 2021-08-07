const express = require('express')

const app = express()
app.use(express.json())

app.use('/path', 'fileName')

module.exports = app