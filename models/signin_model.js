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
/* http://localhost:3001/user/signin */
const signin_model = {
    //1127 code for login 
    //check if user exists
    checkifUserExists: (user_name) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //const exist_userName_query = `SELECT id_user,user_name,password FROM user WHERE user_name = ?`;
            const exist_userName_query = `SELECT * FROM user WHERE user_name = ?`;
            const [exist_userName_result] = yield dataBase_1.default.promise().query(exist_userName_query, [user_name]);
            console.log("sing checkuser 1 +" + exist_userName_result);
            console.log("sing checkuser 2" + exist_userName_result);
            if (exist_userName_result.length > 0) {
                console.log("sing checkuser 3");
                return exist_userName_result[0]; // Return the user object
                //throw new Error('Username already exists');
            }
            console.log("sing checkuser 4");
            return null;
        }
        catch (error) {
            console.error(`Error in checkUsernameExists: ${error}.message`);
            return null;
        }
    }),
};
exports.default = signin_model;
