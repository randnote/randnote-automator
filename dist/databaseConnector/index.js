"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
// const dbConfig = require("./db.config");
var connectorObject = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "5308danielromeo",
    DB: "randnotex",
};
var connection = mysql.createConnection({
    host: connectorObject.HOST,
    user: connectorObject.USER,
    password: connectorObject.PASSWORD,
    database: connectorObject.DB,
});
connection.connect(function (error) {
    if (error)
        throw error;
});
exports.default = connection;
//# sourceMappingURL=index.js.map