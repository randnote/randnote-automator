/* generates names and thier public and private keys */
import chance from "chance"

interface Person{
    firstname: string,
    lastname: string,
    password: string,
    verifiedemail: number,
    publicKey: number,
    privateKey: number
}


const generator = () =>{
    // let firstname, lastname, password, verifiedemail, publicKey;
    
    for(let i = 0; i < 10; i++){
        let myObject: Person = {
            firstname: chance.first({ nationality: 'us' }),
            lastname: chance.last({nationality: 'us'}),
            password: "password",
            verifiedemail: 1,
            publicKey: 1,
            privateKey: 1
        }
        
    }
}

// person = {
//     "firstname": firstname,
//     "lastname": lastname,
//     "password": generate_random_password(),
//     "email": fullname+"@randnoteGen.com",
//     "verifiedemail": 1,
//     "publicKey": 2,
//     "privateKey": 2
// }	

