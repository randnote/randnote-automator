import { generator, storeInDatabase, Person,StoreSudoInDB } from "./nameGenerator";
import connection from "./databaseConnector";
let PeopleArray: Person[] = []; // array will store Person's



const generateRandomUsersAndStoreInDatabase = async () => {
	await StoreSudoInDB()
	await generator();
	await storeInDatabase();
};
generateRandomUsersAndStoreInDatabase();

export { PeopleArray };
