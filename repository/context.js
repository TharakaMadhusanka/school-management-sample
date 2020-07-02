'use strict'

const mysql = require("mysql");
const dbConfig = require("../utility/config.json");

// Create a connection to the database
const context = mysql.createConnection({
  host: dbConfig.DbServer,
  user: dbConfig.DbUserName,
  password: dbConfig.DbPassword,
  database: dbConfig.Database
});

// open the MySQL connection
context.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = context;

