const express = require('express')
const mongoose = require('mongoose')
const { validateSchema } = require('../middleware')
const { Wallet, Transaction } = require('../models')

const router = express.Router()

const transactionConfig = {
  readPreference: 'primary',
  readConcern: { level: 'local' },
  writeConcern: { w: 'majority' }
}

const postTransactSchema = {
  title: 'Transact',
  description: 'Do Transact for the Wallet',
  type: 'object',
  properties: {
    amount: {
      type: 'number',
      description: 'Initial balance for User wallet'
    },
    description: {
      type: 'string',
      description: 'Description for the Transaction'
    }
  },
  required: ['amount']
}
router.post('/:walletId', validateSchema(postTransactSchema), async (req, res) => {
  const session = await mongoose.startSession()
  session.startTransaction(transactionConfig)
  const amount = parseFloat(req.body.amount.toFixed(4))
  try {
    const getWallet = await Wallet.findById(req.params.walletId)
    if (!getWallet) {
      const error = new Error('No wallet found with the Id')
      error.code = 404
      throw error
    }
    const balance = parseFloat(getWallet._doc.balance.toString())
    const newBalance = parseFloat((balance + amount).toFixed(4))
    if (newBalance < 0) {
      const error = new Error('Not Sufficient Balance')
      error.code = 400
      throw error
    }
    const [newTransaction] = await Promise.all([
      Transaction.create([{
        walletId: getWallet._id,
        amount,
        balance: newBalance,
        type: req.body.amount < 0 ? 'DEBIT' : 'CREDIT'
      }], { session }),
      Wallet.findByIdAndUpdate(req.params.walletId, {
        $set: {
          balance: newBalance
        }
      }, { session })
    ])
    await session.commitTransaction()
    res.status(200).send({
      transactionId: newTransaction[0]._id.toString(),
      balance: newBalance,
    })
  } catch(err) {
    console.log(err)
    await session.abortTransaction()
    if ((err.code / 100) % 4 === 0) 
      res.status(err.code).send(err.message)
    else
      res.status(500).send('Something Went Wrong')
  }
})

module.exports = router