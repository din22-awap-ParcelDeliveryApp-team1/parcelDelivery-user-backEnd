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
const express_1 = __importDefault(require("express"));
const signin_model_1 = __importDefault(require("../models/signin_model"));
//import bcrypt from 'bcrypt';
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const secretkey = process.env.JWT_SECRET;
// the thunder client api test http 
//http://localhost:3001/signin
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //parameter at here needs to be same as frontend
    const { user_name, password } = req.body;
    console.log("userName: " + user_name + ", password: " + password);
    try {
        const user = yield signin_model_1.default.checkifUserExists(user_name); //as unknown as { user_name: string, password:string, id_user:number };        
        if (!user) {
            console.log("user 404");
            return res.status(404).json({ message: 'Username does not exist' });
        }
        console.log("controller ifMatchPwd: " + password + ":" + user.password);
        const salt = "ParcelDeliveryApp";
        const hash = crypto_1.default.pbkdf2Sync(password, salt, 10, 20, 'sha512').toString('hex');
        const ifMatchPwd = (hash === user.password);
        console.log("controller ifMatchPwd: " + ifMatchPwd);
        if (!ifMatchPwd) {
            console.log("controller3");
            return res.status(404).json({ error: 'Password is incorrect' });
        }
        console.log("controller user.user_name: " + secretkey + ", user.id_user: " + user.id_user);
        //read in the back end and front end
        //server id should check who is correct usr
        const token = jsonwebtoken_1.default.sign({ user_name: user.user_name, userId: user.id_user }, secretkey, { expiresIn: '10h' });
        res.status(200).json({
            userId: user.id_user,
            user_name: user.user_name,
            token: token,
            message: "You are logged in",
            success: true
        });
    }
    catch (error) {
        console.log("error: " + res.statusMessage);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}));
router.get('/verify', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies['token'];
    if (!token) {
        return res.status(401).send("unauthorized");
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, secretkey);
        res.status(200).json(payload);
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).send("Token expired. Log in again");
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(401).send("Invalid token. Log in again");
        }
        else {
            res.status(400).send("Bad request");
        }
    }
}));
exports.default = router;
