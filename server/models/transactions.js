const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema(
  {
    description: String,
    amount: {
      type: Number,
      set: v => parseFloat(v.toFixed(4)),
      required: true
    },
    balance: {
      type: Number,
      set: v => parseFloat(v.toFixed(4)),
      required: true,
      default: 0
    },
    walletId: {
      type: Schema.Types.ObjectId,
      ref: 'Wallet'
    },
    type: {
      type: String,
      enum: ['CREDIT', 'DEBIT'],
      default: 'CREDIT'
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false
    }
  }
)

module.exports = mongoose.model('Transaction', transactionSchema)