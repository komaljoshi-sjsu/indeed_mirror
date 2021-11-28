const conn = require('../../config/mysql_connection')

let jsGetCompanyRating = async (req, callback) => {
  var res = {}
  try {
    console.log('Job Seeker get company rating.....')
    conn.query(
      "select CAST(avg(rating)AS DECIMAL(10,2)) as avgRating,companyId from Review where adminReviewStatus = 'APPROVED' group by companyId",
      async function (err, results) {
        if (results.length <= 0) {
          console.log('Not found')
          callback('Rating not found', err)
        }
        if (err) {
          console.log('error')
          callback('Error ocurred', err)
        }
        res = results
        callback(null, res)
      },
    )
  } catch (err) {
    callback('Cannot get ratings', err)
  }
}

exports.jsGetCompanyRating = jsGetCompanyRating
