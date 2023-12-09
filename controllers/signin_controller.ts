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
    const { user_name, password } = req.body;
    
    try {
        const user = await signin_model.checkifUserExists(user_name);         

        if (!user) {
            return res.status(404).json({ message: 'Username does not exist' });
        }

        const salt = "ParcelDeliveryApp";
        const hash = crypto.pbkdf2Sync(password, salt, 10, 20, 'sha512').toString('hex');
        const ifMatchPwd = (hash === user.password);
        
        if (!ifMatchPwd) {
            return res.status(404).json({ error: 'Password is incorrect' });
        }
        
        const token = jwt.sign({ type: "session", user_name: user.user_name, userId: user.id_user }, secretkey, { expiresIn: '10h' });
        res.status(200).json({
            userId: user.id_user,
            user_name: user.user_name,
            token: token,
            message: "You are logged in",
            success: true
        }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

router.get('/verify', async (req, res) => {
    const token = req.cookies['userToken'];

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