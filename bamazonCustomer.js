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
    //need to show the customer what we have
    whatDoWeHave();
});

//message 1: ask for id of product they want to buy//message 2: asl how many units of the product they would like to buy
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
        var customerInputID = values.choice;
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
        var haveEnough = checkQuantity(id, quantity);
        //if we have enough in stock
        if (haveEnough === true) {
            //calculate the total
            var total = response[0].price * quantity;
            //inform the customer of the total cost
            console.log("The total cost of " + quantity + " " + response[0].product_name + "s is " + total);
            //make changes to the database to reflect the purchase of the items
            connection.query("UPDATE products SET stock_quantity = stock_quantity - " + quantity + "WHERE item_id = " + id);
        }
    });
}

//check if the store has enough for the order..."Insuffciant quantity"
function checkQuantity(id, quantity){
    if (quantity <= response[0].stock_quantity) {
        return true;
    }
    else {
        console.log("We don't have that many " + response[0].product_name + "s.");
        return false
    }
}
//if you have enough product for the order...
//update the database for the remaining quantity
//show the customer the total cost

//what do we have in the store
function whatDoWeHave() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, response) {
        if (err) throw err;
        console.log(" ------------------CURRENT INVENTORY----------------");
        console.log(response);
        //now we ask the customer what they want to buy
        startShopping();

    });
}