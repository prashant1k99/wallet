const app = require('./server')
const { dbConnect } = require('./server/utils')
const PORT = process.env.PORT || 3000

dbConnect.then(() => {
  app.listen(PORT, () => {
    console.log(`🚀  Server ready http://localhost:${PORT}`)
  })
}).catch(err => console.error(err))