import connection from "../dataBase";
import { RowDataPacket } from 'mysql2';
import crypto from 'crypto';

  const user = {
    // Get all users
    getUsers: async () => {
        try {
            const query = `SELECT * FROM user`;
            const result = await connection.promise().query(query);
            return result
        }
        catch (e: any) {
            console.error(e.message);
            return `Error from user model: ${e.message}`;
        }
    },
    // Get user by id
    getUser: async (userid: number) => {
        try {
            const query = `SELECT * FROM user WHERE id_user = ?`;
            const result = await connection.promise().query(query, [userid]);
            console.log(result);
            return result[0] as any;
        }
        catch (e: any) {
            console.error(e.message);
            return `Error from user model: ${e.message}`;
        }
    }, 

    //1124 new code for checking username
    checkifUserExists: async (userName: string) => {
       try {
        const exist_userName_query = `SELECT user_name FROM user WHERE user_name = ?`;
        const [exist_userName_result] = await connection.promise().query<RowDataPacket[]>(exist_userName_query, [userName]);

        console.log(exist_userName_result.length);
        //console.log(Array.isArray(exist_userName_result));
        console.log(exist_userName_result);

        if(exist_userName_result.length > 0) {
            return true;
         }
            return false
        }
        catch(error) {
            console.error(`Error in checkUsernameExists: ${error as Error}.message`);
            return false;
        }
    },
   
    // Create user
    createUser: async (
        user_name:string, 
        password:string, 
        first_name:string, 
        last_name:string, 
        telephone:string, 
        email:string, 
        street_address:string, 
        postal_code:string, 
        city:string) => {
    
           //1126 check if user name exists
           const isUserExists = await user.checkifUserExists(user_name);
              if(isUserExists){
                throw new Error('Username already exists');
              }
            
              const salt = "ParcelDeliveryApp";
              const hashedPassword = crypto.pbkdf2Sync(password, salt, 10, 20, 'sha512').toString('hex');
        try {
            const query = `INSERT INTO user (
                user_name, password, first_name, last_name, telephone, 
                email, street_address, postal_code, city) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?)`;
            const result = await connection.promise().query(query, [
                user_name, hashedPassword, first_name, last_name, telephone, email, street_address, postal_code, city]);
            
                console.log(user_name);    
                return result[0] as any;
        }
        catch (e: any) {
            console.error(e.message);
            return `Error from user model: ${e.message}`;
        }
    },
    // Update user
    updateUser: async (
        userid: number,
        user_name:string, 
        password:string, 
        first_name:string, 
        last_name:string, 
        telephone:string, 
        email:string, 
        street_address:string, 
        postal_code:string, 
        city:string) => {
        try {
            const salt = "ParcelDeliveryApp";
            const hashedPassword = crypto.pbkdf2Sync(password, salt, 10, 20, 'sha512').toString('hex');

            const query = `UPDATE user SET first_name = ?, last_name=?, email = ?, password = ?, telephone = ?, Street_address = ? WHERE id_user = ?`;
            const result = await connection.promise().query(query, [ hashedPassword, user_name, first_name, last_name, telephone, email, street_address, postal_code, city, userid]);
            return result[0] as any;
        }
        catch (e: any) {
            console.error(e.message);
            return `Error from user model: ${e.message}`;
        }
    },
    // Delete user
    deleteUser: async (userid: number) => {
        try {
            const query = `DELETE FROM user WHERE id_user = ?`;
            const result = await connection.promise().query(query, [userid]);
            return result[0] as any;
        }
        catch (e: any) {
            console.error(e.message);
            return `Error from user model: ${e.message}`;
        }
    },
};

export default user;

