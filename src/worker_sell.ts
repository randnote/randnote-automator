import Axios from "axios";
import { parentPort } from "worker_threads";
import { GLOBAL_NUMBER_OF_USERS } from ".";
import { BACKEND_API, BLOCKCHAIN_API } from ".";

import { getCurrentPrice } from "./functions/functions";

const main = () => {
	console.log("def");
	const getUsers = async () => {
		console.log("arrived");
		await Axios.get(`${BACKEND_API}/userfindAutoGens`)
			.then(async (res) => {
				if (res.status == 200) {
					let randomNumber = await Math.floor(
						Math.random() * GLOBAL_NUMBER_OF_USERS
					);
					let chosenUserId = res.data[randomNumber].id;
					let chosenUserBalance: any = res.data[randomNumber].balance;
					// let GeneratedPrice: any = await getCurrentPrice();

					let GeneratedNotes = 0;
					let GeneratedPrice: any = 0;

					await getCurrentPrice().then(async (res: number) => {
						GeneratedPrice = res;
						GeneratedNotes =
							chosenUserBalance / GeneratedPrice.data.data;

						// call api to get the users keys:
						await Axios.get(
							`${BACKEND_API}/getKeys/${chosenUserId}`
						)
							.then(async (res) => {
								if (res.status == 200) {
									let publicAddress = res.data[0].publicKey;
									// console.log(
									// 	"we got the keys: 0" + res.data + ". "
									// );
									await Axios.get(
										`${BLOCKCHAIN_API}/balance/${publicAddress}`
									)
										.then(async (res) => {
											if (res.status == 200) {
												// console.log("we got the balance");
												let userNotesBalance =
													res.data.balance;
												// console.log("arrived 3")
												// call api here....
												let orderObject = {
													user_id: chosenUserId,
													price: GeneratedPrice.data
														.data,
													ordertype: "sell",
													amount: chosenUserBalance,
													notes: GeneratedNotes,
												};
												console.log(orderObject);
												// console.log(orderObject)
												// console.log("has balance of : "+userNotesBalance)
												if (userNotesBalance > 5) {
													Axios.post(
														`${BACKEND_API}/transactionWebsite`,
														orderObject
													)
														.then((res) => {
															console.log(
																"Transaction made"
															);
															// console.log(res);
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
					});
				} // end of if(status == 200)
			})
			.catch((error) => {
				console.log(error);
			});
	};
	getUsers();
};

export { main };
