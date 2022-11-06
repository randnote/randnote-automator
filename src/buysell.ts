// users buy and sell /trade with the website:
import  Axios  from "axios";


const websiteTrader = () =>{

    Axios.get( `http://localhost:8024/getUserData`)
        .then((res) => {
            if (res.status == 200) {
                console.log(res.data);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

export default websiteTrader;