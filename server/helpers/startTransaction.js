const mongoose = require('mongoose')

const transactionConfig = {
  readPreference: 'primary',
  readConcern: { level: 'local' },
  writeConcern: { w: 'majority' }
}

const transaction = async (callback = () => {}) => {
  const session = await mongoose.startSession()
  session.startTransaction(transactionConfig)
  await callback.call(session).then(async () => {
    await session.commitTransaction()
  }).catch(async (err) => {
    console.log(err)
    await session.abortTransaction()
  }).finally(async () => {
    await session.endSession()
  })
}

module.exports = {
  transaction,
  transactionConfig
}