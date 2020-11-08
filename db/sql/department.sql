/* Use our created db */
USE employee_trackerDB;

/* Create table with id that auto increments, and name */
CREATE TABLE departments (
    dep_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (dep_id)
);