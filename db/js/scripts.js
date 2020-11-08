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
const server = require("../../server");

//------------------------------------------------
// Functions
//------------------------------------------------

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
    serverJS.showMenu();
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
