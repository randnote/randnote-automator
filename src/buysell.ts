// users buy and sell /trade with the website:
import Axios from "axios";

let users: any = [];

const websiteTrader = async () => {
	await Axios.get(`http://localhost:8024/userfindAutoGens`)
		.then((res) => {
			if (res.status == 200) {
				res.data.forEach((element: any) => {
					users.push(element);
				});
			}
		})
		.catch((err) => {
			console.log(err);
		});

	// console.log(users.length);
	console.log(users[5])
};

// funciton to get users with the lowesst balance and highest balance:
const getLowestBiggest = () =>{
	
}


   
const myLoop = () => {      
let i = 11;  
  setTimeout(() => {   
    console.log('hello'); 
	
	// code here

    if (i > 10) {           
      myLoop();             
    }                       
  }, 1000)
}

myLoop();   


export default websiteTrader;
