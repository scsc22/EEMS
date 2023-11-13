-- Inserting sample departments
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Finance');
INSERT INTO department (name) VALUES ('Human Resources');

-- Inserting sample roles
INSERT INTO role (title, salary, department_id) VALUES ('Sales Executive', 60000.00, 5);
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 90000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Financial Analyst', 75000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ('HR Manager', 85000.00, 4);

-- Inserting sample employees
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Mark', 'Train', 2); -- Mark Train is a software engineer
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jones', 'Bones', 1, 1); -- Jones Bones is a sales executive reporting to Mark Train