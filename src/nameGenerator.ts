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
	publicKey: any;
	privateKey: any;
}

const StoreSudoInDB = () => {
	let SudoArr: any = [];
	let RandnoteUSER = {
		firstname: "RANDNOTE",
		lastname: "RANDNOTE",
		email: "RANDNOTE@macbase.co.za",
		password: "password",
		verifiedemail: 1,
		publicKey:
			"049336f33b2edcb550017e4085f098dd91dbfa762a04f08ba0bed56bbd473751a43f1c5cd867b2a842922b3f92e353b14bf1c0f1f3e3f4f05762f6792a564ef102",
		privateKey:
			"cda0af58d5bdfa5551d54677fa293cae0363474f1eae7cb5e5abf60f8b8c7e2b",
	};

	let DanielUser = {
		firstname: "Daniel",
		lastname: "Mamph",
		email: "daniel@gmail.com",
		password: "password",
		verifiedemail: 1,
		publicKey:
			"0444ef6880a4f9afb7887b70c8cb4385083108326a46dfd9cf080dc97daf287dd3d573ad67bb15fbdfbc6d05fa7f5a1ef48eddfbc3cba23370e5677cca817de307",
		privateKey:
			"2668898c66b5dea316725f4f957070c3e12cd9292f3361107bececfabd6c2074",
	};
	SudoArr.push(RandnoteUSER);
	SudoArr.push(DanielUser);

	let balance = 10000000;

	SudoArr.forEach(async (user: any) => {
		// temporarily remove teh addresses to add in table users,
		let object = {
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
			password: user.password,
			verifiedemail: user.verifiedemail,
			balance: 10000000,
		};

		await connection.query(
			"INSERT INTO users SET ?",
			object,
			async (err: Error, res: any) => {
				if (err) {
					console.log("error: ", err);
					return;
				} else {
					console.log("User created successfully");
					// take the user's insertId and make another query.
					let userobject2 = {
						user_id: res.insertId,
						publicAddress: user.publicKey,
						privateAddress: user.privateKey,
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
									"SUDO user address inserted successfully"
								);
							}
						}
					);
				}
			}
		);
	});
};

const generator = async () => {
	for (let i = 0; i < 48; i++) {
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

	// PeopleArray.push(RandnoteUSER);
	// PeopleArray.push(DanielUser);
};

const storeInDatabase = async () => {
	// PeopleArray.push(RandnoteUSER);
	// PeopleArray.push(DanielUser);
	for (let i = 0; i < PeopleArray.length; i++) {
		let firstname = PeopleArray[i].firstname;
		let lastname = PeopleArray[i].lastname;
		let email = PeopleArray[i].email;
		let password = PeopleArray[i].password;
		let verifiedemail = PeopleArray[i].verifiedemail;
		let balance = 60000;

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

export { generator, storeInDatabase, Person, StoreSudoInDB };
