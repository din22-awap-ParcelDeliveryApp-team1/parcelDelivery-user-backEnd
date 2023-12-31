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
const signin_model = {
    //check if user exists
    checkifUserExists: (user_name) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exist_userName_query = `SELECT * FROM user WHERE user_name = ?`;
            const [exist_userName_result] = yield dataBase_1.default.promise().query(exist_userName_query, [user_name]);
            if (exist_userName_result.length > 0) {
                return exist_userName_result[0]; // Return the user object
            }
            return null;
        }
        catch (error) {
            console.error(`Error in checkUsernameExists: ${error}.message`);
            return null;
        }
    }),
};
exports.default = signin_model;
