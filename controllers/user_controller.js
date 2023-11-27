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
const user_model_1 = __importDefault(require("../models/user_model"));
const router = express_1.default.Router();
// the thunder client api test http 
http: //localhost:3001/user/check-username?user_name=akui
 
//check if user exists
//11-27 new code 
router.get('/check-username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body + "user_controller");
    const user_name = req.query.user_name;
    console.log(user_name);
    try {
        const ifUserExist = yield user_model_1.default.checkifUserExists(user_name);
        if (ifUserExist) {
            console.log("User exists: " + ifUserExist);
            //console.log(res.status);
            return res.status(302).json({ message: "This username already exists" });
        }
        res.json(200);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
//create user
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body + "user_controller");
    const { user_name, password, first_name, last_name, telephone, email, street_address, postal_code, city } = req.body;
    try {
        //const {user_name, password, first_name, last_name, telephone, email, street_address, postal_code, city} = req.body;
        // Additional validations or password hashing should be done here
        const newUser = yield user_model_1.default.createUser(user_name, password, first_name, last_name, telephone, email, street_address, postal_code, city);
        res.status(201).json({ message: 'User created successfully', newUser });
        console.log(newUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Get user by id
router.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId, 10); // Extract the user ID from the URL parameter
    try {
        const userData = yield user_model_1.default.getUser(userId);
        if (userData.length === 0) {
            res.status(404).json({ error: 'User not found' });
        }
        else {
            res.json(userData);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// delete user by id
router.delete('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId, 10); // Extract the user ID from the URL parameter
    try {
        const userData = yield user_model_1.default.deleteUser(userId);
        if (userData.length === 0) {
            res.status(404).json({ error: 'User not found' });
        }
        else {
            res.json(userData);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = router;
