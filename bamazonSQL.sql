DROP DATABASE IF EXISTS bamazonDB;

-- create database
CREATE DATABASE bamazonDB;

-- use database
USE bamazonDB;

-- create table called products
CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price INT default 0,
    stock_quantity INT default 0,
    PRIMARY KEY (item_id)
);

-- Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
INSERT INTO products( product_name, department_name, price, stock_quantity)
VALUES  ("ipod", "electronics", 600, 10),
        ("laptop", "electronics", 2500, 10),
        ("headphones", "electronics", 60, 20),
        ("shirt", "clothing", 15, 30),
        ("pants", "clothing", 60, 20),
        ("socks", "clothing", 10, 40),
        ("plates", "home goods", 30, 6),
        ("mugs", "home goods", 10, 12),
        ("glasses", "home goods", 10, 12),
        ("saucers", "home goods", 15, 6);


