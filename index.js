const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    PORT: 3000,
    user: 'root',
    password: 'password',
    database: "employee_tracker_DB"
})

const startQuest = () =>{
    inquirer.prompt([
        {
            type:'list',
            message: "What prompt would you like to do?",
            choices: ['View Departments', 'View Employees', 'View Roles', 'Add Department', 'Add Employee', 'Update Employee Role', 'Quit'],
            name: "start"
        }
    ]).then (answers =>{
        switch(answers.action){
            case 'View Departments':
                showDpt();
                break;
            case 'View Employees':
                showEmployees();
                console.log('Show the employees')
                break; 
            case 'View Roles':
                showRoles();
                console.log('Show the Roles')
                break;
            case 'Add Department':
                addDept();
                break;
            case 'Add Employees':
                addEmp();
                break; 
            case 'Update Employee Role':
                updateRole();
                break;
            default:
                break;
        }
    })
}

 
const addDept =[
    {
        type:'list',
        message: 'What Department would you like to '
    }
]

connection.connect((err) => {
    if (err) throw err;
    console.log("config done!")
    start()
})