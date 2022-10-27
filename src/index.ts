import { generator, storeInDatabase, Person } from "./nameGenerator";
import connection from "./databaseConnector";
let PeopleArray: Person[] = []; // array will store Person's

//console.log("heloo world");

const func = async () => {
	await generator();
	await storeInDatabase();
};

func();

export { PeopleArray };
