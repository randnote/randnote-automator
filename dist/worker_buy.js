"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:8024";
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
// setInterval(() => {
// 	// 	main();
// 	// console.log(pricer())
// 	pricer();
// }, 1000);
// pricer();
//# sourceMappingURL=worker_buy.js.map