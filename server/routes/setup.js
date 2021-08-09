const express = require('express')
const mongoose = require('mongoose')
const { validateSchema } = require('../middleware')
const { Wallet, Transaction } = require('../models')
const { transactionConfig } = require('../helpers')

const router = express.Router()

const postSetupSchema = {
  title: 'Create Wallet',
  description: 'Create Wallet for the User',
  type: 'object',
  properties: {
    balance: {
      type: 'number',
      description: 'Initial balance for User wallet'
    },
    name: {
      type: 'string',
      description: 'Name of the User'
    }
  },
  required: ['name']
}
router.post('/', validateSchema(postSetupSchema), async (req, res) => {
  const session = await mongoose.startSession()
  session.startTransaction(transactionConfig)
  try {
    const walletInit = new Wallet({
      name: req.body.name,
      balance: req.body.balance
    })
    const newWallet = await walletInit.save({ session })
    let newTransaction = {}
    if (req.body.balance) {
      const transactionInit = new Transaction({
        walletId: newWallet._id,
        description: 'Wallet Setup',
        amount: req.body.balance,
        balance: newWallet._doc.balance,
      })
      newTransaction = await transactionInit.save({ session })
    }
    await session.commitTransaction()
    res.status(200).send({
      id: newWallet._id.toString(),
      transactionId: req.body.balance && newTransaction._id.toString(),
      balance: newWallet._doc.balance,
      name: newWallet._doc.name,
      date: newWallet._doc.createdAt
    })
  } catch(err) {
    console.log(err)
    await session.abortTransaction()
    res.status(500).send('Something Went Wrong')
  } finally {
    await session.endSession()
  }
})

module.exports = router