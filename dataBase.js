"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//Create database connection to mysql
const connection = mysql2_1.default.createConnection({
    host: process.env.DB_HOST,
    user: "root",
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 3306
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
    }
    console.log("Connected to database");
});
exports.default = connection;
