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
const user = {
    // Get all users
    getUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `SELECT * FROM user`;
            const result = yield dataBase_1.default.promise().query(query);
            return result;
        }
        catch (e) {
            console.error(e.message);
            return `Error from user model: ${e.message}`;
        }
    }),
    // Get user by id
    getUser: (userid) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `SELECT * FROM user WHERE id_user = ?`;
            const result = yield dataBase_1.default.promise().query(query, [userid]);
            return result[0];
        }
        catch (e) {
            console.error(e.message);
            return `Error from user model: ${e.message}`;
        }
    }),
    //1124 new code for checking username
    checkifUserExists: (userName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exist_userName_query = `SELECT user_name FROM user WHERE user_name = ?`;
            const [exist_userName_result] = yield dataBase_1.default.promise().query(exist_userName_query, [userName]);
            if (exist_userName_result.length > 0) {
                return true;
            }
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
        try {
            const query = `INSERT INTO user (
                user_name, password, first_name, last_name, telephone, 
                email, street_address, postal_code, city) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?)`;
            const result = yield dataBase_1.default.promise().query(query, [
                user_name, hashedPassword, first_name, last_name, telephone, email, street_address, postal_code, city
            ]);
            if (result[0].insertId !== undefined) {
                return (yield user.getUser(result[0].insertId))[0];
            }
            else {
                return result[0];
            }
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
