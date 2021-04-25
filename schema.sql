DROP DATABASE IF EXISTS employee_tracker_DB;
CREATE DATABASE employee_tracker_DB;

USE employee_tracker_DB;

CREATE TABLE department (
    id INTEGER NOT NULL AUTOINCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INTEGER NOT NULL AUTOINCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,),
    department_id INTEGER NOT NULL,
    PRIMARY KEY (id),
);

CREATE TABLE employee (
    id INTEGER NOT NULL AUTOINCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO department (name) 
VALUES ('Sales');
INSERT INTO department (name) 
VALUES ('Stock');
INSERT INTO department (name) 
VALUES ('Management');

INSERT INTO roles (title, salary, department_id)
 VALUES ('Sales Associate', 30000, 1);
INSERT INTO roles (title, salary, department_id) 
VALUES ('Stock Supervisor', 35000, 2);
INSERT INTO roles (title, salary, department_id) 
VALUES ('Floor Supervisor', 40000, 3);
INSERT INTO roles (title, salary, department_id) 
VALUES ('Assistant Manager', 45000, 4);
INSERT INTO roles (title, salary, department_id) 
VALUES ('General Manager', 50000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
ValUES ('Andrew', 'Mulhall', 1, 5)
INSERT INTO employee (first_name, last_name, role_id, manager_id)
ValUES ('Allan', 'Rascon', 2, 4)
INSERT INTO employee (first_name, last_name, role_id, manager_id)
ValUES ('Andrew', 'Yu', 3, 3)
INSERT INTO employee (first_name, last_name, role_id, manager_id)
ValUES ('Jacob', 'Feltner', 4, 2)
INSERT INTO employee (first_name, last_name, role_id, manager_id)
ValUES ('Aera', 'Wall', 5, 1)