import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

//Create database connection to mysql
const connection = mysql.createConnection({
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
export default connection;