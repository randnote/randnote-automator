import {
	generator,
	storeInDatabase,
	Person,
	StoreSudoInDB,
} from "./nameGenerator";
import websiteTrader from "./buysell";

import connection from "./databaseConnector";
/*
	DEVELOPER NOTES ON THE AUTOMATOR...
	My plan is to run a particular function multipe times untill 10 seconds is over... 
	- This means that if the funciton running is buyingNotes(), this function should run multipe times over till 10 secs is overm
	  meaning that perhaps 20 users will be buying notes in that timeframe.


	ACTUALLY SCRATCH WHATEVER I WAS ABOUT TO WRITE ,,,, MY NEW SOLUTION IS TO USER WORKER THREADS.
	I realized that the best solution is to have 5 concurrent threads working at the same time.
	1. while loop (true) to keep running 1 function over and over again.
	2. The miner keeps mining and giving randnom users a chance to mine.
	3. Users who qualify will keep selling
	4. Users who qualify will keep donating funds to other users....
*/

// import websiteTrader from "./buysell";
let PeopleArray: Person[] = []; // array will store Person's

const generateRandomUsersAndStoreInDatabase = async () => {
	// await StoreSudoInDB();
	// await generator();
	// await storeInDatabase();
};
//generateRandomUsersAndStoreInDatabase();

const tradeAndMiner = async () => {
	//websiteTrader();
	// I NEED AN AROUND THE CLOCK SOLUTION OF (USERS BUYING NOTES, USERS SELLING NOTES, USERS SENDING EACH OTHER NOTES)
	// I just wrote this solution down, i havent ran and tested it yet
	// while(true){
	// 	await setTimeout(buyingNotes(), 1000*10); // run for 10 secs
	// 	await setTimeout(mining(), 1000) // mine
	// 	await setTimeout(sendingNotes(), 1000*10); // run for 10 sec
	// 	await setTimeout(mining(), 1000) // mine
	// 	await setTimeout(sellingNotes(), 10000 * 10);
	// }
};

tradeAndMiner();

export { PeopleArray };
