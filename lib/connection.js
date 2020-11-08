//------------------------------------------------
// Setting dependencies
//------------------------------------------------
const mysql = require("mysql");
const util = require("util");

//------------------------------------------------
// Setting connection
//------------------------------------------------

var connection = mysql.createConnection({
  host: "localhost",
  port: 4000,
  user: "root",
  password: "SQLr00tP@$sword",
  database: "employee_trackerDB",
});

connection.connect();
connection.query = util.promisify(connection.query);

module.exports = connection;
