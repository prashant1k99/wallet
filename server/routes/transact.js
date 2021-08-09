const express = require('express')
const mongoose = require('mongoose')
const { validateSchema } = require('../middleware')
const { Wallet, Transaction } = require('../models')
const { transactionConfig } = require('../helpers')

const router = express.Router()

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
  try {
    const getWallet = await Wallet.findById(req.params.walletId)
    if (!getWallet) {
      const error = new Error('No wallet found with the Id')
      error.code = 404
      throw error
    }
    const amount = req.body.amount
    const balance = getWallet._doc.balance
    const newBalance = amount + balance
    if (newBalance < 0) {
      const error = new Error('Not Sufficient Balance')
      error.code = 400
      throw error
    }
    const transactionInit = new Transaction({
      description: req.body.description,
      walletId: getWallet._id,
      amount,
      balance: newBalance,
      type: req.body.amount < 0 ? 'DEBIT' : 'CREDIT'
    })
    const [newTransaction] = await Promise.all([
      transactionInit.save({ session }),
      Wallet.findByIdAndUpdate(req.params.walletId, {
        $set: {
          balance: newBalance
        }
      }, { session })
    ])
    await session.commitTransaction()
    res.status(200).send({
      transactionId: newTransaction._id.toString(),
      balance: parseFloat(newBalance.toFixed(4)),
    })
  } catch(err) {
    await session.abortTransaction()
    if ((err.code / 100) % 4 === 0) 
      res.status(err.code).send(err.message)
    else {
      console.log(err)
      res.status(500).send('Something Went Wrong')
    }
  } finally {
    await session.endSession()
  }
})

module.exports = router