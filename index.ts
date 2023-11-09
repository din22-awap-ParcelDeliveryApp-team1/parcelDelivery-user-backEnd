import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();
const PORT = 3001;
const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});