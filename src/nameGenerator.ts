/* generates names and thier public and private keys */
import chance from "chance";
import Elliptic from "elliptic";
import connection from "./databaseConnector";
import { PeopleArray } from ".";
const EC = Elliptic.ec;
const ec = new EC("secp256k1");

interface Person {
	firstname: string;
	lastname: string;
	password: string;
	email: string;
	verifiedemail: number;
	publicKey: number;
	privateKey: number;
}

const generator = async () => {
	for (let i = 0; i < 2; i++) {
		const key = ec.genKeyPair();
		const publicKey = await key.getPublic("hex");
		const privateKey = await key.getPrivate("hex");

		let firstname = chance().first();
		let lastname = chance().last();

		let myObject: Person = {
			firstname: firstname,
			lastname: lastname,
			password: "password",
			email: `${firstname}${lastname}@randnotex.co.za`,
			verifiedemail: 1,
			publicKey: publicKey,
			privateKey: privateKey,
		};

		// now we add in the people array:
		PeopleArray.push(myObject);

		// console.log(PeopleArray);
	}
};

const storeInDatabase = async () => {
	for (let i = 0; i < PeopleArray.length; i++) {
		let firstname = PeopleArray[i].firstname;
		let lastname = PeopleArray[i].lastname;
		let email = PeopleArray[i].email;
		let password = PeopleArray[i].password;
		let verifiedemail = PeopleArray[i].verifiedemail;
		let balance = 0.0;

		let publicKey = PeopleArray[i].publicKey;
		let privateKey = PeopleArray[i].privateKey;

		let userobject = {
			firstname: firstname,
			lastname: lastname,
			email: email,
			password: password,
			verifiedemail: verifiedemail,
			balance: balance,
		};

		await connection.query(
			"INSERT INTO users SET ?",
			userobject,
			async (err: Error, res: any) => {
				if (err) {
					console.log("error: ", err);
					return;
				} else {
					console.log("User created successfully");

					// take the user's insertId and make another query.
					let userobject2 = {
						user_id: res.insertId,
						publicAddress: publicKey,
						privateAddress: privateKey,
					};

					await connection.query(
						"INSERT INTO addresses SET ?",
						userobject2,
						async (err: Error, res: any) => {
							if (err) {
								console.log("error: ", err);
								return;
							} else {
								console.log(
									"User addresses have been successfully inserted in the database."
								);
							}
						}
					);
				}
			}
		);
	}
};

export { generator, storeInDatabase, Person };
