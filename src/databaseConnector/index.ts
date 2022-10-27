const mysql = require("mysql");
// const dbConfig = require("./db.config");

const connectorObject = {
	HOST: "localhost",
	USER: "root",
	PASSWORD: "",
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
