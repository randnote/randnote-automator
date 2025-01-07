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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
exports.main = void 0;
var axios_1 = __importDefault(require("axios"));
var _1 = require(".");
var _2 = require(".");
/*
    Excuse the mess....
    I write spaghetti code here because I dont have one API endpoint which gets me the users with their addresses and balances...
    So I resort to a new method, which i might or not use in other workers

    1. When generating users, generate 2, one will be the sender and the other is the receiver.
    2. Send their info down the apis untill i can send notes to the user.
    3. If the sender's notes is too low, then dont send anything.
    4. Repeat.
    5. This app will be testable only when the other worker noted start working too(to increase cashflow in the market).
*/
var main = function () {
    // this function, needs to get users who can mine, and make one of them mine... calls the functions.ts
    var getUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get("".concat(_2.BACKEND_API, "/userfindAutoGens"))
                        .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                        var randomNumber, randomNumberReciever, chosenUserId, chosenReceiverId_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(res.status == 200)) return [3 /*break*/, 2];
                                    randomNumber = Math.floor(Math.random() * _1.GLOBAL_NUMBER_OF_USERS);
                                    randomNumberReciever = Math.floor(Math.random() * _1.GLOBAL_NUMBER_OF_USERS);
                                    // following loop is to ensure that i get a new number that is not simmilar to my main number
                                    // to avoid user sending notes to themslevers.
                                    while (randomNumberReciever === randomNumber) {
                                        randomNumberReciever = Math.floor(Math.random() * 40);
                                    }
                                    chosenUserId = res.data[randomNumber].id;
                                    chosenReceiverId_1 = res.data[randomNumberReciever].id;
                                    // call api to get the users keys:
                                    return [4 /*yield*/, axios_1.default.get("".concat(_2.BACKEND_API, "/getKeys/").concat(chosenUserId))
                                            .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                                            var publicAddress_1, privateAddress_1;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!(res.status == 200)) return [3 /*break*/, 2];
                                                        publicAddress_1 = res.data[0].publicKey;
                                                        privateAddress_1 = res.data[0].privateKey;
                                                        // where the CORE spaghetti code starts:
                                                        return [4 /*yield*/, axios_1.default.get("".concat(_2.BACKEND_API, "/getKeys/").concat(chosenReceiverId_1))
                                                                .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                                                                var publicAddressReciever;
                                                                return __generator(this, function (_a) {
                                                                    switch (_a.label) {
                                                                        case 0:
                                                                            publicAddressReciever = res.data[0].publicKey;
                                                                            return [4 /*yield*/, axios_1.default.get("".concat(_2.BLOCKCHAIN_API, "/balance/").concat(publicAddress_1))
                                                                                    .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                                                                                    var usersBalance, calulatedNumberOfNotes, sendNotesObject, snack;
                                                                                    return __generator(this, function (_a) {
                                                                                        if (res.status == 200) {
                                                                                            usersBalance = res.data.balance;
                                                                                            // now that we have their balance, we proceed, otherwise restart process
                                                                                            if (usersBalance > 5) {
                                                                                                calulatedNumberOfNotes = (usersBalance *
                                                                                                    20) /
                                                                                                    100;
                                                                                                sendNotesObject = {
                                                                                                    fromAddress: publicAddress_1,
                                                                                                    toAddress: publicAddressReciever,
                                                                                                    amount: calulatedNumberOfNotes,
                                                                                                    fromAddressPrivateKey: privateAddress_1,
                                                                                                };
                                                                                                snack = JSON.stringify(sendNotesObject);
                                                                                                axios_1.default.post("".concat(_2.BLOCKCHAIN_API, "/transaction"), {
                                                                                                    obj: snack,
                                                                                                })
                                                                                                    .then(function (res) {
                                                                                                    // console.log(sendNotesObject);
                                                                                                    if (res.status ==
                                                                                                        200) {
                                                                                                        console.log("The transaction is successful Notes transfered from " +
                                                                                                            publicAddress_1 +
                                                                                                            " to the address: " +
                                                                                                            publicAddressReciever);
                                                                                                    }
                                                                                                })
                                                                                                    .catch(function (err) {
                                                                                                    console.log(err);
                                                                                                });
                                                                                            }
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
                                                            }); })
                                                                .catch(function (err) {
                                                                console.log(err);
                                                            })];
                                                    case 1:
                                                        // where the CORE spaghetti code starts:
                                                        _a.sent();
                                                        _a.label = 2;
                                                    case 2: return [2 /*return*/];
                                                }
                                            });
                                        }); })
                                            .catch(function (err) {
                                            console.log(err);
                                        })];
                                case 1:
                                    // call api to get the users keys:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
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
exports.main = main;
//# sourceMappingURL=worker_sendNotes.js.map