const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'company_db'
});

// Functions for the CLI interface

function mainMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'View all department managers',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      }
    ])
    .then(answers => {
      switch (answers.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          // Placeholder for future functionality
          break;
        case 'View all department managers':
          viewDepartmentManagers();
          break;
        case 'Exit':
          process.exit();
      }
    });
}

function executeQuery(sql, values = []) {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function viewDepartments() {
  try {
    const data = await executeQuery('SELECT * FROM department');
    console.table(data);
    mainMenu();
  } catch (error) {
    console.error("Error fetching departments: ", error);
    mainMenu();
  }
}

async function viewRoles() {
  try {
    const data = await executeQuery('SELECT * FROM role');
    console.table(data);
    mainMenu();
  } catch (error) {
    console.error("Error fetching roles: ", error);
    mainMenu();
  }
}

async function viewEmployees() {
  try {
    const data = await executeQuery('SELECT * FROM employee');
    console.table(data);
    mainMenu();
  } catch (error) {
    console.error("Error fetching employees: ", error);
    mainMenu();
  }
}

async function addDepartment() {
  try {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the new department:',
        validate: input => input ? true : "Department name cannot be empty!"
      }
    ]);

    await executeQuery('INSERT INTO department (name) VALUES (?)', [answer.departmentName]);

    console.log("Department added successfully!");
    mainMenu();
  } catch (error) {
    console.error("Error adding department: ", error);
    mainMenu();
  }
}

async function addRole() {
  try {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the new role:',
        validate: input => input ? true : "Role title cannot be empty!"
      },
      {
        type: 'number',
        name: 'salary',
        message: 'Enter the salary for the new role:',
        validate: input => !isNaN(input) && input > 0 ? true : "Please enter a valid salary!"
      },
      {
        type: 'number',
        name: 'departmentId',
        message: 'Enter the department ID for the new role:',
        validate: input => !isNaN(input) && input > 0 ? true : "Please enter a valid department ID!"
      }
    ]);

    await executeQuery('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answer.title, answer.salary, answer.departmentId]);

    console.log("Role added successfully!");
    mainMenu();
  } catch (error) {
    console.error("Error adding role: ", error);
    mainMenu();
  }
}

async function addEmployee() {
  try {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the new employee:',
        validate: input => input ? true : "First name cannot be empty!"
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the new employee:',
        validate: input => input ? true : "Last name cannot be empty!"
      },
      {
        type: 'number',
        name: 'roleId',
        message: 'Enter the role ID for the new employee:',
        validate: input => !isNaN(input) && input > 0 ? true : "Please enter a valid role ID!"
      },
      {
        type: 'number',
        name: 'managerId',
        message: 'Enter the manager ID for the new employee (or leave blank if none):',
        validate: input => !isNaN(input) || input.trim() === "" ? true : "Please enter a valid manager ID or leave blank!",
        default: ""
      }
    ]);

    if (answer.managerId === "") {
      answer.managerId = null;
    }

    await executeQuery('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answer.firstName, answer.lastName, answer.roleId, answer.managerId]);

    console.log("Employee added successfully!");
    mainMenu();
  } catch (error) {
    console.error("Error adding employee: ", error);
    mainMenu();
  }
}

async function viewDepartmentManagers() {
  try {
    const data = await executeQuery('SELECT * FROM employee WHERE manager_id IS NOT NULL');
    console.table(data);
    mainMenu();
  } catch (error) {
    console.error("Error fetching department managers: ", error);
    mainMenu();
  }
}

mainMenu();

