// put all my require packages
var inquirer = require('inquirer');
var mysql = require('mysql');
var cTable = require('console.table');

//Connect to my server
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "root",
    database: 'bamazonDB'
});

//connect to the database
connection.connect(function(err) {
// in case it returns errors
    if (err) throw err;
    //need to show the customer what we have
    // whatDoWeHave();
});

//message 1: ask for id of product they want to buy
//message 2: ask how many units of the product they would like to buy
function startShopping(){
    inquirer.prompt([
        {
            type : "input",
            name : "choice",
            message : "What item would you like to purchase? Enter the ID number."
        },
        {
            type : "input",
            name : "quantity",
            message : "How many would you like? Please enter a number."
        },
        //we need to validate the entrys or it will return an error
    ]).then(function(values) {
        //set the values for the customer inputs
        var customerInputID = parseInt(values.choice);
        var customerInputQuantity = values.quantity;
        buyThings(customerInputID, customerInputQuantity);
    });
};

//buy things function
function buyThings(id, quantity){
    var query = "SELECT * FROM products where item_id=" + id;
    connection.query(query, function(err,response){
        if (err) throw err;
        //first we check if we have enough in stock
        var haveEnough = checkQuantity(response[0].product_name, quantity, response[0].stock_quantity);
        //if we have enough in stock
        if (haveEnough === true) {
            //calculate the total
            var total = response[0].price * quantity;
            //inform the customer of the total cost
            console.log("The total cost of " + quantity + " " + response[0].product_name + " is " + total);
            //make changes to the database to reflect the purchase of the items
            var newQuantity = response[0].stock_quantity - quantity;
            //console.log(id, quantity, newQuantity);
            connection.query("UPDATE products SET stock_quantity = " + newQuantity + " WHERE item_id = " + id);
        }
    });
    //start over
    setTimeout(whatDoWeHave, 2000);
};

//check if the store has enough for the order..."Insufficiant quantity"
function checkQuantity(productName, quantityRequested, quantityInStock){
    if (quantityRequested <= quantityInStock) {
        return true;
    }
    else {
        console.log("We don't have that many " + productName + ".");
        return false
    }
};

//what do we have in the store
function whatDoWeHave() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, response) {
        if (err) throw err;
        console.log("\n");
        console.log(" ------------------CURRENT INVENTORY----------------");
        console.table(response);
        //now we ask the customer what they want to buy
        startShopping();

    });
};

whatDoWeHave();