/* 
    Use the users array and get the user with the lowest balance, then deposit into their account, simple

    To deposit, the user needs to have a card... - When creating these users, also create a card for them...
    -Then write a route in the backend that returns a users card
*/
import Axios from "axios";
import { parentPort } from "worker_threads";

const func = () => {
	parentPort?.postMessage("depositor worker done");
};

setInterval(() => {
	func();
}, 1000);
