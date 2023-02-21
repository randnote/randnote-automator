import {
	generator,
	storeInDatabase,
	Person,
	StoreSudoInDB,
} from "./nameGenerator";
import websiteTrader from "./worker_buy";
import connection from "./databaseConnector";
import { Worker } from "worker_threads";
let PeopleArray: Person[] = []; // array will store Person's

const generateRandomUsersAndStoreInDatabase = async () => {
	// await StoreSudoInDB();
	// await generator();
	// await storeInDatabase();
};
//generateRandomUsersAndStoreInDatabase();

const worker = new Worker('./miner.js')
const worker2 = new Worker('./depositor.js')
// setTimeout(()=>{
// 	console.log("print")
// }), 3000;

// setInterval(()=>{
// 	console.log("gang")
// }, 1000);

const tradeAndMiner = async () => {

	
	
		worker.on('message',(data)=>{
			console.log('the data is   :'+ data)
		})
		worker2.on('message',(data)=>{
			console.log('worker 2 :'+ data)
		})
		worker.on('error', (error) =>{
			console.log(error)
		})
		worker2.on('error', (error) =>{
			console.log(error)
		})

	


};

tradeAndMiner();

// setInterval(tradeAndMiner, 1000)

export { PeopleArray };
