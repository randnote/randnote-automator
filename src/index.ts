import {
	generator,
	storeInDatabase,
	Person,
	StoreSudoInDB,
} from "./nameGenerator";
import connection from "./databaseConnector";
import express, { Application, Request, Response, NextFunction } from "express";
const cors = require("cors");
const bodyParser = require("body-parser");
const app: Application = express();
app.use(express.urlencoded());
app.use(express.json());



import { Worker } from "worker_threads";
let PeopleArray: Person[] = []; // array will store Person's
let GLOBAL_NUMBER_OF_USERS = 40;

const generateRandomUsersAndStoreInDatabase = async () => {
	await StoreSudoInDB();
	await generator();
	await storeInDatabase();
};


// instatiate the worker nodes:
const minerWorker = new Worker("./worker_miner.js");
const sendNotesWorker = new Worker("./worker_sendNotes.js");
const buyWorker = new Worker("./worker_buy.js");
const sellWorker = new Worker("./worker_sell.js");
const worker2 = new Worker("./depositor.js");

const tradeAndMiner = async () => {
	// successes
	// minerWorker.on("message", (data) => {
	// 	// console.log(JSON.stringify(data));
	// 	console.log(data);
	// });
	// sendNotesWorker.on("message", (data) => {
	// 	// console.log(JSON.stringify(data));
	// 	console.log(data);
	// });
	buyWorker.on("message", (data) => {
		// console.log(JSON.stringify(data));
		console.log(data);
	});
	// worker2.on("message", (data) => {
	// 	console.log("worker 2 :" + data);
	// });

	//errors
	// minerWorker.on("error", (error) => {
	// 	console.log(error);
	// });
	// sendNotesWorker.on("error", (error) => {
	// 	console.log(error);
	// });
	buyWorker.on("error", (error) => {
		console.log(error);
	});
	// worker2.on("error", (error) => {
	// 	console.log(error);
	// });
};

tradeAndMiner();
// generateRandomUsersAndStoreInDatabase();

export { PeopleArray, GLOBAL_NUMBER_OF_USERS };



var allowedOrigins = ["http://localhost:3000", "http://locahost:3000/admin"];
app.use(
	cors({
		origin: function (origin: any, callback: any) {
			// allow requests with no origin
			// (like mobile apps or curl requests)
			if (!origin) {
				return callback(null, true);
			}

			if (allowedOrigins.indexOf(origin) === -1) {
				var msg =
					"The CORS policy for this site does not " +
					"allow access from the specified Origin.";
				// return callback(new Error(msg), false);
				return callback(null, true); // allow all of em
			}
			return callback(null, true);
		},
	})
);

// require("./routes/index")(app);
app.listen(8011, () => console.log(`server started on port 8011`));

