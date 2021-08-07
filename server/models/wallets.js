const mongoose = require('mongoose')
const Schema = mongoose.Schema

const walletSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    balance: {
      type: Schema.Types.Decimal128,
      default: 0,
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

module.exports = mongoose.model('Wallet', walletSchema)