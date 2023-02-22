import Axios from "axios";
import { parentPort } from "worker_threads";
import { getLowestBiggest } from "./functions/functions";

// plan:
/*
    Excuse the mess....
    I write spaghetti code here because I dont have one API endpoint which gets me the users with their addresses and balances...
    So I resort to a new method, which i might or not use in other workers

    1. When generating users, generate 2, one will be the sender and the other is the receiver.
    2. Send their info down the apis untill i can send notes to the user.
    3. If the sender's notes is too low, then dont send anything.
    4. Repeat.
    5. This app will be testable only when the other worker noted start working too(to increase cashflow in the market).
*/ 
const main = () => {
	// this function, needs to get users who can mine, and make one of them mine... calls the functions.ts

	const getUsers = async () => {
		await Axios.get(`http://localhost:8024/userfindAutoGens`)
			.then(async (res) => {
				if (res.status == 200) {
					let arr: [] = res.data;
					let randomNumber = Math.floor(Math.random() * 40); // assuming we have 40 users in the app
					let randomNumberReciever = Math.floor(Math.random() * 40);

					// following loop is to ensure that i get a new number that is not simmilar to my main number
					// to avoid user sending notes to themslevers.
					while (randomNumberReciever === randomNumber) {
						let randomNumberReciever = Math.floor(
							Math.random() * 40
						);
					}
					let chosenUserId = res.data[randomNumber].id;
					let chosenReceiverId = res.data[randomNumberReciever].id;

					// call api to get the users keys:
					await Axios.get(
						`http://localhost:8024/getKeys/${chosenUserId}`
					)
						.then(async (res) => {
							if (res.status == 200) {
								//console.log(res.data[0]); // becase i received an array with one item.
								let publicAddress = res.data[0].publicKey;
								let privateAddress = res.data[0].privateKey;

								// where the CORE spaghetti code starts:
								await Axios.get(
									`http://localhost:8024/getKeys/${chosenReceiverId}`
								)
									.then(async (res) => {
										let publicAddressReciever =
											res.data[0].publicKey;

										await Axios.get(
											`http://localhost:8033/balance/${publicAddress}`
										)
											.then(async (res) => {
												if (res.status == 200) {
													console.log(res); // becase i received an array with one item.
													console.log(
														res.data.balance
													);
													let usersBalance =
														res.data.balance;

													// now that we have their balance, we proceed, otherwise restart process
													if (usersBalance > 5) {
														// send notes here....
														// we create an object first coz its a post req...
														let calulatedNumberOfNotes =
															(usersBalance *
																20) /
															100; // we send 20%

														let sendNotesObject = {
															fromAddress:
																publicAddress,
															toAddress:
																publicAddressReciever,
															amount: calulatedNumberOfNotes,
															fromAddressPrivateKey:
																privateAddress,
														};
														let snack =
															JSON.stringify(
																sendNotesObject
															);

														Axios.post(
															`http://localhost:8033/transaction`,
															{
																obj: snack,
															}
														)
															.then((res) => {
																// console.log(sendNotesObject);
																if (
																	res.status ==
																	200
																) {
																	console.log(
																		"The transaction is successful"
																	);
																}
															})
															.catch((err) => {
																console.log(
																	err
																);
															});
													}
												}
											})
											.catch((err) => {
												console.log(err);
											});
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
			.catch((err) => {
				console.log(err);
			});
	};
	getUsers();
};

setInterval(() => {
	main();
}, 2000);
