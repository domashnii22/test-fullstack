CREATE TABLE Product (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_price NUMERIC(10, 2) NOT NULL,
    product_acceptance_date DATE NOT NULL,
    category_id INTEGER REFERENCES Categories(category_id)
)

CREATE TABLE Categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

INSERT INTO Categories (category_name) VALUES
('Electronics'),
('Clothing'),
('Books'),
('Shoes'),
('Food');

INSERT INTO Products (product_name, product_price, product_acceptance_date, category_id) VALUES
('Smartphone', 500.00, '2024-04-01', 1),
('T-shirt', 20.00, '2024-04-02', 2),
('Novel', 15.00, '2024-04-03', 3),
('Loafers', 25.00, '2024-04-04', 4),
('Coffee beans', 12.00, '2024-04-05', 5);

INSERT INTO Products (product_name, product_price, product_acceptance_date, category_id) VALUES
('Laptop', 1000.00, '2024-05-05', 1),
('Jeans', 50.00, '2024-05-06', 2),
('Cookbook', 25.00, '2024-05-07', 3),
('Sneakers', 15.00, '2024-05-08', 4),
('Tea', 10.00, '2024-05-09', 5);
