//------------------------------------------------
// Setting dependencies
//------------------------------------------------
const inquirer = require("inquirer");
const mysql = require("mysql");

//------------------------------------------------
// Setting internal dependencies
//------------------------------------------------
const connection = require("./data/connection");

//------------------------------------------------
// Initialiser
//------------------------------------------------

init();

async function init() {
  if (connection) {
    connection.connect((err) => {
      if (err) throw err;
      console.log("Connected as id " + connection.threadId);
      showMenu();
    });
  } else {
    init();
  }
}

//------------------------------------------------
// Show Menu function
//------------------------------------------------

async function showMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "View Employees By Manager",
          "Add Employee",
          "Add Role",
          "Add Department",
          "Delete Employee",
          "Update Employee's Role",
          "Update Employee's Manager",
          "View Department Budget",
          "Exit",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.task) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View Employees By Manager":
          viewEmployeesByManager();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Delete Employee":
          deleteEmployee();
          break;
        case "Update Employee's Role":
          updateEmployeeRole();
          break;
        case "Update Employee's Manager":
          updateEmployeeManager();
          break;
        case "View Department Budget":
          viewBudgetByDepartment();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}
