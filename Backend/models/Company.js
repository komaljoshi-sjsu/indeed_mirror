const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comSchema = new Schema({
    companyId: {
        type: String,
        required: true
    },
    workHappinessScore: {
        type:mongoose.Decimal128,
    },
    learningScore: {
        type:mongoose.Decimal128,
    },
    appreciationScore: {
        type:mongoose.Decimal128,
        required:true
    },
    noOfReviews: {
        type:Number
    },
    companyAvgRating: {
        type: mongoose.Decimal128,
    },
    ceoAvgRating: {
        type: mongoose.Decimal128
    },
    viewMap: {
        type:String
    }
});

const Company = mongoose.model('Company',comSchema);
module.exports = Company;