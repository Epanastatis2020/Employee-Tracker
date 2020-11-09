# Employee-Tracker

A command-line application that allows the user to view and manage an organisation's departments, roles and employees.

## Description

[![License](https://img.shields.io/badge/License-MIT-<Blue>.svg)](https://shields.io/)  
Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as Content Management Systems. In this application, the challenge was to architect and build a solution for managing a company's employees using node, inquirer, and MySQL.

To that end, I have built a command-line application tha allows the user to:

Add departments, roles, employees

View departments, roles, employees

Update employee roles

Update employee managers

View employees by manager

Delete departments, roles, and employees

View the total utilized budget of a department -- ie the combined salaries of all employees in that department

## Table of Contents

- [User Story](#userStory)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Images](#images)
- [Video](#video)
- [Tests](#tests)
- [Contact](#contact)

## User Story

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organise and plan my business

## Installation

1. Clone this GitHub repository

   ```
   git clone git@github.com:Epanastatis2020/Employee-Tracker.git
   ```

2. Install all dependent npm packages

   ```
   npm i
   ```

3. Create the **employee_trackerDB** database running the script `db/sql/create_db.sql` in MySQL
4. Create the **departments** table running the script `db/sql/department.sql` in MySQL
5. Create the **roles** table running the script `db/sql/role.sql` in MySQL
6. Create the **employees** table running the script `db/sql/employee.sql` in MySQL
7. Seed mock data running the script `db/sql/seed.sql` in MySQL

## Usage

1. Navigate to the `lib/` directory and open "connection.js" with your favourite code editor. Enter your MySQL password in the password field.
2. Navigate to the `db/js/` directory with your command terminal and type "node scripts.js". Follow the prompts to generate your team profile html.

## License

This project uses the MIT license.

## Images

![WelcomeScreen](https://user-images.githubusercontent.com/65388616/98504209-7fde6c80-22aa-11eb-9ee4-88e4591d3337.png)

![ViewEmployees](https://user-images.githubusercontent.com/65388616/98504220-8d93f200-22aa-11eb-979b-d5ffb3288d30.png)

![ViewDepartments](https://user-images.githubusercontent.com/65388616/98504236-9c7aa480-22aa-11eb-9390-bd1fb646183f.png)

![ViewRoles](https://user-images.githubusercontent.com/65388616/98504257-a6040c80-22aa-11eb-8c0f-c968beb7d395.png)

## Video

[Video Demonstration](https://drive.google.com/file/d/1RS_WPAK6eKpxg1Ic3TK8hMo_aOe6QKAa/view)

## Tests

N/A

## Contact

Github: [Epanastatis2020](https://github.com/Epanastatis2020)  
Email: <test@email.com.au>
