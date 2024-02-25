const mysql = require("mysql2/promise");
const { logger } = require("./winston");

const pool = mysql.createPool({
  host: "gdsc.cizaocjakvvv.ap-northeast-2.rds.amazonaws.com",
  user: "root",
  port: "3306",
  password: "",
  database: "erd",
});

module.exports = {
  pool: pool,
};
