import express, { Application, Request, Response, NextFunction } from "express";
import {main as worker_miner} from './worker_miner';
import {
	generator,
	storeInDatabase,
	Person,
	StoreSudoInDB,
} from "./nameGenerator";

const cors = require("cors");
const bodyParser = require("body-parser");
const app: Application = express();
app.use(express.urlencoded());
app.use(express.json());

let PeopleArray: Person[] = []; // array will store Person's
let GLOBAL_NUMBER_OF_USERS = 40;

// function I run when i want to populate db with fake users:
const generateRandomUsersAndStoreInDatabase = async () => {
	await StoreSudoInDB();
	await generator();
	await storeInDatabase();
};




const main = () =>{
	//
	// worker_miner();
}

main();
// generateRandomUsersAndStoreInDatabase();

export { PeopleArray, GLOBAL_NUMBER_OF_USERS };

