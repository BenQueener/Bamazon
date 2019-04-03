// put all my require packages
var inquirer = require('inquirer');
var mysql = require('mysql')

//Connect to my server
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root'
    password: "root",
    database: 'bamazonDB'
})

//connect to the database
connection.connect(function(err) {
// in case it returns errors
    if (err) throw err;
    



})

//message 1: ask for id of product they want to buy
//message 2: asl how many units of the product they would like to buy

//check if the store has enough for the order..."Insuffciant quantity"

//if you have enough product for the order...
//update the database for the remaining quantity
//show the customer the total cost