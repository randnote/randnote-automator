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

					// console.log(chosenUserId);

					let GeneratedNotes = 0;
					let GeneratedPrice: any = 0;

					if (chosenUserBalance > 1000) {
						chosenUserBalance = (chosenUserBalance * 60) / 100;

						await getCurrentPrice().then((res: number) => {
							console.log(res);
							GeneratedPrice = res;
							GeneratedNotes =
								chosenUserBalance / GeneratedPrice.data.data;
							// console.log('price is : '+GeneratedPrice.data.data)
							// call api here....
							let orderObject = {
								user_id: chosenUserId,
								price: GeneratedPrice.data.data,
								ordertype: "buy",
								amount: chosenUserBalance,
								notes: GeneratedNotes,
							};
							// let snack = JSON.stringify(orderObject);

							Axios.post(
								`http://localhost:8024/transactionWebsite`,
								orderObject
							)
								.then((res) => {
									console.log("Transaction made");
									console.log(res.data); // leave this log... it aint a crazy one
								})
								.catch((err) => {
									console.log(err);
								});
						});
					}
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	getUsers();
};

export { main };
