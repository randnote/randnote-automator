interface Person {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    verifiedemail: number;
    publicKey: any;
    privateKey: any;
}
declare const StoreSudoInDB: () => void;
declare const generator: () => Promise<void>;
declare const storeInDatabase: () => Promise<void>;
export { generator, storeInDatabase, Person, StoreSudoInDB };
