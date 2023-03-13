import Axios from "axios";
const SHA256 = require("crypto-js/sha256");
import { GLOBAL_NUMBER_OF_USERS } from ".";
import { BACKEND_API, BLOCKCHAIN_API} from ".";

// PLAN: JUST get random users, select 1, and just mine with that one user.

let users: any = [];

const calculateHash = (
	timestamp: any,
	previousHash: any,
	transactions: any,
	nonce: any
) => {
	return SHA256(
		timestamp + previousHash + JSON.stringify(transactions) + nonce
	).toString();
};

const mineBlock = async (publicAddress: any) => {
	// first get the block:
	Axios.get(`${BLOCKCHAIN_API}/mine/${publicAddress}/0`).then(
		async (response: any) => {
			console.log(response.status);
			if (response.status === 204) {
				console.log(
					"There arent transactions to mine! Give it time & try again next time!"
				);
				process.exit(1);
			}
			let block = await response.data.block;
			// prepare the difficulty and everything:
			let difficulty: any = 2;
			console.log(block);
			console.log("---");

			let hash = await calculateHash(
				block.timestamp,
				block.previousHash,
				block.transactions,
				block.nonce
			);
			// console.log("Mining...");
			while (
				hash.substring(0, difficulty) != Array(difficulty + 1).join("0")
			) {
				block["nonce"]++;
				hash = calculateHash(
					block.timestamp,
					block.previousHash,
					block.transactions,
					block.nonce
				);
			}
			console.log("BLOCK MINED: " + block["hash"]); // just displays the hash string
			// now send to the server:
			Axios.get(
				`${BLOCKCHAIN_API}/mine/${publicAddress}/${hash}`
			).then((response: any) => {
				console.log(response.data);
			});
		}
	);
};

const main = () => {
	// this function, needs to get users who can mine, and make one of them mine... calls the functions.ts
	let object: any = {};
	const getUsers = async () => {
		await Axios.get(`${BACKEND_API}/userfindAutoGens`)
			.then(async (res) => {
				if (res.status == 200) {
					let randomNumber = Math.floor(
						Math.random() * GLOBAL_NUMBER_OF_USERS
					);
					let chosenUserId = res.data[randomNumber].id;
					let chosenUserBalance = res.data[randomNumber].balance;
					console.log(chosenUserId);

					// call api to get the users keys:
					await Axios.get(
						`${BACKEND_API}/getKeys/${chosenUserId}`
					)
						.then(async (res) => {
							if (res.status == 200) {
								let publicAddress = res.data[0].publicKey;
								mineBlock(publicAddress);
								return;
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

export { main };
