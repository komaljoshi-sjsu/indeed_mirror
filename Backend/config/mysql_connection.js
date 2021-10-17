const mysql = require('mysql');

const mysqlCon = mysql.createConnection({
  connectionLimit: 10,
  host: 'indeedmysql273database.c2oqhcbfsxrv.us-west-2.rds.amazonaws.com',
  user: 'admin',
  password: 'ZlQhcaSRV1s0D1H3IUJs',
  database:'indeedMysqlDatabase',
  port: 3306
});

exports.mysqlCon = mysqlCon;