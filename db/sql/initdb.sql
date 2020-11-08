/* Create the new database and run the schemas to populate it */

/* Create DB */
SOURCE create_db.sql;

/* Create departments table */
SOURCE department.sql;

/* Create roles table */
SOURCE role.sql;

/* Create employees table */
SOURCE employee.sql;

/* Seed the tables with data */
SOURCE seed.sql;