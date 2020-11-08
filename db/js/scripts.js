//------------------------------------------------
// Setting dependencies
//------------------------------------------------
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

//------------------------------------------------
// Setting internal dependencies
//------------------------------------------------
const connection = require("../../lib/connection");

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
          viewEmployees();
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
          connection.end();
          break;
      }
    });
}

async function viewEmployees() {
  const query =
    "SELECT * FROM employees JOIN roles ON employees.role_id=roles.id JOIN departments ON roles.department_id=departments.id ORDER BY employees.id";
  connection.query(query, function (err, res) {
    if (err) {
      console.log(err);
    }
    let employeeArray = [];
    for (let i = 0; i < res.length; i++) {
      let employee = {
        ID: res[i].employee_id,
        Name: res[i].first_name + " " + res[i].last_name,
        Title: res[i].title,
        Department: res[i].department,
        Salary: res[i].salary,
        Manager: res[i].manager_id
          ? res[res[i].manager_id - 1].first_name +
            " " +
            res[res[i].manager_id - 1].last_name
          : null,
      };
      employeeArray.push(employee);
    }
    console.log("\n");
    console.table(employeeArray);
    showMenu();
  });
}

async function viewDepartments() {}

async function viewRoles() {}

async function viewEmployeesByManager() {}

async function viewBudgetByDepartment() {}

async function addEmployee() {}

async function addRole() {}

async function addDepartment() {}

async function updateEmployeeRole() {}

async function updateEmployeeManager() {}

async function deleteEmployee() {}

module.exports = { viewEmployees };
