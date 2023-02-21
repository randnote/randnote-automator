"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var worker_threads_1 = require("worker_threads");
var func = function () {
    worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage("depositor worker done");
};
setInterval(function () {
    func();
}, 1000);
//# sourceMappingURL=depositor.js.map