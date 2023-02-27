import express, { Application, Request, Response, NextFunction } from "express";
import { main as worker_miner } from "./worker_miner";
import { main as worker_buyer } from "./worker_buy";
import { main as worker_sell } from "./worker_sell";
import {
	generator,
	storeInDatabase,
	Person,
	StoreSudoInDB,
} from "./nameGenerator";
import { getCurrentPrice } from "./functions/functions";

let PeopleArray: Person[] = []; // array will store Person's
let GLOBAL_NUMBER_OF_USERS = 40;

// function I run when i want to populate db with fake users:
const generateRandomUsersAndStoreInDatabase = async () => {
	await StoreSudoInDB();
	await generator();
	await storeInDatabase();
};

const main = () => {
	let l: boolean = true;
	// setInterval(async () => {
		
	// 	if (l == true) {
	// 		await worker_buyer();
	// 		l = false;
	// 	} else {
	// 		await worker_sell();
	// 		l = true;
	// 	}
	// }, 3000);
	//  worker_buyer();
// 
	 setInterval(async()=>{
		await worker_buyer();
	 }, 3000)
};

main();
// generateRandomUsersAndStoreInDatabase();

export { PeopleArray, GLOBAL_NUMBER_OF_USERS };
