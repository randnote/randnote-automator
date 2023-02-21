import Axios from "axios";
import { parentPort } from "worker_threads";
/* 
    Call the API and get the users(), then call blockchain - for all users determine who has the lowest notes...
    Then take that user and mine with them....
*/

// const {ParentPort} = require('worker_threads')

const func = () => {
	
	parentPort?.postMessage("worker miner done ");
	
};

setInterval(() => {
	func();
}, 1000);
