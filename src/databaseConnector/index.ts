const mysql = require("mysql");
// const dbConfig = require("./db.config");

const connectorObject = {
	HOST: "localhost",
	USER: "root",
	PASSWORD: "5308danielromeo",
	DB: "randnotex",
};

const connection = mysql.createConnection({
	host: connectorObject.HOST,
	user: connectorObject.USER,
	password: connectorObject.PASSWORD,
	database: connectorObject.DB,
});

connection.connect((error: Error) => {
	if (error) throw error;
});

export default connection;
