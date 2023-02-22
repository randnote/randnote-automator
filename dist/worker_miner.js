"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var SHA256 = require("crypto-js/sha256");
// import Block from "../block";
// import { note } from "../controllers";
// PLAN: JUST get random users, select 1, and just mine with that one user.
var users = [];
var main = function () {
    // this function, needs to get users who can mine, and make one of them mine... calls the functions.ts
    var object = {};
    var getUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get("http://localhost:8024/userfindAutoGens")
                        .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (res.status == 200) {
                                // BEFORE SENDING OFF TO MAIN THREAD, I NEED TO MAKE USER WITH LOWEST-> MINE!!!!
                                // let obj: any = await getLowestBiggest(
                                // 	JSON.stringify(res.data)
                                // );
                                // parentPort?.postMessage(obj);
                                // call axios to get the users keys.... using his email
                                //await mineBlock("sdf", "sdf"); // i need to stash this with the public and private keys....
                            }
                            return [2 /*return*/];
                        });
                    }); })
                        .catch(function (err) {
                        console.log(err);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    getUsers();
};
var calculateHash = function (timestamp, previousHash, transactions, nonce) {
    return SHA256(timestamp + previousHash + JSON.stringify(transactions) + nonce).toString();
};
var mineBlock = function (publicAddress, privateAddress) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // first get the block:
        axios_1.default.get("http://localhost:8033/mine/".concat(publicAddress, "/0")).then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
            var block, difficulty, hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(response.status);
                        if (response.status === 204) {
                            console.log("There arent transactions to mine! Give it time & try again next time!");
                            process.exit(1);
                        }
                        return [4 /*yield*/, response.data.block];
                    case 1:
                        block = _a.sent();
                        difficulty = 2;
                        console.log(block);
                        console.log("---");
                        return [4 /*yield*/, calculateHash(block.timestamp, block.previousHash, block.transactions, block.nonce)];
                    case 2:
                        hash = _a.sent();
                        console.log("Mining...");
                        while (hash.substring(0, difficulty) != Array(difficulty + 1).join("0")) {
                            block["nonce"]++;
                            hash = calculateHash(block.timestamp, block.previousHash, block.transactions, block.nonce);
                        }
                        console.log("BLOCK MINED: " + block["hash"]); // just displays the hash string
                        // now send to the server:
                        axios_1.default.get("http://localhost:8033/mine/".concat(publicAddress, "/").concat(hash)).then(function (response) {
                            console.log(response.data);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
// setInterval(() => {
// 	main();
// }, 5000);
//# sourceMappingURL=worker_miner.js.map