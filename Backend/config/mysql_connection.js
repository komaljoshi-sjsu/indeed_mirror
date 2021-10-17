const mysql = require('mysql');

const mysqlCon = mysql.createConnection({
  connectionLimit: 10,
  host: '',
  user: '',
  password: '',
  database:'',
  port: 3306
});

exports.mysqlCon = mysqlCon;