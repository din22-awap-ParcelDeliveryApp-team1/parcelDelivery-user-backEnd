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
    // Create user
    createUser: (name, email, password, phone, address) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `INSERT INTO user (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)`;
            const result = yield dataBase_1.default.promise().query(query, [name, email, password, phone, address]);
            return result[0];
        }
        catch (e) {
            console.error(e.message);
            return `Error from user model: ${e.message}`;
        }
    }),
    // Update user
    updateUser: (userid, name, email, password, phone, address) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `UPDATE user SET name = ?, email = ?, password = ?, phone = ?, address = ? WHERE id_user = ?`;
            const result = yield dataBase_1.default.promise().query(query, [name, email, password, phone, address, userid]);
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
