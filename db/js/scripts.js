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
  welcomeScreen();
  showMenu();
}

//------------------------------------------------
// Welcome Message
//------------------------------------------------

function welcomeScreen() {
  const welcomeMessage = `
  
  ***************************************************
  |                                                 |
  |                 Employee-Tracker                |
  |                                                 |
  ***************************************************
  
  * This command-line application will allow a user *
  * to view, add, update or delete various records  *
  * in a CMS, such as employees, roles departments  *
  * or assigned manager. I hope you enjoy it!       *

  `;

  console.clear();
  console.log("\n");
  console.log(welcomeMessage);
  console.log("\n");
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
          "Delete Role",
          "Delete Department",
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
        case "Delete Role":
          deleteRole();
          break;
        case "Delete Department":
          deleteDepartment();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

//------------------------------------------------
// Functions to create arrays of necessary tables
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

//Get Departments array
const departmentQuery = `SELECT dep_id AS value, name AS name FROM departments ORDER BY dep_id`;
const departmentArray = function () {
  return new Promise(function (resolve, reject) {
    connection.query(departmentQuery, function (err, res) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(res);
    });
  });
};

//Get Employees array
const employeeQuery = `SELECT emp_id AS value, CONCAT(first_name, " ", last_name) AS name FROM employees ORDER BY emp_id`;
const employeeArray = function () {
  return new Promise(function (resolve, reject) {
    connection.query(employeeQuery, function (err, res) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(res);
    });
  });
};

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
// Function to add an employee
//------------------------------------------------

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
    .then(async (answer) => {
      let firstName = answer.first_name;
      let lastName = answer.last_name;
      let chosenRole = answer.role_id;
      let chosenManager = null;
      if (answer.manager_choice === true) {
        await inquirer
          .prompt([
            {
              type: "list",
              name: "manager_id",
              message: "Choose the employee's manager:\n",
              choices: managerChoices,
              pageSize: 10,
            },
          ])
          .then((answer) => {
            chosenManager = answer.manager_id;
            return chosenManager;
          });
      }
      let firstAnswer = { firstName, lastName, chosenRole, chosenManager };
      return firstAnswer;
    })
    .then((firstAnswer) => {
      let queryFirstName = firstAnswer.firstName;
      let queryLastName = firstAnswer.lastName;
      let queryChosenRole = firstAnswer.chosenRole;
      let queryChosenManager = firstAnswer.chosenManager;
      connection.query(
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [queryFirstName, queryLastName, queryChosenRole, queryChosenManager],
        function (err, res) {
          if (err) {
            console.log(err);
            console.log("There was a problem adding the new employee");
          }
          console.log("\n");
          console.log("You have succesfully added the new employee");
          console.log("\n");
          showMenu();
        }
      );
    });
}

//------------------------------------------------
// Function to add a role
//------------------------------------------------

async function addRole() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "dep_id",
        message: "Choose the department you want the role created for\n",
        choices: await departmentArray(),
        pageSize: 10,
      },
      {
        type: "input",
        name: "title",
        message: "Enter the title of the role: ",
        validate: function (value) {
          const pass = value.match(/^[a-zA-Z\s]+$/i);
          if (pass) {
            return true;
          }
          return "Please enter a valid title (Upper case, lower case characters and spaces only).";
        },
      },
      {
        type: "input",
        name: "salary",
        message: "What is the renumeration for this role?\n",
        validate: function (value) {
          const pass = value.match(/^[0-9]+$/i);
          if (pass) {
            return true;
          }
          return "Please enter a valid amount (numeric characters only).";
        },
      },
    ])
    .then(async (answer) => {
      let dep_id = answer.dep_id;
      let title = answer.title;
      let salary = answer.salary;
      connection.query(
        "INSERT INTO roles (department_id, title, salary) VALUES (?, ?, ?)",
        [dep_id, title, salary],
        function (err, res) {
          if (err) {
            console.log(err);
            console.log("There was a problem creating the role");
          }
          console.log("\n");
          console.log("You have succesfully added the role");
          console.log("\n");
          showMenu();
        }
      );
    });
}

//------------------------------------------------
// Function to add a department
//------------------------------------------------

