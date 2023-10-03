const mysql = require("mysql");
// const dbConfig = require("./db.config");

const connectorObject = {
	HOST: process.env.DB_HOST,
	USER: process.env.DB_USER,
	PASSWORD: process.env.DB_PASSWORD,
	DB: process.env.DB_NAME,
	PORT: process.env.DB_PORT,
};

const connection = mysql.createConnection({
	host: connectorObject.HOST,
	user: connectorObject.USER,
	password: connectorObject.PASSWORD,
	database: connectorObject.DB,
	port: connectorObject.PORT
});

connection.connect((error: Error) => {
	if (error) throw error;
});

export default connection;
