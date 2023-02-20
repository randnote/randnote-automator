// // users buy and sell /trade with the website:
// import Axios from "axios";
// let users: any = [];
// const websiteTrader = async () => {
// 	await Axios.get(`http://localhost:8024/userfindAutoGens`)
// 		.then((res) => {
// 			if (res.status == 200) {
// 				res.data.forEach((element: any) => {
// 					users.push(element);
// 				});
// 			}
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// 	// console.log(users.length);
// 	console.log(users[5]);
// };
// // funciton to get users with the lowesst balance and highest balance:
// const getLowestBiggest = () => {
// 	let smallestUser = users[0];
// 	let biggestUser = users[0];
// 	for (let i = 0; i < users.length; i++) {
// 		if (smallestUser.balance > users[i].balance) {
// 			smallestUser = users[i];
// 		}
// 		if (biggestUser.balance < users[i].balance) {
// 			biggestUser = users[i];
// 		}
// 	}
// 	let obj = {
// 		smallest: smallestUser,
// 		biggest: biggestUser,
// 	};
// 	return obj;
// };
// // value determiner function:
// // this function gets the price and determines how many notes you should receive if you want to spend a partucular amount.
// const valueDeterminer = () => {
// 	let value: number = 0;
// 	return value;
// };
// const myLoop = () => {
// 	let i = 11;
// 	setTimeout(() => {
// 		console.log(getLowestBiggest()); // shows the lowest and hights user
// 		// make the highest user buy notes:
// 		let biggestUser = getLowestBiggest["biggest"];
// 		let orderObject = {
// 			user_id: biggestUser.id,
// 			price: 0, // we need to call api and request the price....
// 			amount: Math.floor(Math.random() * biggestUser.balance) + 1, // any number betwenn 10 and their balance
// 			ordertype: "buy",
// 			notes: 0, // we also need to call some sort of API and figure out how many notes they should get....
// 		};
// 		// Axios.post(`http://localhost:8024/transactionWebsite`, orderObject)
// 		// 	.then((res) => {
// 		// 		console.log("Transaction made");
// 		// 		// handleCloseNotes();
// 		// 		// handleClose();
// 		// 	})
// 		// 	.catch((err) => {
// 		// 		console.log(err);
// 		// 	});
// 		if (i > 10) {
// 			myLoop();
// 		}
// 	}, 1000);
// };
// myLoop();
// export default websiteTrader;
// // LONG STORY SHORT, I NEED TO WRITE A FUNCITON IN THE BACKEND - SAME THING I DID IN THE FRONTED, WHICH WILL GET ME THE PRICE AND DETERMINE HOW
// // MUCH I SHOULD PAY PER NOTE , PER HOW MANY NOTES
//# sourceMappingURL=buysell.js.map