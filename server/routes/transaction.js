const express = require('express')
const { Transaction } = require('../models')

const router = express.Router()

router.get('/:walletId', async (req, res) => {
  try {
    const walletId = req.params.walletId,
      skip = req.query.skip || 0,
      limit = req.query.limit || 20
    const allTransactions = await Transaction.find({
      walletId
    }).skip(skip * limit).limit(limit)
    const result = allTransactions.map((record) => {
      return {
        id: record._id.toString(),
        walletId: record._doc.walletId.toString(),
        amount: record._doc.amount,
        balance: record._doc.balance,
        description: record._doc.description,
        date: record._doc.createdAt,
        type: record._doc.type
      }
    })
    res.status(200).send(result)
  } catch(err) {
    console.log(err)
    res.status(500).send('Something Went Wrong')
  }
})

module.exports = router