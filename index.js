const inquirer = require("inquirer");
const connection = require("./connection.js");

const startQuest = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What prompt would you like to do?",
        choices: [
          "View All Departments",
          "View All Employees",
          "View All Roles",
          "Add Department",
          "Remove Department",
          "Add Employee",
          "Remove Employee",
          "Add Role",
          "Update Employee Role",
          "Quit",
        ],
        name: "start",
      },
    ])
    .then((answers) => {
      switch (answers.start) {
        case "View All Departments":
          showDpt();
          break;
        case "View All Employees":
          showEmployees();
          break;
        case "View All Roles":
          showRoles();
          break;
        case "Add Department":
          addDept();
          break;
        case "Remove Department":
          deleteDept();
          break;
        case "Add Employee":
          addEmp();
          break;
        case "Remove Employee":
          deleteEmp();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "Quit":
          console.log("Here is your team");
          connection.end();
        default:
          break;
      }
    });
};

startQuest();

const addEmp = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Whats the first name of the Employee?",
      },
      {
        type: "input",
        name: "lastName",
        message: "Whats the last name of the Employee?",
      },
      {
        type: "input",
        name: "role",
        message: "Enter the Employee's role id",
      },
      {
        type: "input",
        name: "managerid",
        message: "Enter the Employee's manager id",
      },
    
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: answers.role,
          manager_id: answers.managerid,
        },
        (err, res) => {
          if (err) throw err;
          showEmployees();
          startQuest();
        }
      );
    });
};

const deleteEmp =() => {
  inquirer.prompt([
  {
    type: "input",
    message: "which employee id would you like to delete?",
    name: "delemp",
  },
]).then ((answers) => {
  connection.query(
    "DELETE FROM employee WHERE id = ?",
    answers.delemp,
    (err, res) =>{
    if (err) throw err;
    showEmployees();
    console.log("\n");
    startQuest();
    }
  );
});
};


const addDept = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What Department name would you like to add?",
        name: "department",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO department SET name = ?",
        answers.department,
        (err, res) => {
          if (err) throw err;
          showDpt();

          console.log("\n");

          startQuest();
        }
      );
    });
};

const deleteDept = () => {
  inquirer.prompt([
    {
      type: "input",
      message: "which department id would you like to delete?",
      name: "deldept",
    },
  ]).then ((answers) => {
    connection.query(
      "DELETE FROM department WHERE id = ?",
      answers.deldept,
      (err, res) =>{
      if (err) throw err;
      showDpt();
      console.log("\n");
      startQuest();
      }
    );
  });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName",
      },
      {
        type: "list",
        message: "What is the employee's role",
        choices: [
          "Sales Associate",
          "Stock Supervisor",
          "Floor Supervisor",
          "Assistant Manager",
          "General Manager",
        ],
        name: "role",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO role SET ?",
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role: answers.role,
        },
        (err, res) => {
          if (err) throw err;
          console.table(res);
          startQuest();
        }
      );
    });
};

const updateRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee's role would you like to update",
        name: "name",
      },
      {
        type: "input",
        message: "What should the role be updated to",
        name: "role",
      },
    ])
    .then((answers) => {
      connection.query(
        "UPDATE employee SET role_id = ?  WHERE id = ?;",
        [answers.role, answers.name],
        (err, res) => {
          if (err) throw err;
          showEmployees();
          startQuest();
        }
      );
    });
};

const showRoles = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
  startQuest();
};

const showEmployees = () => {
  connection
    .query(
      ` 
      SELECT
      employee.id,
      employee.first_name,
      employee.last_name,
      role.title,
      department.name AS department,
      role.salary,
      CONCAT(manager.first_name,' ',manager.last_name) AS manager
  FROM
      employee
          LEFT JOIN role on employee.role_id = role.id
          LEFT JOIN department on role.department_id = department.id
          LEFT JOIN employee manager on manager.id = employee.manager_id;
`
    )
    .then((res) => {
      console.table(res);
      startQuest();
    });
};

const showDpt = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.log("\n");
    console.table(res);
  });
  startQuest();
};
