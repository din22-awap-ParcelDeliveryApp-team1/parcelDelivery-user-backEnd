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
            //console.log(rows[0].length); //undefined
            //miiki //if result 
            //return ("User name exists, please choose other user nmae");
            //chatgpt suggest
            return null;
            //old code from register
            //return false;
        }
        catch (error) {
            console.error(`Error in checkUsernameExists: ${error}.message`);
            //chatgpt suggest 1128
            return null;
            //old code from register
            //return false;
        }
    }),
    //may not need this function, but still keep it if user need pwd
    /*
    getUserPwd: async (userName: string) => {
        try {
        const pwd_query = `SELECT password FROM user WHERE user_name = ?`;
        const [pwd_query_result]= await connection.promise().query<RowDataPacket[]>(pwd_query, [userName]);
        //const result = await connection.promise().query(query, [userName]);
        console.log("sing getpwd 1" +  pwd_query_result.length);
        console.log("sign model getpwd2 "+ pwd_query_result);
        if (pwd_query_result.length === 0) {
            return false;
            //throw new Error(`User ${userName} password not found`);
        }
        console.log("sing model getpwd 3 " + pwd_query_result[0].password);
        return pwd_query_result[0].password;
        //return true;
    }
        catch(error) {
            console.error(`Error in checkPwd: ${error as Error}.message`);
            return false;
        }
    },
    */
    //user to login
    /*
    loginUser: async (
        userName:string,
        password:string, ) =>
        {
                   
            
            //const hashedPassword = await signin_model.getUserPwd(password);
            //const hashedPassword = await bcrypt.hash(password, 10);
            //if (!hashedPassword || !(await bcrypt.compare(password, hashedPassword))) {
            //    throw new Error('Username or password not match');
            //  }
            try {
                //const query = `SELECT user_name, password FROM user WHERE user_name = ? AND password = ?`;
                const isUserExists = await signin_model.checkifUserExists(userName);
            //if user exists, then check password
            if(isUserExists) {
                const userPwd = await signin_model.getUserPwd(userName);
                const ifmatch = await bcrypt.compare(password, userPwd);
                console.log(ifmatch);
                if(ifmatch) {
                    const userDetail =  `SELECT * FROM user WHERE user_name = ? AND password = ?`;
                    return userDetail;
                }
                else {
                    throw new Error('Username or password not match');
                }
            }
            }catch(error) {
                console.error(`Error in getLoginUser: ${error as Error}.message`);
                return null;
            }
        
        },
        */
};
exports.default = signin_model;
