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
exports.main = void 0;
var axios_1 = __importDefault(require("axios"));
var _1 = require(".");
var ENDPOINT = "http://127.0.0.1:8024";
var main = function () {
    var getUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get("http://localhost:8024/userfindAutoGens")
                        .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                        var randomNumber, chosenUserId_1, chosenUserBalance_1, GeneratedNotes_1, GeneratedPrice_1;
                        return __generator(this, function (_a) {
                            if (res.status == 200) {
                                randomNumber = Math.floor(Math.random() * _1.GLOBAL_NUMBER_OF_USERS);
                                chosenUserId_1 = res.data[randomNumber].id;
                                chosenUserBalance_1 = res.data[randomNumber].balance;
                                console.log('randomly found the userID: ' + chosenUserId_1);
                                GeneratedNotes_1 = 0;
                                GeneratedPrice_1 = 0;
                                if (chosenUserBalance_1 > 100) {
                                    // console.log("wer are at chosen balalnce")
                                    chosenUserBalance_1 = (chosenUserBalance_1 * 30) / 100;
                                    // console.log(await getCurrentPrice());
                                    axios_1.default.get("http://localhost:8024/getCurrentPrice")
                                        .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                                        var orderObject;
                                        return __generator(this, function (_a) {
                                            console.log('works');
                                            console.log('within the geCurrentPrice function');
                                            GeneratedPrice_1 = res;
                                            GeneratedNotes_1 =
                                                chosenUserBalance_1 / GeneratedPrice_1.data.data;
                                            console.log('price is : ' + GeneratedPrice_1.data.data);
                                            orderObject = {
                                                user_id: chosenUserId_1,
                                                price: GeneratedPrice_1.data.data,
                                                ordertype: "buy",
                                                amount: chosenUserBalance_1,
                                                notes: GeneratedNotes_1,
                                            };
                                            return [2 /*return*/];
                                        });
                                    }); })
                                        .catch(function (err) {
                                        console.log(err);
                                    });
                                }
                            }
                            return [2 /*return*/];
                        });
                    }); })
                        .catch(function (error) {
                        console.log(error);
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
//# sourceMappingURL=worker_buy.js.map