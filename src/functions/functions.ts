import Axios from "axios";
import { parentPort } from "worker_threads";
let users: any = [];

const getUsers = async () => {
	await Axios.get(`http://localhost:8024/userfindAutoGens`)
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
		Axios.get(`http://localhost:8024/getCurrentPrice`)
			.then(async (res) => {
				// if (res.status == 200) {
				// 	// console.log(res);
				// 	resolve(res);
				// 	// return res;
				// }
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

const myLoop = () => {
	let i = 11;
	setTimeout(() => {
		// console.log(getLowestBiggest()); // shows the lowest and hights user

		// make the highest user buy notes:
		let biggestUser = getLowestBiggest["biggest"];

		let orderObject = {
			user_id: biggestUser.id,
			price: 0, // we need to call api and request the price....
			amount: Math.floor(Math.random() * biggestUser.balance) + 1, // any number betwenn 10 and their balance
			ordertype: "buy",
			notes: 0, // we also need to call some sort of API and figure out how many notes they should get....
		};
		// Axios.post(`http://localhost:8024/transactionWebsite`, orderObject)
		// 	.then((res) => {
		// 		console.log("Transaction made");
		// 		// handleCloseNotes();
		// 		// handleClose();
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});

		if (i > 10) {
			myLoop();
		}
	}, 1000);
};

// myLoop();

// write get currentPrice() here:

export { getUsers, getLowestBiggest, getCurrentPrice };
