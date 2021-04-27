const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    // PORT: 3306,
    user: 'root',
    password: 'password',
    database: "employee_tracker_db"
})



connection.connect((err) => {
    if (err) {throw err};
    console.log("config connecting!")
    //startQuest();
})

connection.query = util.promisify(connection.query);

module.exports = connection;