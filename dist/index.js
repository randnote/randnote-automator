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
exports.GLOBAL_NUMBER_OF_USERS = exports.PeopleArray = void 0;
var nameGenerator_1 = require("./nameGenerator");
var express_1 = __importDefault(require("express"));
var cors = require("cors");
var bodyParser = require("body-parser");
var app = (0, express_1.default)();
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
var worker_threads_1 = require("worker_threads");
var PeopleArray = []; // array will store Person's
exports.PeopleArray = PeopleArray;
var GLOBAL_NUMBER_OF_USERS = 40;
exports.GLOBAL_NUMBER_OF_USERS = GLOBAL_NUMBER_OF_USERS;
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
// instatiate the worker nodes:
var minerWorker = new worker_threads_1.Worker("./worker_miner.js");
var sendNotesWorker = new worker_threads_1.Worker("./worker_sendNotes.js");
var buyWorker = new worker_threads_1.Worker("./worker_buy.js");
var sellWorker = new worker_threads_1.Worker("./worker_sell.js");
var worker2 = new worker_threads_1.Worker("./depositor.js");
var tradeAndMiner = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // successes
        // minerWorker.on("message", (data) => {
        // 	// console.log(JSON.stringify(data));
        // 	console.log(data);
        // });
        // sendNotesWorker.on("message", (data) => {
        // 	// console.log(JSON.stringify(data));
        // 	console.log(data);
        // });
        buyWorker.on("message", function (data) {
            // console.log(JSON.stringify(data));
            console.log(data);
        });
        // worker2.on("message", (data) => {
        // 	console.log("worker 2 :" + data);
        // });
        //errors
        // minerWorker.on("error", (error) => {
        // 	console.log(error);
        // });
        // sendNotesWorker.on("error", (error) => {
        // 	console.log(error);
        // });
        buyWorker.on("error", function (error) {
            console.log(error);
        });
        return [2 /*return*/];
    });
}); };
tradeAndMiner();
var allowedOrigins = ["http://localhost:3000", "http://locahost:3000/admin"];
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = "The CORS policy for this site does not " +
                "allow access from the specified Origin.";
            // return callback(new Error(msg), false);
            return callback(null, true); // allow all of em
        }
        return callback(null, true);
    },
}));
// require("./routes/index")(app);
app.listen(8011, function () { return console.log("server started on port 8011"); });
//# sourceMappingURL=index.js.map