const mongoose = require('mongoose')
const Schema = mongoose.Schema

const walletSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    balance: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false
    }
  }
)
Numbermodule.exports = mongoose.model('Wallet', walletSchema)