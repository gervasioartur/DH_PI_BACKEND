const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const connection = new Sequelize(dbConfig);

//models
const User = require('../app/models/User');
const Cart = require('../app/models/Cart');
const Admin = require('../app/models/Admin');
const Address = require('../app/models/Address');
const Product = require('../app/models/Product');
const Category = require('../app/models/Category');
const Customer = require('../app/models/Customer');
const Operation = require('../app/models/Operation');
const ProductCart = require('../app/models/ProductCart');

User.init(connection);
Cart.init(connection);
Admin.init(connection);
Address.init(connection);
Product.init(connection);
Customer.init(connection);
Category.init(connection);
Operation.init(connection);
ProductCart.init(connection);

User.associatie(connection.models);
Cart.associatie(connection.models);
Admin.associatie(connection.models);
Product.associatie(connection.models);
Customer.associatie(connection.models);
Category.associatie(connection.models);
Operation.associatie(connection.models);

module.exports = connection;
