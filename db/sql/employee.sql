/* Use our created db */
USE employee_trackerDB;

/* Create table with id that auto increments, first name, last name, */ 
/* reference to their role id, reference to their manager id */
    emp_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (emp_id),
    FOREIGN KEY (role_id) REFERENCES roles(rol_id),
    FOREIGN KEY (manager_id) REFERENCES employees(emp_id)
);
