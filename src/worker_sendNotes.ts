import Axios from "axios";
import { parentPort } from "worker_threads";
import { getLowestBiggest } from "./functions/functions";

// plan:
// 1. get autogens, 2. use their ids to get their keys... 3. use keys to determine if user is worth sending notes to another...
//  1. get autogens 2. select randnom gen, get their keys, and check their balance and if balance > ... , then make a sendNotesTransaction 

const main = () => {
	// this function, needs to get users who can mine, and make one of them mine... calls the functions.ts
	let object: any = {};
    let keyedArrayOfObjects : [];
	const getUsers = async () => {
		await Axios.get(`http://localhost:8024/userfindAutoGens`)
			.then(async (res) => {
				if (res.status == 200) {
					let arr :[] = res.data;
                    let randomNumber = Math.floor(Math.random() * 10);
                    let chosenUserId= res.data[randomNumber].id;

                    // call api to get the users keys:
                    await Axios.get(`http://localhost:8024/getKeys/${chosenUserId}`)
                        .then(async (res) => {
                            if (res.status == 200) {
                               console.log(res)

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
