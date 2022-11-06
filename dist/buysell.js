"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// users buy and sell /trade with the website:
var axios_1 = __importDefault(require("axios"));
var websiteTrader = function () {
    axios_1.default.get("http://localhost:8024/getUserData")
        .then(function (res) {
        if (res.status == 200) {
            console.log(res.data);
        }
    })
        .catch(function (err) {
        console.log(err);
    });
};
exports.default = websiteTrader;
//# sourceMappingURL=buysell.js.map