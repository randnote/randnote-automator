import Axios from "axios";
import { parentPort } from "worker_threads";
import { GLOBAL_NUMBER_OF_USERS } from ".";

import { getCurrentPrice } from "./functions/functions";

const main = () => {
	console.log("def");
	const getUsers = async () => {
		console.log("arrived");
		await Axios.get(`http://localhost:8024/userfindAutoGens`)
			.then(async (res) => {
				if (res.status == 200) {
					let randomNumber = await Math.floor(
						Math.random() * GLOBAL_NUMBER_OF_USERS
					);
					let chosenUserId = res.data[randomNumber].id;
					let chosenUserBalance = res.data[randomNumber].balance;

					let GeneratedNotes = 0;
					let GeneratedPrice: any = await getCurrentPrice();
					// console.log(GeneratedPrice)
					// console.log("arrived 2")
					// call api to get the users keys:
					await Axios.get(
						`http://localhost:8024/getKeys/${chosenUserId}`
					)
						.then(async (res) => {
							if (res.status == 200) {
								let publicAddress = res.data[0].publicKey;
								console.log('we got the keys: 0'+res.data +'. ');
								await Axios.get(
									`http://localhost:8033/balance/${publicAddress}`
								)
									.then(async (res) => {
										if (res.status == 200) {
											console.log('we got the balance')
											let userNotesBalance =
												res.data.balance;
											// console.log("arrived 3")
											// call api here....
											let orderObject = {
												user_id: chosenUserId,
												price: GeneratedPrice.data.data,
												ordertype: "sell",
												amount: chosenUserBalance,
												notes: GeneratedNotes,
											};
											// console.log(orderObject)
											// console.log("has balance of : "+userNotesBalance)
											if (userNotesBalance > 5) {
												Axios.post(
													`http://localhost:8024/transactionWebsite`,
													orderObject
												)
													.then((res) => {
														console.log(
															"Transaction made"
														);
														console.log(res);
													})
													.catch((err) => {
														console.log(err);
													});
											}
										}
									})
									.catch((err) => {
										console.log(err);
									});
							}
						})
						.catch((err) => {
							console.log(err);
						});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	getUsers();
};

export { main };
