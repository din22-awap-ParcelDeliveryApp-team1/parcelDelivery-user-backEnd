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
const parcel = {
    // Get parcels where sender is the logged in user
    getSentParcels: (userid) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `SELECT * FROM parcel JOIN user ON parcel.id_user=user.id_user WHERE user.id_user = ?`;
            const result = yield dataBase_1.default.promise().query(query, [userid]);
            return result[0];
        }
        catch (e) {
            console.error(e.message);
            return `Error from parcel model: ${e.message}`;
        }
    }),
    // Get parcels where receiver is the logged in user
    getRecievedParcels: (userid) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // first get the user telephonenumber from the user table
            const numberQuery = `SELECT telephone FROM user WHERE id_user = ?`;
            const resultNumber = yield dataBase_1.default.promise().query(numberQuery, [userid]);
            // then get the parcels where the reciever has the user telephonenumber
            const query = `SELECT * FROM parcel WHERE reciever_telephone = ?`;
            const result = yield dataBase_1.default.promise().query(query, [resultNumber[0][0].telephone]);
            return result[0];
        }
        catch (e) {
            console.error(e.message);
            return `Error from parcel model: ${e.message}`;
        }
    })
};
exports.default = parcel;
