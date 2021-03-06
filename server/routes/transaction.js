const express = require('express')
const { Transaction } = require('../models')
const converter = require('json-2-csv')

const router = express.Router()

router.get('/download/:walletId', async (req, res) => {
  try {
    const walletId = req.params.walletId,
      skip = parseInt(req.query.skip),
      limit = parseInt(req.query.limit),
      order = req.query.order === 'asc' ? req.query.order : 'desc' 
    const allTransactions = await Transaction.find({
      walletId
    }).limit(limit).skip(skip).sort({
      createdAt: order
    })
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
    const csv = await converter.json2csvAsync(result)
    res.setHeader('Content-disposition', `attachment; filename=transaction-report-${walletId}.csv`)
    res.set('Content-Type', 'text/csv')
    return res.status(200).send(csv)
  } catch(err) {
    console.log(err)
    res.status(500).send('Something Went Wrong')
  }
})

router.get('/:walletId', async (req, res) => {
  try {
    const walletId = req.params.walletId,
      skip = parseInt(req.query.skip) || 0,
      limit = parseInt(req.query.limit) || 20,
      order = req.query.order === 'asc' ? req.query.order : 'desc' 
    const allTransactions = await Transaction.find({
      walletId
    }).limit(limit).skip(skip).sort({
      createdAt: order
    })
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