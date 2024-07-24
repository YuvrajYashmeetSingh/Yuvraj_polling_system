const mysql = require('mysql2');
// create a new MySQL connection
require('dotenv').config();
const {host,user,password,database,port}=process.env 
const db = mysql.createPool({
  host:host, 
  user: user, 
  password: password, 
  database: database, 
  port: port 
});
const promisePool = db.promise();
module.exports = promisePool