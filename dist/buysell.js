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
// users buy and sell /trade with the website:
var axios_1 = __importDefault(require("axios"));
var users = [];
var websiteTrader = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default.get("http://localhost:8024/userfindAutoGens")
                    .then(function (res) {
                    if (res.status == 200) {
                        res.data.forEach(function (element) {
                            users.push(element);
                        });
                    }
                })
                    .catch(function (err) {
                    console.log(err);
                })];
            case 1:
                _a.sent();
                // console.log(users.length);
                console.log(users[5]);
                return [2 /*return*/];
        }
    });
}); };
// funciton to get users with the lowesst balance and highest balance:
var getLowestBiggest = function () {
    var smallestUser = users[0];
    var biggestUser = users[0];
    for (var i = 0; i < users.length; i++) {
        if (smallestUser.balance > users[i].balance) {
            smallestUser = users[i];
        }
        if (biggestUser.balance < users[i].balance) {
            biggestUser = users[i];
        }
    }
    var obj = {
        smallest: smallestUser,
        biggest: biggestUser,
    };
    return obj;
};
// value determiner function:
// this function gets the price and determines how many notes you should receive if you want to spend a partucular amount.
var valueDeterminer = function () {
    var value = 0;
    return value;
};
var myLoop = function () {
    var i = 11;
    setTimeout(function () {
        console.log(getLowestBiggest()); // shows the lowest and hights user
        // make the highest user buy notes:
        var biggestUser = getLowestBiggest["biggest"];
        var orderObject = {
            user_id: biggestUser.id,
            price: 0,
            amount: Math.floor(Math.random() * biggestUser.balance) + 1,
            ordertype: "buy",
            notes: 0, // we also need to call some sort of API and figure out how many notes they should get....
        };
        // Axios.post(`http://localhost:8024/transactionWebsite`, orderObject)
        // 	.then((res) => {
        // 		console.log("Transaction made");
        // 		// handleCloseNotes();
        // 		// handleClose();
        // 	})
        // 	.catch((err) => {
        // 		console.log(err);
        // 	});
        if (i > 10) {
            myLoop();
        }
    }, 1000);
};
myLoop();
exports.default = websiteTrader;
// LONG STORY SHORT, I NEED TO WRITE A FUNCITON IN THE BACKEND - SAME THING I DID IN THE FRONTED, WHICH WILL GET ME THE PRICE AND DETERMINE HOW
// MUCH I SHOULD PAY PER NOTE , PER HOW MANY NOTES
//# sourceMappingURL=buysell.js.map