

require("dotenv").config();
const mysql = require("mysql2");

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;


const pool = mysql.createPool(urlDB);


pool.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection pool failed", err);
    return;
  }
  console.log("MySQL connection pool established");
  connection.release();
});

module.exports = pool;

