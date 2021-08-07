const express = require('express')

const middlewares = require('../../middlewares')

const router = express.Router()

router.get('/', authTokenValidator, async (req, res) => {
  try {
    const userAPIKeys = await API.find({
      user: req.user._id
    })
    const keys = userAPIKeys.map((key) => {
      delete key.user
      delete key._id
      return key
    })
    res.status(200).send(keys)
  } catch (err) {
    console.log(err)
    res.status(500).send('Something Went Wrong')
  }
})

module.exports = router