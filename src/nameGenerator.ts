/* generates names and thier public and private keys */
import chance from "chance";
import Elliptic from "elliptic";
const EC = Elliptic.ec;
const ec = new EC("secp256k1");

interface Person {
	firstname: string;
	lastname: string;
	password: string;
	verifiedemail: number;
	publicKey: number;
	privateKey: number;
}


const generator = async() => {
	let PeopleArray = []; // array will store Person's

	for (let i = 0; i < 5; i++) {
        const key = ec.genKeyPair();
	    const publicKey = await key.getPublic("hex");
	    const privateKey = await key.getPrivate("hex");

		let myObject: Person = {
			firstname: chance().first(),
			lastname: chance().last(),
			password: "password",
			verifiedemail: 1,
			publicKey: publicKey,
			privateKey: privateKey,
		};
		console.log(myObject)
	}
};

export default generator;
