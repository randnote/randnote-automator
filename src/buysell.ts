// users buy and sell /trade with the website:
import Axios from "axios";

let users:any = []

const websiteTrader = async() => {
	await Axios.get(`http://localhost:8024/getUserData`)
		.then((res) => {
			if (res.status == 200) {
                res.data.forEach((element:any) => {
                    users.push(element)
                });
            }
		})
		.catch((err) => {
			console.log(err);
		});

    // console.log(users.length);
    // console.log(users[5])

};

// now im able to store the users in array, i can now focus on making the buy/sell work perfectly in backendApp 

export default websiteTrader;
