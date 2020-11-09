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

//------------------------------------------------
// Function to view all employees
//------------------------------------------------

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

//------------------------------------------------
// Function to view all departments
//------------------------------------------------

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

//------------------------------------------------
// Function to view all roles
//------------------------------------------------

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

//---------------------------------------------------
// Function to view all employees filtered by manager
//---------------------------------------------------

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
        let chosenManager = answer.manager;
        const query =
          "SELECT * FROM employees JOIN roles ON employees.role_id=roles.rol_id JOIN departments ON roles.department_id=departments.dep_id WHERE ? ORDER BY emp_id";
        connection.query(query, { manager_id: chosenManager }, function (
          err,
          res
        ) {
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

//----------------------------------------------------------------------
// Function to view the budget of a department (i.e. combined salaries)
//----------------------------------------------------------------------

async function viewBudgetByDepartment() {
  const query = `SELECT dep_id AS value, name AS name FROM departments ORDER BY dep_id`;
  connection.query(query, function (err, res) {
    if (err) {
      console.log(err);
    }
    inquirer
      .prompt([
        {
          type: "rawlist",
          name: "department",
          message: "Select Department",
          choices: res,
        },
      ])
      .then((answer) => {
        let chosenDepartment = answer.department;
        const query =
          "SELECT salary FROM roles JOIN employees ON roles.rol_id=employees.role_id JOIN departments ON roles.department_id=departments.dep_id WHERE ? ORDER BY rol_id";
        connection.query(query, { dep_id: chosenDepartment }, function (
          err,
          res
        ) {
          if (err) {
            console.log(err);
          }
          let budget = 0;
          res.forEach((emp) => {
            budget += emp.salary;
          });
          console.log("\n");
          console.log(`The total budged for this department is ${budget}`);
          console.log("\n");
          showMenu();
        });
      })
      .catch((error) => console.error(error));
  });
}

//------------------------------------------------
// Functions to add an employee
//------------------------------------------------

//Get Roles array
const roleQuery = `SELECT rol_id AS value, title AS name FROM roles ORDER BY rol_id`;
const roleArray = function () {
  return new Promise(function (resolve, reject) {
    connection.query(roleQuery, function (err, res) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(res);
    });
  });
};

//Get Managers array
const managerQuery = `SELECT emp_id AS value, CONCAT(first_name, " ", last_name) AS name FROM employees WHERE ISNULL(manager_id) ORDER BY emp_id`;
const managerArray = function () {
  return new Promise(function (resolve, reject) {
    connection.query(managerQuery, function (err, res) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(res);
    });
  });
};

//Add employee function
async function addEmployee() {
  let managerChoices = await managerArray();
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the employee's first name: ",
        validate: function (value) {
          const pass = value.match(/^[a-zA-Z\s]+$/i);
          if (pass) {
            return true;
          }
          return "Please enter a valid name (Upper case, lower case characters and spaces only).";
        },
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the employee's last name: ",
        validate: function (value) {
          const pass = value.match(/^[a-zA-Z\s]+$/i);
          if (pass) {
            return true;
          }
          return "Please enter a valid name (Upper case, lower case characters and spaces only).";
        },
      },
      {
        type: "list",
        name: "role_id",
        message: "Choose the employee's role:\n",
        choices: await roleArray(),
        pageSize: 12,
      },
      {
        type: "confirm",
        name: "manager_choice",
        message: "Does this employee have a manager?:\n",
        default: "true",
      },
    ])
    .then((answer) => {
      if (answer.manager_choice === true) {
        inquirer.prompt([
          {
            type: "list",
            name: "manager_id",
            message: "Choose the employee's manager:\n",
            choices: managerChoices,
            pageSize: 10,
          },
        ]);
      }
      let firstName = answer.first_name;
      let lastName = answer.last_name;
      let chosenRole = answer.role_id;
      let chosenManager = answer.manager_id;
      const query =
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      connection.query(
        query,
        [firstName, lastName, chosenRole, chosenManager],
        function (err, res) {
          if (err) {
            console.log(err);
          }
          console.log("\n");
          console.log("You have succesfully added the following employee:");
          console.log("\n");
          console.table(res);
          showMenu();
        }
      );
    })
    .catch((error) => console.error(error));
}

//------------------------------------------------
// Function to add a role
//------------------------------------------------

async function addRole() {}

//------------------------------------------------
// Function to add a department
//------------------------------------------------

async function addDepartment() {}

//------------------------------------------------
// Function to update the details of an employee
//------------------------------------------------

async function updateEmployeeRole() {}

//-------------------------------------------------------------
// Function to update which manager an employee is assigned to
//-------------------------------------------------------------

async function updateEmployeeManager() {}

//------------------------------------------------
// Function to delete an employee
//------------------------------------------------

async function deleteEmployee() {}
