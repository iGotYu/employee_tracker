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

