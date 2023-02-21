import Axios from "axios";
import { parentPort } from "worker_threads";
/* 
    Call the API and get the users(), then call blockchain - for all users determine who has the lowest notes...
    Then take that user and mine with them....
*/

// const {ParentPort} = require('worker_threads')

const func = ()=>{
    let i = 0;
    while(i < 300000){
        i++
    }
    if(i === 30000){
        parentPort?.postMessage("done "+ i)
        return 100
    }
    return 100
}

setInterval(()=>{
    func()
}, 1000)
// func()

// parentPort?.postMessage(func())

