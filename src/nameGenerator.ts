/* generates names and thier public and private keys */
import chance from "chance";
import Elliptic from "elliptic";
import connection from "./databaseConnector";
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

let PeopleArray: Person[] = []; // array will store Person's

const generator = async () => {
	
	for (let i = 0; i < 5; i++) {
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
	}
};

const storeInDatabase = () => {
	for(let i =0; i < PeopleArray.length; i++){

		let firstname = PeopleArray[i].firstname;
		let lastname = PeopleArray[i].lastname;
		let email = PeopleArray[i].email;
		let password = PeopleArray[i].password;
		let verifiedemail = PeopleArray[i].verifiedemail;
		let balance = 0;
		
		let publicKey = PeopleArray[i].publicKey;
		let privateKey = PeopleArray[i].privateKey;
		

		connection.query(
			`INSERT INTO users SET (firstname, lastname, email, password, verifiedemail, balance) VALUES  (${firstname},${lastname},${email},${password},${verifiedemail},${balance})`,
			(err: Error, res: any) => {
				if (err) {
					console.log("error: ", err);
					return;
				}else{
					console.log("User created successfully");
				}
			}
		);
	}
}

export  {generator, storeInDatabase};
