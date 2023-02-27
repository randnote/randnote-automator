import Axios from "axios";
import { parentPort } from "worker_threads";
import { GLOBAL_NUMBER_OF_USERS } from ".";

import { getCurrentPrice } from "./functions/functions";

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

					console.log(chosenUserId);

					let GeneratedNotes = 0;
					let GeneratedPrice: any = 0;

                    // call api to get the users keys:
					await Axios.get(
						`http://localhost:8024/getKeys/${chosenUserId}`
					)
                    .then(async (res) => {
                        if (res.status == 200) {
                           
                            let publicAddress = res.data[0].publicKey;
                            let privateAddress = res.data[0].privateKey;

                            await Axios.get(
                            `http://localhost:8033/balance/${publicAddress}`
                                )
                                .then(async (res) => {
                                    if (res.status == 200) {

                                        let usersBalance =
                                            res.data.balance;

                                        // now that we have their balance, we proceed, otherwise restart process
                                        if (usersBalance > 5) {
                                        }
                                    }
                                })
                                .catch((err)=>{
                                    console.log(err)
                                })
                            }
                    })
                    .catch((err)=>{
                        console.log(err)
                    })

                    //

					/*if (chosenUserBalance > 1000) {
						getCurrentPrice().then((res: number) => {
							GeneratedPrice = res;
							GeneratedNotes =
								chosenUserBalance / GeneratedPrice.data.data;

							// call api here....
							let orderObject = {
								user_id: chosenUserId,
								price: GeneratedPrice.data.data,
								ordertype: "buy",
								amount: chosenUserBalance,
								notes: GeneratedNotes,
							};

							Axios.post(
								`http://localhost:8024/transactionWebsite`,
								orderObject
							)
								.then((res) => {
									console.log("Transaction made");
									console.log(res);
								})
								.catch((err) => {
									console.log(err);
								});
						});
					}*/
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	getUsers();
};

export { main };
