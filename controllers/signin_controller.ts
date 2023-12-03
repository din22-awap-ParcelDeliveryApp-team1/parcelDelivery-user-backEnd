import express, { Request, Response } from 'express';
import signin_model from '../models/signin_model';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const router = express.Router();
const secretkey = process.env.JWT_SECRET as string;
interface User {
    id_user: number;
    user_name: string;
    password: string;
}

router.post('/', async (req: Request, res: Response) => {
    //parameter at here needs to be same as frontend
    const { user_name, password } = req.body;
    console.log("userName: " + user_name + ", password: " + password);
    try {
        const user = await signin_model.checkifUserExists(user_name); //as unknown as { user_name: string, password:string, id_user:number };        

        if (!user) {
            console.log("controller2");
            return res.status(404).json({ message: 'Username does not exist' });
        }
        console.log("controller ifMatchPwd: " + password + ":" + user.password);

        const salt = "ParcelDeliveryApp";
        const hash = crypto.pbkdf2Sync(password, salt, 10, 20, 'sha512').toString('hex');
        const ifMatchPwd = (hash === user.password);
        console.log("controller ifMatchPwd: " + ifMatchPwd);
        if (!ifMatchPwd) {
            console.log("controller3");
            return res.status(404).json({ error: 'Password is incorrect' });
        }
        console.log("controller user.user_name: " + secretkey + ", user.id_user: " + user.id_user);
        //read in the back end and front end
        //server id should check who is correct usr
        const token = jwt.sign({ user_name: user.user_name, userId: user.id_user }, secretkey, { expiresIn: '10h' });
        res.status(200).json({
            userId: user.id_user,
            user_name: user.user_name,
            token: token,
            message: "You are logged in",
            success: true
        }); 
    } catch (error) {
        console.log("error: " + res.statusMessage);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

router.get('/verify', async (req, res) => {
    const token = req.cookies['token'];
    if (!token) { return res.status(401).send("unauthorized"); }
    try {
        const payload = jwt.verify(token, secretkey) as jwt.JwtPayload;
        res.status(200).json(payload);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).send("Token expired. Log in again");
        } else if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).send("Invalid token. Log in again");
        }
        else {
            res.status(400).send("Bad request");
        }
    }
});

export default router;