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
    "SELECT * FROM employees JOIN roles ON employees.role_id=roles.rol_id JOIN departments ON roles.department_id=departments.dep_id ORDER BY employees.emp_id";
  connection.query(query, function (err, res) {
    if (err) {
      console.log(err);
    }
    let employeeArray = [];
    for (let i = 0; i < res.length; i++) {
      let employee = {
        ID: res[i].emp_id,
        Name: res[i].first_name + " " + res[i].last_name,
        Title: res[i].title,
        Department: res[i].dep_id,
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

async function viewDepartments() {
  const query = "SELECT * FROM departments ORDER BY departments.dep_id";
  connection.query(query, function (err, res) {
    if (err) {
      console.log(err);
    }
    let departmentsArray = [];
    for (let i = 0; i < res.length; i++) {
      let department = {
        ID: res[i].dep_id,
        Name: res[i].name,
      };
      departmentsArray.push(department);
    }
    console.log("\n");
    console.table(departmentsArray);
    showMenu();
  });
}

async function viewRoles() {
  const query =
    "SELECT * FROM roles JOIN departments ON roles.department_id=departments.dep_id ORDER BY roles.rol_id";
  connection.query(query, function (err, res) {
    if (err) {
      console.log(err);
    }
    let rolesArray = [];
    for (let i = 0; i < res.length; i++) {
      let role = {
        ID: res[i].rol_id,
        Role: res[i].title,
        Salary: res[i].salary,
        Department: res[i].dep_id,
      };
      rolesArray.push(role);
    }
    console.log("\n");
    console.table(rolesArray);
    showMenu();
  });
}

async function viewEmployeesByManager() {
  const query = `SELECT emp_id AS value, CONCAT(first_name, " ", last_name) AS name FROM employees WHERE employees.manager_id IS NULL ORDER BY emp_id`;
  connection.query(query, function (err, res) {
    if (err) {
      console.log(err);
    }
    inquirer
      .prompt([
        {
          type: "rawlist",
          name: "manager",
          message: "Select Manager",
          choices: res,
        },
      ])
      .then((answer) => {
        const query =
          "SELECT * FROM employees JOIN roles ON employees.role_id=roles.rol_id JOIN departments ON roles.department_id=departments.dep_id WHERE ? ORDER BY emp_id";
        connection.query(query, { manager_id: answer }, function (err, res) {
          if (err) {
            console.log(err);
          }
          let employeesArray = [];
          for (let i = 0; i < res.length; i++) {
            let employee = {
              ID: res[i].emp_id,
              Name: res[i].first_name + " " + res[i].last_name,
              Title: res[i].title,
              Department: res[i].dep_id,
              Salary: res[i].salary,
            };
            employeesArray.push(employee);
          }
          console.log("\n");
          console.table(employeesArray);
          showMenu();
        });
      })
      .catch((error) => console.error(error));
  });
}

async function viewBudgetByDepartment() {}

async function addEmployee() {}

async function addRole() {}

async function addDepartment() {}

async function updateEmployeeRole() {}

async function updateEmployeeManager() {}

async function deleteEmployee() {}
