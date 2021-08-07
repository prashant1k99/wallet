const { db } = require('../utils')

const transaction = async (callback = () => {}) => {
  await db.transaction(callback.call(),{ readPreference: 'primary' })
}

module.exports = transaction