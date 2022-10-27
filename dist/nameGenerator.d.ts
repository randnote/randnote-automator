interface Person {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    verifiedemail: number;
    publicKey: number;
    privateKey: number;
}
declare const generator: () => Promise<void>;
declare const storeInDatabase: () => Promise<void>;
export { generator, storeInDatabase, Person };
