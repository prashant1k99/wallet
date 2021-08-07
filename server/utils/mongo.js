require('dotenv/config')
const mongoose = require('mongoose')

const DB_URL = process.env.DB_URL

let db 
const dbConnect = new Promise((resolve, reject) => {
  db = mongoose
        .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => resolve())
        .catch(err => reject(err))
})

module.exports = {
  dbConnect,
  db
}