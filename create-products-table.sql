DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id int(4) auto_increment,
    product_name varchar(60) not null,
    department_name varchar(60) not null,
    price decimal(5,2) not null,
    stock_quantity integer(5) not null,
    primary key(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ('Ball', 'Sports', 0.75, 55);
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ('Spiked Shoes', 'Sports', 8.11, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ('Mouthgaurd', 'Sports', 0.75, 45);
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ('Cast Iron Pan', 'Cooking', 5.75, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ('Giant Knife', 'Cooking', 2, 35);
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ('Golden Spatula', 'Cooking', 20, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ('Olive Oil', 'Groceries', .33, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ('Ketchup', 'Groceries', .10, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ('Frozen Tomales', 'Groceries', 6.00, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ('Ancient Baseball Card', 'Collectable', 19.53, 1);