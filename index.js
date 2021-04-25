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
            case 'Add Role':
                addRole();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            default:
                break;
        }
    })
}

startQuest();
 
const addEmp = () =>{
    inquirer.prompt([
        {
            type: 'input',
            name: "firstName",
            message: "Whats the first name of the Employee?"
        },
        {
            type: 'input',
            name: "lastName",
            message: "Whats the last name of the Employee?"
        },
        {
            type: 'list',
            name: "role",
            message: "Select the Role",
            choices: ["Sales Associate", "Stock Supervisor", "Floor Supervisor", "Assistant Manager", "General Manager"]
        },
        {
            type: 'list',
            name: "department",
            message: "Select the Department",
            choices: ["Sales", "Stock", "Management"]
        },
        {
            type: 'number',
            name: "salary",
            message: "What is this employees salary",
        
        },
        {
            type: 'list',
            name: "salary",
            message: "What is this employees salary",
        
        }
    ]).then (answers =>{
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role: answers.role,
                department: answers.department,
                salary: answers.salary
            },
            (err,res) =>{
                if (err) throw err;
                console.table(res)
                startQuest();
            })
        })
    }

const addDept =() =>{
    inquirer.prompt([
        {
            type: 'list',
            message: "What is the Department name?",
            choices: ["Sales", "Stock", "Management", "Add new Department"],
            name: "department"
        }
    ]).then (answers =>{
        connection.query(
            "INSERT INTO department SET name =?", answers.department,
            (err, res)=> {
                if (err) throw err;
                console.table(res)
                startQuest();
            }
        )
    })
}

const addRole = () =>{
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the employee's first name?",
            name:'firstName'
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name:'lastName'
        },
        {
            type: 'list',
            message: "What is the employee's role",
            choices: ["Sales Associate", "Stock Supervisor", "Floor Supervisor", "Assistant Manager", "General Manager"],
            name:'role'
        },
    ]).then (answers =>{
        connection.query(
            "INSERT INTO role SET ?",
            {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role: answers.role
            },
            (err, res) =>{
                if (err) throw err;
                console.table(res)
                startQuest();
            }
        )
    })
}

const updateRole = () =>{
    inquirer.prompt([
        {
            type:'list',
            message: "Which employee's role would you like to update",
            choices: [],
            name: 'name'
        },
        {
            type:'list',
            message: "What should the role be updated to",
            choices: [],
            name: 'role'
        },
    ]).then (answers =>{
        connection.query(
            "SELECT name,role FROM ?",
            {
                role : answers.role
            },
            (err, res) => {
                if (err) throw err;
                console.table(res)
                startQuest();
            }
        )
    })
}

const showRoles = () =>{
    console.log("Showing employees by role ...\n");
    connection.query('SELECT * FORM role', (err, res) =>{
        if (err) throw err;
        console.table(res);
    })
    startQuest();
};

const showEmployees = () =>{
    console.log ("Showing all employees...\n");
    connection.query('SELECT * FROM role', (err, res) =>{
        if (err) throw err;
        console.table(res);
    })
    startQuest();
};

const showDpt = () =>{
    console.log ("Showing all departments... \n");
    connection.query('SELECT * FROM department', (err, res) =>{
        if (err) throw err;
        console.table(res);
    })
    startQuest();
};


connection.connect((err) => {
    if (err) throw err;
    console.log("config done!")
    startQuest();
})