const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema(
  {
    description: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    balance: {
      type: Number,
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
Numbermodule.exports = mongoose.model('Transaction', transactionSchema)