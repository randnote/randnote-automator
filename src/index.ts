import {
	generator,
	storeInDatabase,
	Person,
	StoreSudoInDB,
} from "./nameGenerator";
import connection from "./databaseConnector";
import { Worker } from "worker_threads";
let PeopleArray: Person[] = []; // array will store Person's

const generateRandomUsersAndStoreInDatabase = async () => {
	await StoreSudoInDB();
	await generator();
	await storeInDatabase();
};

// instatiate the worker nodes:
const minerWorker = new Worker("./worker_miner.js");
const sendNotesWorker = new Worker("./worker_sendNotes.js");
const buyWorker = new Worker("./worker_miner.js");
const sellWorker = new Worker("./worker_sell.js");
const worker2 = new Worker("./depositor.js");

const tradeAndMiner = async () => {
	minerWorker.on("message", (data) => {
		// console.log(JSON.stringify(data));
		console.log(data);
	});
	sendNotesWorker.on("message", (data) => {
		// console.log(JSON.stringify(data));
		console.log(data);
	});
	// worker2.on("message", (data) => {
	// 	console.log("worker 2 :" + data);
	// });
	minerWorker.on("error", (error) => {
		console.log(error);
	});
	sendNotesWorker.on("error", (error) => {
		console.log(error);
	});
	// worker2.on("error", (error) => {
	// 	console.log(error);
	// });
};

tradeAndMiner();
// generateRandomUsersAndStoreInDatabase();

export { PeopleArray };
