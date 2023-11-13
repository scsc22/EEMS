-- Get all departments
SELECT * FROM department;

-- Get all roles
SELECT * FROM role;

-- Get all employees
SELECT * FROM employee;

-- Get employees with their roles and departments
SELECT 
    e.id,
    e.first_name,
    e.last_name,
    r.title AS role,
    d.name AS department,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;

-- Add a new department
INSERT INTO department (name) VALUES ('Marketing');

-- Add a new role
INSERT INTO role (title, salary, department_id) VALUES ('Marketing Specialist', 70000.00, 5);

-- Add a new employee
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Emily', 'Smith', 5);

-- Update employee's role
UPDATE employee SET role_id = 3 WHERE id = 1;

-- Delete an employee (assuming the employee is not a manager)
DELETE FROM employee WHERE id = 2;

-- Delete a role (assuming the role has no associated employees)
DELETE FROM role WHERE id = 4;

-- Delete a department (assuming the department has no associated roles)
DELETE FROM department WHERE id = 5;
