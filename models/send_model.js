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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataBase_1 = __importDefault(require("../dataBase"));
const sendParcel = {
    //Post information of a new parcel to the database
    postParcel: (parcel) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Generate a random 4 digit pin code
            const code = Math.floor(1000 + Math.random() * 9000);
            parcel.pin_code = code;
            parcel.status = 'ready_to_deliver';
            parcel.parcel_pickup_date = null;
            const query = `INSERT INTO parcel SET ?`;
            const result = yield dataBase_1.default.promise().query(query, [parcel]);
            // Return an object containing the pin code along with other data
            return {
                pin_code: code,
            };
        }
        catch (e) {
            console.error(e.message);
            return `Error from parcel model: ${e.message}`;
        }
    }),
};
exports.default = sendParcel;
