import Axios from "axios";
let users: any = [];
import { BACKEND_API, BLOCKCHAIN_API } from "..";

const getUsers = async () => {
	await Axios.get(`${BACKEND_API}/userfindAutoGens`)
		.then((res) => {
			if (res.status == 200) {
				res.data.forEach((element: any) => {
					users.push(element);
				});
			}
		})
		.catch((err) => {
			console.log(err);
		});

	console.log(users[5]);
};

const getCurrentPrice = async () => {
	const promise = new Promise((resolve: any, reject: any) => {
		Axios.get(`${BACKEND_API}/getCurrentPrice`)
			.then(async (res) => {
				// if (res.status == 200) {
				// 	// console.log(res);
				// 	resolve(res);
				// 	// return res;
				// }
				// console.log(res);
				console.log("works");
				resolve(res);
			})
			.catch((err) => {
				reject(err);
				// console.log(err);
			});
	});
	return promise;
};

// Function to get users with the lowesst balance and highest balance:
const getLowestBiggest = async (arr2: any) => {
	let arr = JSON.parse(arr2); // because we JSONified it
	let smallestUser = arr[0];
	let biggestUser = arr[0];
	for (let i = 0; i < arr.length; i++) {
		if (smallestUser.balance > arr[i].balance) {
			smallestUser = arr[i];
		}
		if (biggestUser.balance < arr[i].balance) {
			biggestUser = arr[i];
		}
	}
	let obj = {
		smallest: smallestUser,
		biggest: biggestUser,
	};
	return obj;
};

/* 
    Value determiner function:
    this function gets the price and determines how many notes you should receive if you want to spend a partucular amount.
*/
const valueDeterminer = () => {
	let value: number = 0;

	return value;
};

export { getUsers, getLowestBiggest, getCurrentPrice };
