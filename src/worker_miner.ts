import Axios from "axios";
import { parentPort } from "worker_threads";
import { getLowestBiggest } from "./functions/functions";
let users: any = [];

/* 
    Call the API and get the users(), then call blockchain - for all users determine who has the lowest notes...
    Then take that user and mine with them....
*/

const main = () => {
	// this function, needs to get users who can mine, and make one of them mine... calls the functions.ts
	let object: any = {};
	const getUsers = async () => {
		await Axios.get(`http://localhost:8024/userfindAutoGens`)
			.then(async (res) => {
				if (res.status == 200) {
					let obj: any = await getLowestBiggest(
						JSON.stringify(res.data)
					);
					parentPort?.postMessage(obj);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	getUsers();
};

setInterval(() => {
	main();
}, 1000);
