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
/* async function checkifUserExists(userName: string) {
    const query = `SELECT * FROM user WHERE user_name = ?`;
    const result = await connection.promise().query(query, [userName]);
    console.log(result);
    return result.length > 0;
}

async function getUserPwd(userName: string) {
    const query = `SELECT password FROM user WHERE user_name = ?`;
    const result = (await connection.promise().query(query, [userName])) as any[];
    //const result = await connection.promise().query(query, [userName]);
    if (result.length === 0) {
        throw new Error(`User ${userName} password not found`);
    }
    return result[0].password;
}

const signin_model = async(userName: string, password: string) => {
    let rightuser = await checkifUserExists(userName);
    if(rightuser) {
        const userPwd = await getUserPwd(userName);
        const ifmatch = await userPwd === password;
        if(ifmatch) {
            const userDttail =  `SELECT * FROM user WHERE user_name = ? AND password = ?`;
            return userDttail;
        } else {
            throw new Error(`Username or password not match`);
        }
    }else {
        throw new Error(`Username or password not match`);
    }
}

export default signin_model; */
/* http://localhost:3001/user/signin */
const signin_model = {
    //1126 new code
    /* async signin(userName: string, password: string): Promise<User | null>  {
    try {
        // Check if the username and password combination exists
        const query = `SELECT * FROM user WHERE user_name = ? AND password = ?`;
        const [userPwdresult] = await connection.promise().query(query, [userName, password]);
         // If userPwdresult has at least one row, it means the combination exists
         if (Array.isArray(userPwdresult) && userPwdresult.length > 0) {
            return userPwdresult[0] as User;
        } else {
            return null; // Return null if the combination does not exist
        }
        }catch (error) {
        console.error(`Error in login: ${error as Error}.message`);
        return null;
    }
    }, */
    //1124 new code
    checkifUserExists(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exist_userName_query = `SELECT * FROM user WHERE user_name = ?`;
                const exist_userName_result = yield dataBase_1.default.promise().query(exist_userName_query, [userName]);
                return exist_userName_result.length > 0;
            }
            catch (error) {
                console.error(`Error in checkUsernameExists: ${error}.message`);
                return false;
            }
        });
    },
    //old code
    /* async checkifUserExists(userName: string){
        const query = `SELECT * FROM user WHERE user_name = ?`;
        const [rows] = await connection.promise().query(query, [userName]);
        if (!Array.isArray(rows) || rows.length === 0) {
            return null;
        }
        console.log(userName);
        return rows[0] as User;
    }, */
    getUserPwd(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT password FROM user WHERE user_name = ?`;
            const [rows] = yield dataBase_1.default.promise().query(query, [userName]);
            if (!Array.isArray(rows) || rows.length === 0) {
                return null;
            }
            const user = rows[0]; // Cast to the expected type
            console.log(user.password);
            return user.password;
        });
    },
    //1126 commet out
    getLoginUser(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            //1124
            const userExists = yield this.checkifUserExists(userName);
            if (!userExists) {
                return null;
            }
            const userPwd = yield this.getUserPwd(userName);
            if (!userPwd || userPwd !== password) {
                return null;
            }
            const query = `SELECT * FROM user WHERE user_name = ? AND password = ?`;
            const [userPwdresult] = yield dataBase_1.default.promise().query(query, [userName, password]);
            if (!Array.isArray(userPwdresult) || userPwdresult.length === 0) {
                return null;
            }
            //old code has error at controller
            //const query = `SELECT * FROM user WHERE user_name = ? AND password = ?`;
            //const result = await connection.promise().query(query, [userName, password]);
            //return result[0];
            return userPwdresult[0];
        });
    }
};
exports.default = signin_model;