async function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of the department: ",
        validate: function (value) {
          const pass = value.match(/^[a-zA-Z\s]+$/i);
          if (pass) {
            return true;
          }
          return "Please enter a valid name (Upper case, lower case characters and spaces only).";
        },
      },
    ])
    .then(async (answer) => {
      let name = answer.name;
      connection.query(
        "INSERT INTO departments (name) VALUES (?)",
        [name],
        function (err, res) {
          if (err) {
            console.log(err);
            console.log("There was a problem creating the department");
          }
          console.log("\n");
          console.log("You have succesfully added the department");
          console.log("\n");
          showMenu();
        }
      );
    });
}

//------------------------------------------------
// Function to update the details of an employee
//------------------------------------------------

async function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "emp_id",
        message: "Choose the employee whose role you want to update \n",
        choices: await employeeArray(),
        pageSize: 15,
      },
      {
        type: "list",
        name: "role_id",
        message: "Choose the employee's new role \n",
        choices: await roleArray(),
        pageSize: 15,
      },
    ])
    .then(async (answer) => {
      let emp_id = answer.emp_id;
      let role_id = answer.role_id;
      connection.query(
        "UPDATE employees SET role_id=? WHERE emp_id=?",
        [role_id, emp_id],
        function (err, res) {
          if (err) {
            console.log(err);
            console.log("There was a problem updating the employee's role");
          }
          console.log("\n");
          console.log("You have succesfully updated the employee's role");
          console.log("\n");
          showMenu();
        }
      );
    });
}

//-------------------------------------------------------------
// Function to update which manager an employee is assigned to
//-------------------------------------------------------------

async function updateEmployeeManager() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "emp_id",
        message: "Choose the employee whose role you want to update \n",
        choices: await employeeArray(),
        pageSize: 15,
      },
      {
        type: "list",
        name: "manager_id",
        message: "Choose the employee's new manager \n",
        choices: await managerArray(),
        pageSize: 15,
      },
    ])
    .then(async (answer) => {
      let emp_id = answer.emp_id;
      let manager_id = answer.manager_id;
      connection.query(
        "UPDATE employees SET manager_id=? WHERE emp_id=?",
        [manager_id, emp_id],
        function (err, res) {
          if (err) {
            console.log(err);
            console.log("There was a problem updating the employee's manager");
          }
          console.log("\n");
          console.log("You have succesfully updated the employee's manager");
          console.log("\n");
          showMenu();
        }
      );
    });
}

//------------------------------------------------
// Function to delete an employee
//------------------------------------------------

async function deleteEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "emp_id",
        message: "Choose the employee you want to delete from the database\n",
        choices: await employeeArray(),
        pageSize: 15,
      },
    ])
    .then((answer) => {
      let emp_id = answer.emp_id;
      connection.query(
        "DELETE FROM employees WHERE emp_id=?",
        [emp_id],
        function (err, res) {
          if (err) {
            console.log(err);
            console.log("There was a problem deleting the record");
          }
          console.log("\n");
          console.log("You have succesfully deleted the employee record");
          console.log("\n");
          showMenu();
        }
      );
    });
}

//------------------------------------------------
// Function to delete a roll
//------------------------------------------------

async function deleteRole() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "rol_id",
        message: "Choose the role you want to delete from the database\n",
        choices: await roleArray(),
        pageSize: 15,
      },
    ])
    .then((answer) => {
      let rol_id = answer.rol_id;
      connection.query("DELETE FROM roles WHERE rol_id=?", [rol_id], function (
        err,
        res
      ) {
        if (err) {
          console.log(err);
          console.log("There was a problem deleting the record");
        }
        console.log("\n");
        console.log("You have succesfully deleted the role");
        console.log("\n");
        showMenu();
      });
    });
}

//------------------------------------------------
// Function to delete a department
//------------------------------------------------

async function deleteDepartment() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "dep_id",
        message: "Choose the department you want to delete from the database\n",
        choices: await departmentArray(),
        pageSize: 15,
      },
    ])
    .then((answer) => {
      let dep_id = answer.dep_id;
      connection.query(
        "DELETE FROM departments WHERE dep_id=?",
        [dep_id],
        function (err, res) {
          if (err) {
            console.log(err);
            console.log("There was a problem deleting the record");
          }
          console.log("\n");
          console.log("You have succesfully deleted the department record");
          console.log("\n");
          showMenu();
        }
      );
    });
}
