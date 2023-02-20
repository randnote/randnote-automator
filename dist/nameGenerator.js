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
exports.StoreSudoInDB = exports.storeInDatabase = exports.generator = void 0;
/* generates names and thier public and private keys */
var chance_1 = __importDefault(require("chance"));
var elliptic_1 = __importDefault(require("elliptic"));
var databaseConnector_1 = __importDefault(require("./databaseConnector"));
var _1 = require(".");
var EC = elliptic_1.default.ec;
var ec = new EC("secp256k1");
var StoreSudoInDB = function () {
    var SudoArr = [];
    var RandnoteUSER = {
        firstname: "RANDNOTE",
        lastname: "RANDNOTE",
        email: "RANDNOTE@macbase.co.za",
        password: "password",
        verifiedemail: 1,
        publicKey: "049336f33b2edcb550017e4085f098dd91dbfa762a04f08ba0bed56bbd473751a43f1c5cd867b2a842922b3f92e353b14bf1c0f1f3e3f4f05762f6792a564ef102",
        privateKey: "cda0af58d5bdfa5551d54677fa293cae0363474f1eae7cb5e5abf60f8b8c7e2b",
    };
    var DanielUser = {
        firstname: "Daniel",
        lastname: "Mamph",
        email: "daniel@gmail.com",
        password: "password",
        verifiedemail: 1,
        publicKey: "0444ef6880a4f9afb7887b70c8cb4385083108326a46dfd9cf080dc97daf287dd3d573ad67bb15fbdfbc6d05fa7f5a1ef48eddfbc3cba23370e5677cca817de307",
        privateKey: "2668898c66b5dea316725f4f957070c3e12cd9292f3361107bececfabd6c2074",
    };
    SudoArr.push(RandnoteUSER);
    SudoArr.push(DanielUser);
    var balance = 10000000;
    SudoArr.forEach(function (user) { return __awaiter(void 0, void 0, void 0, function () {
        var object;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    object = {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        password: user.password,
                        verifiedemail: user.verifiedemail,
                        balance: 10000000,
                    };
                    return [4 /*yield*/, databaseConnector_1.default.query("INSERT INTO users SET ?", object, function (err, res) { return __awaiter(void 0, void 0, void 0, function () {
                            var userobject2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!err) return [3 /*break*/, 1];
                                        console.log("error: ", err);
                                        return [2 /*return*/];
                                    case 1:
                                        console.log("User created successfully");
                                        userobject2 = {
                                            user_id: res.insertId,
                                            publicAddress: user.publicKey,
                                            privateAddress: user.privateKey,
                                        };
                                        return [4 /*yield*/, databaseConnector_1.default.query("INSERT INTO addresses SET ?", userobject2, function (err, res) { return __awaiter(void 0, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    if (err) {
                                                        console.log("error: ", err);
                                                        return [2 /*return*/];
                                                    }
                                                    else {
                                                        console.log("SUDO user address inserted successfully");
                                                    }
                                                    return [2 /*return*/];
                                                });
                                            }); })];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.StoreSudoInDB = StoreSudoInDB;
var generator = function () { return __awaiter(void 0, void 0, void 0, function () {
    var i, key, publicKey, privateKey, firstname, lastname, myObject;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < 48)) return [3 /*break*/, 5];
                key = ec.genKeyPair();
                return [4 /*yield*/, key.getPublic("hex")];
            case 2:
                publicKey = _a.sent();
                return [4 /*yield*/, key.getPrivate("hex")];
            case 3:
                privateKey = _a.sent();
                firstname = (0, chance_1.default)().first();
                lastname = (0, chance_1.default)().last();
                myObject = {
                    firstname: firstname,
                    lastname: lastname,
                    password: "password",
                    email: "".concat(firstname).concat(lastname, "@randnotex.co.za"),
                    verifiedemail: 1,
                    publicKey: publicKey,
                    privateKey: privateKey,
                };
                // now we add in the people array:
                _1.PeopleArray.push(myObject);
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.generator = generator;
var storeInDatabase = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _loop_1, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _loop_1 = function (i) {
                    var firstname, lastname, email, password, verifiedemail, balance, publicKey, privateKey, userobject;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                firstname = _1.PeopleArray[i].firstname;
                                lastname = _1.PeopleArray[i].lastname;
                                email = _1.PeopleArray[i].email;
                                password = _1.PeopleArray[i].password;
                                verifiedemail = _1.PeopleArray[i].verifiedemail;
                                balance = 60000;
                                publicKey = _1.PeopleArray[i].publicKey;
                                privateKey = _1.PeopleArray[i].privateKey;
                                userobject = {
                                    firstname: firstname,
                                    lastname: lastname,
                                    email: email,
                                    password: password,
                                    verifiedemail: verifiedemail,
                                    balance: balance,
                                };
                                return [4 /*yield*/, databaseConnector_1.default.query("INSERT INTO users SET ?", userobject, function (err, res) { return __awaiter(void 0, void 0, void 0, function () {
                                        var userobject2;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!err) return [3 /*break*/, 1];
                                                    console.log("error: ", err);
                                                    return [2 /*return*/];
                                                case 1:
                                                    console.log("User created successfully");
                                                    userobject2 = {
                                                        user_id: res.insertId,
                                                        publicAddress: publicKey,
                                                        privateAddress: privateKey,
                                                    };
                                                    return [4 /*yield*/, databaseConnector_1.default.query("INSERT INTO addresses SET ?", userobject2, function (err, res) { return __awaiter(void 0, void 0, void 0, function () {
                                                            return __generator(this, function (_a) {
                                                                if (err) {
                                                                    console.log("error: ", err);
                                                                    return [2 /*return*/];
                                                                }
                                                                else {
                                                                    console.log("User addresses have been successfully inserted in the database.");
                                                                }
                                                                return [2 /*return*/];
                                                            });
                                                        }); })];
                                                case 2:
                                                    _a.sent();
                                                    _a.label = 3;
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                };
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < _1.PeopleArray.length)) return [3 /*break*/, 4];
                return [5 /*yield**/, _loop_1(i)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.storeInDatabase = storeInDatabase;
//# sourceMappingURL=nameGenerator.js.map