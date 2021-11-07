//loading all the restaurants for the customer
const express = require("express");
const router = express.Router();
const connection = require("../config/mysql_connection");

router.get("/getCompanyDetails", function (req, res) {
    let sql1 = "SELECT * FROM Company";
    connection.query(sql1, (error, result) => {
        if (error) {
            res.status(400).send("Error occured while retrieving company details");
        }
        res.status(200).send(JSON.stringify(result));
    });
});

router.get("/getCompanyDetailsPaginated", function (req, res) {
    const params = JSON.parse(req.query.data)
    const postsPerPage = 20;
    const currentPage = params.currentPage;
    const offset = 5*(currentPage-1)
    const query = "SELECT * FROM Company LIMIT ?, ?";
    const count = "SELECT COUNT(*) AS total FROM Company";
    connection.query(query, [offset, postsPerPage], (error, rows) => {
        if (error) {
            res.status(400).send("Error occured while retrieving company details");
        } else{
            connection.query(count, function (err, rows2) {
              if (err) {
                console.log("Error occured while querying"+err);
                return res.status(400).send("Error occurred while retrieving pending reviews");
              }
              console.log("server result" + rows);
              return res.status(200).json({ companyDtls: rows, count:rows2[0].total});
            })
          }
    });
});

module.exports = router;

