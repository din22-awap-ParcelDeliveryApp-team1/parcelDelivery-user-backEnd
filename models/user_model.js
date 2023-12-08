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
const crypto_1 = __importDefault(require("crypto"));
/*
http://localhost:3001/user/check-userName */
//http://localhost:3001/user/check-username?user_name=some
//last year logic, for regester user, check if user name exists
//use hashed password
//1124 code 
const user = {
    // Get all users
    getUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `SELECT * FROM user `;
            const result = yield dataBase_1.default.promise().query(query);
            return result;
        }
        catch (e) {
            console.error(e.message);
            return `Error from user model: ${e.message}`;
        }
    }),
    // Get user by id
    getUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("userId: " + userId);
            const query = `SELECT * FROM user WHERE id_user = ?`;
            const result = yield dataBase_1.default.promise().query(query, [userId]);
            console.log(result);
            return result[0];
        }
        catch (e) {
            console.error(e.message);
            return `Error from user model: ${e.message}`;
        }
    }),
    //1124 new code for checking username
    checkifUserExists: (userName) => __awaiter(void 0, void 0, void 0, function* () {
        //console.log(userName);  line42 needs to check, 43
        try {
            const exist_userName_query = `SELECT user_name FROM user WHERE user_name = ?`;
            //const exist_userName_result = await connection.promise().query(exist_userName_query, [userName]);
            //console.log(exist_userName_result); //false
            const [exist_userName_result] = yield dataBase_1.default.promise().query(exist_userName_query, [userName]);
            console.log(exist_userName_result.length);
            //console.log(Array.isArray(exist_userName_result));
            console.log(exist_userName_result);
            if (exist_userName_result.length > 0) {
                return true;
                //throw new Error('Username already exists');
            }
            //console.log(rows[0].length); //undefined
            //miiki //if result 
            //return ("User name exists, please choose other user nmae");
            return false;
        }
        catch (error) {
            console.error(`Error in checkUsernameExists: ${error}.message`);
            return false;
        }
    }),
    // Create user
    createUser: (user_name, password, first_name, last_name, telephone, email, street_address, postal_code, city) => __awaiter(void 0, void 0, void 0, function* () {
        //1126 check if user name exists
        const isUserExists = yield user.checkifUserExists(user_name);
        if (isUserExists) {
            throw new Error('Username already exists');
        }
        const salt = "ParcelDeliveryApp";
        const hashedPassword = crypto_1.default.pbkdf2Sync(password, salt, 10, 20, 'sha512').toString('hex');
        //const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const query = `INSERT INTO user (
                user_name, password, first_name, last_name, telephone, 
                email, street_address, postal_code, city) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?)`;
            const result = yield dataBase_1.default.promise().query(query, [
                user_name, hashedPassword, first_name, last_name, telephone, email, street_address, postal_code, city
            ]);
            console.log(user_name);
            return result[0];
        }
        catch (e) {
            console.error(e.message);
            return `Error from user model: ${e.message}`;
        }
    }),
    // Update user
    updateUser: (userid, user_name, password, first_name, last_name, telephone, email, street_address, postal_code, city) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const salt = "ParcelDeliveryApp";
            const hashedPassword = crypto_1.default.pbkdf2Sync(password, salt, 10, 20, 'sha512').toString('hex');
            //const hashedPassword = await bcrypt.hash(password, 10);
            const query = `UPDATE user SET first_name = ?, last_name=?, email = ?, password = ?, telephone = ?, Street_address = ? WHERE id_user = ?`;
            const result = yield dataBase_1.default.promise().query(query, [hashedPassword, user_name, first_name, last_name, telephone, email, street_address, postal_code, city, userid]);
            return result[0];
        }
        catch (e) {
            console.error(e.message);
            return `Error from user model: ${e.message}`;
        }
    }),
    // Delete user
    deleteUser: (userid) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `DELETE FROM user WHERE id_user = ?`;
            const result = yield dataBase_1.default.promise().query(query, [userid]);
            return result[0];
        }
        catch (e) {
            console.error(e.message);
            return `Error from user model: ${e.message}`;
        }
    }),
};
exports.default = user;
