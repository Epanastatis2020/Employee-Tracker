/* Use our created db */
USE employee_trackerDB;

/* Seed some departments */
INSERT INTO departments (dep_id, name)
VALUES (1, "Accounts");

INSERT INTO departments (dep_id, name)
VALUES (2, "Operations");

INSERT INTO departments (dep_id, name)
VALUES (3, "IT");

/* Seed roles */
INSERT INTO roles (rol_id, title, salary, department_id)
VALUES (1, "Accounts Controller", 140000, 1);

INSERT INTO roles (rol_id, title, salary, department_id)
VALUES (2, "Accounting Clerk", 75000, 1);

INSERT INTO roles (rol_id, title, salary, department_id)
VALUES (3, "Operations Manager", 120000, 2);

INSERT INTO roles (rol_id, title, salary, department_id)
VALUES (4, "Operations Officer", 80000, 2);

INSERT INTO roles (rol_id, title, salary, department_id)
VALUES (5, "Head Technical Officer", 160000, 3);

INSERT INTO roles (rol_id, title, salary, department_id)
VALUES (6, "Software Engineer", 100000, 3);

INSERT INTO roles (rol_id, title, salary, department_id)
VALUES (7, "Junior Software Engineer", 65000, 3);

/* Seed employees */
INSERT INTO employees (emp_id, first_name, last_name, role_id, manager_id)
VALUES (1, "Justyna", "Kowalski", 1, null);

INSERT INTO employees (emp_id, first_name, last_name, role_id, manager_id)
VALUES (2, "Kurt", "Barber", 2, 1);

INSERT INTO employees (emp_id, first_name, last_name, role_id, manager_id)
VALUES (3, "Tom", "Samwell", 3, null);

INSERT INTO employees (emp_id, first_name, last_name, role_id, manager_id)
VALUES (4, "Aline", "Silva", 4, 3);

INSERT INTO employees (emp_id, first_name, last_name, role_id, manager_id)
VALUES (5, "Chris", "Loi", 5, null);

INSERT INTO employees (emp_id, first_name, last_name, role_id, manager_id)
VALUES (6, "Natalia", "Karas", 6, 5);

INSERT INTO employees (emp_id, first_name, last_name, role_id, manager_id)
VALUES (7, "Omar", "Chandia", 7, 5);