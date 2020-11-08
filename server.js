//------------------------------------------------
// Setting dependencies
//------------------------------------------------
const inquirer = require("inquirer");
const mysql = require("mysql");

//------------------------------------------------
// Setting internal dependencies
//------------------------------------------------

const connection = mysql.createConnection({
  host: "localhost",
  port: 4000,
  user: "root",
  password: "SQLr00tP@$sword",
  database: "employee_trackerDB",
});

function init() {
  if (connection) {
    connection.connect((err) => {
      if (err) throw err;
      console.log("Connected as id " + connection.threadId);
      runMenu();
    });
  } else {
    init();
  }
}

init();
