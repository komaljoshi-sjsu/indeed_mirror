const conn = require('../../config/mysql_connection')
const mongoose = require('mongoose')
const Company = mongoose.model('Company')

let jsUpdateNoOfViews = async (req, callback) => {
  console.log('Job Seeker updating no of views.....')
  var res = {}
  const { id } = req.body
  console.log(JSON.stringify(req.body))
  try {
    Company.updateOne({ companyId: id }, { $inc: { noOfViews: 1 } })
      .then((result) => {
        console.log(result)
        res = results
        callback(null, res)
      })
      .catch((err) => {
        console.log('Error occured while querying' + err)
        callback('Error ocurred', err)
      })
  } catch {
    ;(err) => {
      callback('Cannot update views', err)
    }
  }
}

exports.jsUpdateNoOfViews = jsUpdateNoOfViews
