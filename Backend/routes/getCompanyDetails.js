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

module.exports = router;

