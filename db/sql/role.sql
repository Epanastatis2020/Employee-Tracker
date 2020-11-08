/* Use our created db */
USE employee_trackerDB;

/* Create table with id that auto increments, title, salary and a reference to their department_id */
CREATE TABLE roles (
    rol_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (rol_id),
    FOREIGN KEY (department_id) REFERENCES departments(dep_id)
);
