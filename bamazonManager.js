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
    getTable(false, managerOptions);
});

const getTable = function (display, callback) {
    connection.query(`SELECT * FROM products`, (err, resp) => {
        if (err) throw err;
        if (display)
            console.table(resp);
        if (callback !== undefined)
            callback(resp);
    });
}

const managerOptions = function (table) {
    inquirer.prompt(
        {
            name: "option",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        }
    ).then(answers => {
        switch (answers.option) {
            case "View Products for Sale":
                console.table(table);
                managerOptions(table);
                break;
            case "View Low Inventory":
                connection.query(`SELECT * FROM products WHERE stock_quantity < 5`, (err, resp) => {
                    if (err) throw err;
                    console.table(resp);
                    managerOptions();
                });
                break;
            case "Add to Inventory":
                addToInventory(table);
                break;
            case "Add New Product":
                addNewProduct(table);
                break;
            default: connection.end();
        }
    });
}

const addToInventory = function (table) {
    inquirer.prompt([
        {
            name: "product",
            message: "What's the id of the item you are adding more of?",
            validate: function (id) {
                return (parseInt(id) > 0 && parseInt(id) <= table.length);
            }
        },
        {
            name: "amount",
            message: "How many are you adding?"
        }
    ]).then(answers => {
        const id = parseInt(answers.product);
        const newAmount = table[id - 1].stock_quantity + parseInt(answers.amount);
        console.log(`ID: ${id} :: quantity: ${newAmount}`);
        connection.query(`UPDATE products SET stock_quantity=${newAmount} WHERE item_id=${id}`, (err) => {
            if (err) throw err;
        getTable(true, managerOptions);
        });
    });
}

const addNewProduct = function (table) {
    inquirer.prompt([
        {
            name: "item",
            message: "What is the new product called?"
        },
        {
            name: "department",
            message: "What department is the new product sold in?"
        },
        {
            name: "price",
            message: "How much does the new product sell for?",
            validate: function (amount) {
                return (!isNaN(amount) && amount > 0);
            }
        },
        {
            name: "quantity",
            message: "How many of the new product are in stock?"
        }
    ]).then(answers => {
        connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) `
            + `VALUES ('${answers.item}', '${answers.department}', ${parseInt(answers.price)}, ${parseInt(answers.quantity)})`,
            (err) => {
                if (err) throw err;
                getTable(true, managerOptions);
            }
        );
    });
}