var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: process.env.PORT || 3306,
    user: "root",
    password: "PaQq5QMnRC&s^As9REmY@xIiF489C7",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    getTable(true, purchase);
});

const getTable = function (display, callback) {
    connection.query(`SELECT * FROM products WHERE stock_quantity > 0`, (err, resp) => {
        if (err) throw err;
        if (display)
            console.table(resp);
        if (callback !== undefined)
            callback(resp);
    });
}

const purchase = function (table) {
    inquirer.prompt([
        {
            name: "id",
            message: "What is the ID of the item you would like to purchase?",
            validate: function (id) {
                for(let i = 0; i < table.length; i++) {
                    if (table[i].item_id == id) {
                        return true;
                    }
                }
                return "No such item currently in stock";
            }
        },
        {
            name: "amount",
            message: "How many would you like to purchase?"
        }
    ]).then(answers => {
        for(let i = 0; i < table.length; i++) {
            if (answers.id == table[i].item_id) {
                if (parseInt(answers.amount) > table[i].stock_quantity) {
                    console.log(`We only have ${table[i].stock_quantity} ${table[i].product_name}s`);
                    askIfPurchasing();
                } else {
                    console.log(`Your purchase cost $${answers.amount * table[i].price}. Thank you for your support.`);
                    updateDatabase(answers.id, (table[i].stock_quantity - answers.amount));
                }
            }
        }
    });
}

const updateDatabase = function (id, newAmount) {
    console.log(newAmount);
    connection.query(`UPDATE products SET stock_quantity=${newAmount} WHERE item_id=${id}`, (err) => {
        if (err) throw err;
        askIfPurchasing();
    });
}

const askIfPurchasing = function() {
    inquirer.prompt(
        {
            name: "again",
            type: "confirm",
            message: "Would you like to make another purchase?"
        }
    ).then(answers => {
        if (answers.again) {
            getTable(true, purchase);
        } else {
            console.log("Have a nice day!");
            connection.end();
        }
    });
}