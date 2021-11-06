const express = require("express");
const router = express.Router();
const conn = require("../config/mysql_connection");

router.get("/api/getAllReviewsByCompanyId/:companyId", async (req, res) => {
  const companyId = req.params.companyId;
  const query = "SELECT r.*, c.companyName FROM Review r, Company c where r.companyId=? and r.companyId = c.companyId order by r.postedDate desc";
  conn.query(query, companyId, function (err, rows) {
    if (err) {
      console.log("Error occured while querying");
      res.status(400).send("Error occurred while retrieving all the reviews");
    }
    console.log("server result" + rows);
    res.status(200).send(rows);
  });
});

module.exports = router;