import Axios from "axios";
const SHA256 = require("crypto-js/sha256");

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

const mineBlock = async (publicAddress: any, privateAddress: any) => {
	// first get the block:
	Axios.get(`http://localhost:8033/mine/${publicAddress}/0`).then(
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
			console.log("Mining...");
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
				`http://localhost:8033/mine/${publicAddress}/${hash}`
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
		await Axios.get(`http://localhost:8024/userfindAutoGens`)
			.then(async (res) => {
				if (res.status == 200) {
					// BEFORE SENDING OFF TO MAIN THREAD, I NEED TO MAKE USER WITH LOWEST-> MINE!!!!
					// let obj: any = await getLowestBiggest(
					// 	JSON.stringify(res.data)
					// );
					// parentPort?.postMessage(obj);
					// call axios to get the users keys.... using his email
					//await mineBlock("sdf", "sdf"); // i need to stash this with the public and private keys....
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	getUsers();
};

export { main };
