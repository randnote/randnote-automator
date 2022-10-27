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
        while (_) try {
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
exports.storeInDatabase = exports.generator = void 0;
/* generates names and thier public and private keys */
var chance_1 = __importDefault(require("chance"));
var elliptic_1 = __importDefault(require("elliptic"));
var databaseConnector_1 = __importDefault(require("./databaseConnector"));
var _1 = require(".");
var EC = elliptic_1.default.ec;
var ec = new EC("secp256k1");
var generator = function () { return __awaiter(void 0, void 0, void 0, function () {
    var i, key, publicKey, privateKey, firstname, lastname, myObject;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < 5)) return [3 /*break*/, 5];
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
                console.log(_1.PeopleArray);
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
    var i, firstname, lastname, email, password, verifiedemail, balance, publicKey, privateKey;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("did");
                console.log(_1.PeopleArray);
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < _1.PeopleArray.length)) return [3 /*break*/, 4];
                firstname = _1.PeopleArray[i].firstname;
                lastname = _1.PeopleArray[i].lastname;
                email = _1.PeopleArray[i].email;
                password = _1.PeopleArray[i].password;
                verifiedemail = _1.PeopleArray[i].verifiedemail;
                balance = 0;
                publicKey = _1.PeopleArray[i].publicKey;
                privateKey = _1.PeopleArray[i].privateKey;
                return [4 /*yield*/, databaseConnector_1.default.query("INSERT INTO users SET (firstname, lastname, email, password, verifiedemail, balance) VALUES  (".concat(firstname, ",").concat(lastname, ",").concat(email, ",").concat(password, ",").concat(verifiedemail, ",").concat(balance, ")"), function (err, res) {
                        if (err) {
                            console.log("error: ", err);
                            return;
                        }
                        else {
                            console.log("User created successfully");
                            console.log(res);
                        }
                    })];
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