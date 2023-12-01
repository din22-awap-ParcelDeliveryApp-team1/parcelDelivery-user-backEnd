import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import parcelRouter from './controllers/parcel_controller';
import userRouter from './controllers/user_controller';



dotenv.config();
const PORT = 3001;
const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/parcel', parcelRouter);
app.use('/user', userRouter);
app.post('/parcel', parcelRouter);






app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});