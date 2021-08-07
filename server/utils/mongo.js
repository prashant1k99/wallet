require('dotenv/config')
const mongoose = require('mongoose')

const DB_URL = process.env.DB_URL

let db 

const dbConnect = async () => {
  try {
    db = await mongoose
      .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    return
  } catch (err) {
    throw new Error(err)
  }
}

// const dbConnect = new Promise((resolve, reject) => {
//   db = mongoose
//         .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//         .then(() => resolve())
//         .catch(err => reject(err))
// })

module.exports = {
  dbConnect,
  db
}