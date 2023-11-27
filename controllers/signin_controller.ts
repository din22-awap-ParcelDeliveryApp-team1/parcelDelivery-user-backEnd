import express from 'express';
import signin_model from '../models/signin_model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const secretkey = process.env.JWT_SECRET as string;

router.post('/signin', async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await signin_model.checkifUserExists(userName) as unknown as { user_name: string, password:string, id_user:number };        
        if (!user) {
            return res.status(401).json({ message: 'Username does not exist' });
        }
        const ifMatchPwd = await bcrypt.compare(password, user.password);
        if (!ifMatchPwd) {
            return res.status(401).json({ error: 'Password is incorrect' });
        }
        const token = jwt.sign({ userName: user.user_name, userId: user.id_user }, secretkey, { expiresIn: '10h' });
        res.status(200).json({
            token: token,
            message: "You are logged in",
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

// router.post('/login', async (req, res) => {
//     const {userName, password} = req.body;
//     try {
        
//         const user = await login_model.checkifUserExists(userName);
//         if (!user) {
//             return res.status(401).json({ message: 'Username is not exist' });
//         }
//         const ifMatchPwd = await bcrypt.compare(password, user.password);
//         if(!ifMatchPwd){
//             return res.status(401).json({ error: 'Password is incorrect' });
//         }
//         const token = jwt.sign({userName: user.user_name, userId:user.id_user}, secretkey, {expiresIn: '10h'});
// /*         const response = {
//             token: token,
//             message: "You are logged in",
//             sueccess: true
//         }; */
//         //res.status(200).json(response);
//     }catch (error) {
//         const response = {
//             message: "Login failed",
//             sueccess: false
//         };
//        res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

router.get('/verify', async (req, res) => {
    const token = req.cookies['token'];
    if(!token) 
    {return res.status(401).send("unauthorized");}
    try{
        const payload = jwt.verify(token, secretkey) as jwt.JwtPayload;
        res.status(200).json(payload);
    }catch(error){
        if(error instanceof jwt.TokenExpiredError){
            res.status(401).send("Token expired. Log in again");
        }else if (error instanceof jwt.JsonWebTokenError){
            res.status(401).send("Invalid token. Log in again");}
            else{ 
            res.status(400).send("Bad request");
    }
    }
});

export default router;