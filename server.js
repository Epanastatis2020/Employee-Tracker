//------------------------------------------------
// Setting dependencies
//------------------------------------------------
const inquirer = require("inquirer");
const mysql = require("mysql");

//------------------------------------------------
// Setting internal dependencies
//------------------------------------------------
const connection = require("./lib/connection");
const scripts = require("./db/js/scripts");

//------------------------------------------------
// Initialiser
//------------------------------------------------

init();

async function init() {
  showMenu();
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
          "View Employees",
          "View Departments",
          "View Roles",
          "View Employees By Manager",
          "View Department Budget",
          "Add Employee",
          "Add Role",
          "Add Department",
          "Update Employee's Role",
          "Update Employee's Manager",
          "Delete Employee",
          "Exit",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.task) {
        case "View Employees":
          scripts.viewEmployees();
          break;
        case "View Departments":
          viewDepartments();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Employees By Manager":
          viewEmployeesByManager();
          break;
        case "View Department Budget":
          viewBudgetByDepartment();
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
        case "Update Employee's Role":
          updateEmployeeRole();
          break;
        case "Update Employee's Manager":
          updateEmployeeManager();
          break;
        case "Delete Employee":
          deleteEmployee();
          break;
        case "Exit":
          //connection.end();
          break;
      }
    });
}

module.exports = showMenu;
