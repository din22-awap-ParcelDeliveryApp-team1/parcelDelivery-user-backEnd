import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import parcelRouter from './controllers/parcel_controller';
import userRouter from './controllers/user_controller';
import signinRouter from './controllers/signin_controller';
import sendRouter from './controllers/send_controller';
import auth from './passportMiddleware';


dotenv.config();
const PORT = 3001;
export const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/parcel', auth, parcelRouter);
app.use('/user', userRouter);
app.use('/signin', signinRouter);
app.use('/send', sendRouter);

let serverInstance: any = null;
module.exports = {
    start: function () {
        serverInstance = app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    },
    close: function () {
        serverInstance.close();
    }
};

