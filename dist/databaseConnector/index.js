"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
// const dbConfig = require("./db.config");
var connectorObject = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    PORT: process.env.DB_PORT,
};
var connection = mysql.createConnection({
    host: connectorObject.HOST,
    user: connectorObject.USER,
    password: connectorObject.PASSWORD,
    database: connectorObject.DB,
    port: connectorObject.PORT
});
connection.connect(function (error) {
    if (error)
        throw error;
});
exports.default = connection;
//# sourceMappingURL=index.js.map