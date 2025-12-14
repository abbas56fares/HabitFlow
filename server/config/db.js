

require("dotenv").config();
const mysql = require("mysql2");

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

const connection = mysql.createConnection(urlDB);

connection.connect((err) => {
  if (err) {
    console.error("MySQL connection failed", err);
    return;
  }
  console.log("MySQL connection established");
});

module.exports = connection;
//  MySQL connection setup
