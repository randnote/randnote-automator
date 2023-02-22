"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var ENDPOINT = "http://127.0.0.1:8024";
/*
    BUYER PLANNER:
    1. GENERATE/CALL ALL users, then just check balance, and buy.
*/
var pricer = function () {
    //console.log('pricer works')
    var socket = (0, socket_io_client_1.default)(ENDPOINT);
    socket.on("FromAPI", function (data) {
        // console.log(data.price);
        console.log(data);
    });
    socket.on('connect_failed', function () {
        console.log("Sorry, there seems to be an issue with the connection!");
    });
};
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
setInterval(function () {
    // 	main();
    // console.log(pricer())
    pricer();
}, 1000);
//# sourceMappingURL=worker_buy.js.map