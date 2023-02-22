import Axios from "axios";
import { parentPort } from "worker_threads";
import { getLowestBiggest } from "./functions/functions";

// plan:
// 1. get autogens, 2. use their ids to get their keys... 3. use keys to determine if user is worth sending notes to another...
//  1. get autogens 2. select randnom gen, get their keys, and check their balance and if balance > ... , then make a sendNotesTransaction

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
                    while(randomNumberReciever === randomNumber){
                        let randomNumberReciever = Math.floor(Math.random() * 40);
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
                                    let publicAddressReciever = res.data[0].publicKey;

                                    await Axios.get(
                                    `http://localhost:8033/balance/${publicAddress}`
                                    )
                                    .then(async (res) => {
                                        if (res.status == 200) {
                                            console.log(res); // becase i received an array with one item.
                                            console.log(res.data.balance)
                                            let usersBalance = res.data.balance;

                                            // now that we have their balance, we proceed, otherwise restart process
                                            if(usersBalance > 5){ 
                                                // send notes here....
                                                // we create an object first coz its a post req...
                                                let calulatedNumberOfNotes = usersBalance*20/100; // we send 20%

                                                let sendNotesObject = {
                                                    fromAddress: publicAddress,
                                                    toAddress: publicAddressReciever,
                                                    amount: calulatedNumberOfNotes,
                                                    fromAddressPrivateKey: privateAddress,
                                                };
                                                let snack = JSON.stringify(sendNotesObject);
                        
                                                Axios.post(`http://localhost:8033/transaction`, {
                                                    obj: snack,
                                                })
                                                    .then((res) => {
                                                        // console.log(sendNotesObject);
                                                        if (res.status == 200) {
                                                            console.log(
                                                                "The transaction is successful"
                                                            );
                                                            
                                                        }
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
