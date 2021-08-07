const express = require('express')
const { Wallet } = require('../models')

const router = express.Router()

router.get('/:walletId', async (req, res) => {
  try {
    const wallet = await Wallet.findById(req.params.walletId)
    if (!wallet) {
      const error = new Error('No wallet found with the Specified Id')
      error.code = 400
      throw new Error
    }
    res.status(200).send({
      id: wallet._id.toString(),
      balance: wallet._doc.balance,
      name: wallet._doc.name,
      date: wallet._doc.createdAt
    })
  } catch(err) {
    if ((err.code / 100) % 4 === 0) 
      res.status(err.code).send(err.message)
    else {
      console.log(err)
      res.status(500).send('Something Went Wrong')
    }
  }
})

module.exports = router