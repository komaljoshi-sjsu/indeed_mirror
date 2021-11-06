const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comSchema = new Schema({
  companyId: {
    type: Number,
    required: true,
  },
  avgWorkHappinessScore: {
    type: Number,
  },
  avgLearningScore: {
    type: Number,
  },
  avgAppreciationScore: {
    type: Number,
  },
  noOfReviews: {
    type: Number,
  },
  noOfViews: {
    type: Number,
  },
  companyAvgRating: {
    type: Number,
  },
  ceoAvgRating: {
    type: Number,
  },
})

const Company = mongoose.model('Company', comSchema)
module.exports = Company
