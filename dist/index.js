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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLOBAL_NUMBER_OF_USERS = exports.PeopleArray = exports.BACKEND_API = exports.FRONTEND_API = exports.BLOCKCHAIN_API = void 0;
var worker_miner_1 = require("./worker_miner");
var worker_buy_1 = require("./worker_buy");
var worker_sell_1 = require("./worker_sell");
var worker_sendNotes_1 = require("./worker_sendNotes");
var nameGenerator_1 = require("./nameGenerator");
var PeopleArray = []; // array will store Person's
exports.PeopleArray = PeopleArray;
var GLOBAL_NUMBER_OF_USERS = 49;
exports.GLOBAL_NUMBER_OF_USERS = GLOBAL_NUMBER_OF_USERS;
// set environmental variables
var BLOCKCHAIN_API = "";
exports.BLOCKCHAIN_API = BLOCKCHAIN_API;
var FRONTEND_API = "";
exports.FRONTEND_API = FRONTEND_API;
var BACKEND_API = "";
exports.BACKEND_API = BACKEND_API;
process.env.NODE_ENV = "development";
if (process.env.NODE_ENV == "development") {
    exports.BLOCKCHAIN_API = BLOCKCHAIN_API = "http://blockchain:8034";
    exports.FRONTEND_API = FRONTEND_API = "http://frontend:3002";
    exports.BACKEND_API = BACKEND_API = "http://backend:8024";
}
else if (process.env.NODE_ENV == "production") {
    exports.BLOCKCHAIN_API = BLOCKCHAIN_API = "https://blockchain.randnotex.co.za";
    exports.FRONTEND_API = FRONTEND_API = "https://randnotex.co.za";
    exports.BACKEND_API = BACKEND_API = "https://backend.randnotex.co.za";
}
// function I run when i want to populate db with fake users:
var generateRandomUsersAndStoreInDatabase = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, nameGenerator_1.StoreSudoInDB)()];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, nameGenerator_1.generator)()];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, nameGenerator_1.storeInDatabase)()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var main = function () {
    var l = true;
    var count = 0;
    setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    count++;
                    return [4 /*yield*/, (0, worker_buy_1.main)()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, worker_sell_1.main)()];
                case 2:
                    _a.sent();
                    if (!(count === 10)) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, worker_miner_1.main)()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, worker_sendNotes_1.main)()];
                case 4:
                    _a.sent();
                    count = 0;
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); }, 900);
};
main();
generateRandomUsersAndStoreInDatabase();
//# sourceMappingURL=index.js.map