require('dotenv').config();


const { NODE_ENV,DB_PASSWORD, HOST } = process.env;

['NODE_ENV'].forEach((key) => {
  if (process.env[key] === undefined) throw new Error(`${key} is required`);
});
module.exports = { NODE_ENV,DB_PASSWORD, HOST };
