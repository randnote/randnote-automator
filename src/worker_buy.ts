import Axios from "axios";
import { parentPort } from "worker_threads";
import { GLOBAL_NUMBER_OF_USERS } from ".";

import { getCurrentPrice } from "./functions/functions";
const ENDPOINT = "http://127.0.0.1:8024";

const main = () => {
	const getUsers = async () => {
		await Axios.get(`http://localhost:8024/userfindAutoGens`)
			.then(async (res) => {
				if (res.status == 200) {
					let randomNumber = Math.floor(
						Math.random() * GLOBAL_NUMBER_OF_USERS
					);
					let chosenUserId = res.data[randomNumber].id;
					let chosenUserBalance = res.data[randomNumber].balance;

					console.log("randomly found the userID: " + chosenUserId);

					let GeneratedNotes = 0;
					let GeneratedPrice: any = 0;

					if (chosenUserBalance > 100) {
						// console.log("wer are at chosen balalnce")
						chosenUserBalance = (chosenUserBalance * 30) / 100;
						// console.log(await getCurrentPrice());

						Axios.get(`http://localhost:8024/getCurrentPrice`)
							.then(async (res) => {
								console.log("works");
								console.log(
									"within the geCurrentPrice function"
								);
								GeneratedPrice = res;
								GeneratedNotes =
									chosenUserBalance /
									GeneratedPrice.data.data;
								console.log(
									"price is : " + GeneratedPrice.data.data
								);
								// call api here....
								let orderObject = {
									user_id: chosenUserId,
									price: GeneratedPrice.data.data,
									ordertype: "buy",
									amount: chosenUserBalance,
									notes: GeneratedNotes,
								};
								let snack = JSON.stringify(orderObject);
									Axios.post(
										`http://localhost:8024/transactionWebsite`,
										orderObject
									)
										.then((res) => {
											console.log("Transaction made");
											console.log(res.data);
										})
										.catch((err) => {
											console.log(err);
										});
								}).catch((err) => {
								console.log(err);
							});
					} // end if
				} // end if
			})
			.catch((error) => {
				console.log(error);
			});
		}
	// getUsers();
	
};

export { main };
