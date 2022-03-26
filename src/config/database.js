// require('dotenv/config');
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
const host = process.env.HOST_DB;
const port = process.env.PORT_DB;
const user = process.env.USER_DB;
const database = process.env.NAME_DB;
const dialect = process.env.DIALECT_DB;
const password = process.env.PASSWORD_BD;

module.exports = {
  host: host,
  username: user,
  password: password,
  database: database,
  dialect: dialect,
  operationAlias: false,
  logging: false,
  define: {
    timestamps: true,
    underscored: false,
  },
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false, // This line will fix new error
    },
  },
};
