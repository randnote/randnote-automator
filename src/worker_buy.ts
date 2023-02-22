import Axios from "axios";
import { parentPort } from "worker_threads";
import { GLOBAL_NUMBER_OF_USERS } from ".";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8024";

/* 
    BUYER PLANNER:
    1. GENERATE/CALL ALL users, then just check balance, and buy.
*/

const pricer = () =>{
    //console.log('pricer works')
    const socket = socketIOClient(ENDPOINT);
		socket.on("FromAPI", (data) => {
            // console.log(data.price);
            console.log(data)
        })
        // socket.on('connect_failed', function() {
        //     console.log("Sorry, there seems to be an issue with the connection!");
        //  })
}

// const main = () => {
//     const getUsers = async () => {
// 		await Axios.get(`http://localhost:8024/userfindAutoGens`)
// 			.then(async (res) => {
// 				if (res.status == 200) {
// 					let randomNumber = Math.floor(Math.random() * GLOBAL_NUMBER_OF_USERS); 
//                     let chosenUserId = res.data[randomNumber].id;
//                     let chosenUserBalance = res.data[randomNumber].balance;
                   

//                     if(chosenUserBalance > 1000){

//                         let GeneratedPrice = 0; // i need to call api to get the price in real time....
//                         let GeneratedAmount = 0;
//                         let GeneratedNotes = 0;

//                         // call api here....

//                         // let orderObject = {
//                         //     user_id: chosenUserId,
//                         //     price: GeneratedPrice, //
//                         //     ordertype: "buy",
//                         //     amount: GeneratedAmount,
//                         //     notes: GeneratedNotes,
//                         // };

//                         // Axios.post(`http://localhost:8024/transactionWebsite`, orderObject)
//                         //     .then((res) => {
//                         //         console.log("Transaction made");
//                         //         // handleCloseNotes();
//                         //         // handleClose();
//                         //     })
//                         //     .catch((err) => {
//                         //         console.log(err);
//                         //     });
//                     }


//                 }
//             })
//             .catch(error =>{
//                 console.log(error);
//             })
// 	};
// 	getUsers();

// }


 setInterval(() => {
// 	main();
// console.log(pricer())
    pricer();
}, 1000);
