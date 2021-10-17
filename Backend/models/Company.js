const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comSchema = new Schema({
    companyId: {
        type: String,
        required: true
    },
    workHappinessScore: {
        type:Decimal128,
    },
    learningScore: {
        type:Decimal128,
    },
    appreciationScore: {
        type:Decimal128,
        required:true
    },
    noOfReviews: {
        type:Number
    },
    companyAvgRating: {
        type:Decimal128,
    },
    ceoAvgRating: {
        type: Decimal128
    },
    viewMap: {
        type:String
    }
});

const Company = mongoose.model('Company',comSchema);
module.exports = Company;