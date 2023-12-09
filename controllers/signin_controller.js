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
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const secretkey = process.env.JWT_SECRET;
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_name, password } = req.body;
    try {
        const user = yield signin_model_1.default.checkifUserExists(user_name);
        if (!user) {
            return res.status(404).json({ message: 'Username does not exist' });
        }
        const salt = "ParcelDeliveryApp";
        const hash = crypto_1.default.pbkdf2Sync(password, salt, 10, 20, 'sha512').toString('hex');
        const ifMatchPwd = (hash === user.password);
        if (!ifMatchPwd) {
            return res.status(404).json({ error: 'Password is incorrect' });
        }
        const token = jsonwebtoken_1.default.sign({ type: "session", user_name: user.user_name, userId: user.id_user }, secretkey, { expiresIn: '10h' });
        res.status(200).json({
            userId: user.id_user,
            user_name: user.user_name,
            token: token,
            message: "You are logged in",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}));
router.get('/verify', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies['userToken'];
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
