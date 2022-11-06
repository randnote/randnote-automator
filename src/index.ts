import {
	generator,
	storeInDatabase,
	Person,
	StoreSudoInDB,
} from "./nameGenerator";
import connection from "./databaseConnector";
import websiteTrader from "./buysell";
let PeopleArray: Person[] = []; // array will store Person's

const generateRandomUsersAndStoreInDatabase = async () => {
	// await StoreSudoInDB();
	// await generator();
	// await storeInDatabase();
	websiteTrader();
};
generateRandomUsersAndStoreInDatabase();

export { PeopleArray };
