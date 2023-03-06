import express, { Application, Request, Response, NextFunction } from "express";
import { main as worker_miner } from "./worker_miner";
import { main as worker_buyer } from "./worker_buy";
import { main as worker_sell } from "./worker_sell";
import {main as worker_sendNotes} from "./worker_sendNotes";
import {
	generator,
	storeInDatabase,
	Person,
	StoreSudoInDB,
} from "./nameGenerator";
import { getCurrentPrice } from "./functions/functions";

let PeopleArray: Person[] = []; // array will store Person's
let GLOBAL_NUMBER_OF_USERS = 49;

// function I run when i want to populate db with fake users:
const generateRandomUsersAndStoreInDatabase = async () => {
	await StoreSudoInDB();
	await generator();
	await storeInDatabase();
};

const main = () => {
	let l: boolean = true;

	let count: number = 0;
	setInterval(async () => {
		count++;
		await worker_buyer();
		await worker_sell();
		if (count === 10) {
			await worker_miner();
			await worker_sendNotes();
			count = 0;
		}
	}, 2000);
};

main();
// generateRandomUsersAndStoreInDatabase();

export { PeopleArray, GLOBAL_NUMBER_OF_USERS };
