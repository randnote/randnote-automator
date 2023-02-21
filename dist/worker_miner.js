"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var worker_threads_1 = require("worker_threads");
/*
    Call the API and get the users(), then call blockchain - for all users determine who has the lowest notes...
    Then take that user and mine with them....
*/
// const {ParentPort} = require('worker_threads')
var func = function () {
    worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage("worker miner done ");
};
setInterval(function () {
    func();
}, 1000);
//# sourceMappingURL=worker_miner.js.map