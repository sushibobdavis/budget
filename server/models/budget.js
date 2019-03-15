const mongoose = require('mongoose')
const Schema = mongoose.Schema

let budgetSchema = new Schema({
  name: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdOn: { type: Date, default: Date.now }
})

const Budget = mongoose.model('Budget', budgetSchema)

module.exports = Budget
