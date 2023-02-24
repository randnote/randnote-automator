import Axios from "axios";
import { parentPort } from "worker_threads";
import { GLOBAL_NUMBER_OF_USERS } from ".";

import socketIOClient from "socket.io-client";
import { getCurrentPrice } from "./functions/functions";
const ENDPOINT = "http://127.0.0.1:8024";

const main = () => {
    const getUsers = async () => {
		await Axios.get(`http://localhost:8024/userfindAutoGens`)
			.then(async (res) => {
				if (res.status == 200) {
					let randomNumber = Math.floor(Math.random() * GLOBAL_NUMBER_OF_USERS);
                    let chosenUserId = res.data[randomNumber].id;
                    let chosenUserBalance = res.data[randomNumber].balance;

                    let GeneratedNotes = 0;
                    let GeneratedPrice = 0;

                    if(chosenUserBalance > 1000){
                        getCurrentPrice().then((res:number) =>{
                            GeneratedPrice = res;
                            GeneratedNotes = GeneratedPrice * chosenUserBalance;

                            // call api here....
                            let orderObject = {
                                user_id: chosenUserId,
                                price: GeneratedPrice, 
                                ordertype: "buy",
                                amount: chosenUserBalance,
                                notes: GeneratedNotes,
                            };

                            Axios.post(`http://localhost:8024/transactionWebsite`, orderObject)
                                .then((res) => {
                                    console.log("Transaction made");
                                    console.log(res)
                                    // handleCloseNotes();
                                    // handleClose();
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }); 

                    }

                }
            })
            .catch(error =>{
                console.log(error);
            })
	};
	getUsers();

}

export {main};
