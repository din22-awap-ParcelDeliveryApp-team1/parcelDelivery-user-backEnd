import connection from "../dataBase";
import { RowDataPacket } from "mysql2";
//import user from "./user_model";

interface User {
    id_user: number;
    user_name: string;
    password: string;
}

/* async function checkifUserExists(userName: string) {
    const query = `SELECT * FROM user WHERE user_name = ?`;
    const result = await connection.promise().query(query, [userName]);
    console.log(result);
    return result.length > 0;
}

async function getUserPwd(userName: string) {
    const query = `SELECT password FROM user WHERE user_name = ?`;
    const result = (await connection.promise().query(query, [userName])) as any[];
    //const result = await connection.promise().query(query, [userName]);
    if (result.length === 0) {
        throw new Error(`User ${userName} password not found`);
    }
    return result[0].password;
}

const signin_model = async(userName: string, password: string) => {
    let rightuser = await checkifUserExists(userName);
    if(rightuser) {
        const userPwd = await getUserPwd(userName);
        const ifmatch = await userPwd === password;
        if(ifmatch) {
            const userDttail =  `SELECT * FROM user WHERE user_name = ? AND password = ?`;
            return userDttail;
        } else {
            throw new Error(`Username or password not match`);
        }
    }else {
        throw new Error(`Username or password not match`);
    }
}

export default signin_model; */
/* http://localhost:3001/user/signin */

const signin_model = {
//1126 new code
/* async signin(userName: string, password: string): Promise<User | null>  {
try {
    // Check if the username and password combination exists
    const query = `SELECT * FROM user WHERE user_name = ? AND password = ?`;
    const [userPwdresult] = await connection.promise().query(query, [userName, password]);
     // If userPwdresult has at least one row, it means the combination exists
     if (Array.isArray(userPwdresult) && userPwdresult.length > 0) {
        return userPwdresult[0] as User;
    } else {
        return null; // Return null if the combination does not exist
    }
    }catch (error) {
    console.error(`Error in login: ${error as Error}.message`);
    return null;
}
}, */

//1124 new code
  async checkifUserExists(userName: string,){
    try {
        const exist_userName_query = `SELECT * FROM user WHERE user_name = ?`;
        const exist_userName_result = await connection.promise().query(exist_userName_query, [userName]);
        return exist_userName_result.length > 0;
    }catch(error) {
        console.error(`Error in checkUsernameExists: ${error as Error}.message`);
        return false;
    }

}, 


    //old code
/* async checkifUserExists(userName: string){
    const query = `SELECT * FROM user WHERE user_name = ?`;	
    const [rows] = await connection.promise().query(query, [userName]);
    if (!Array.isArray(rows) || rows.length === 0) {
        return null;
    }
    console.log(userName);
    return rows[0] as User; 
}, */

async getUserPwd(userName: any) {
    const query = `SELECT password FROM user WHERE user_name = ?`;
    const [rows] = await connection.promise().query(query, [userName]);
    if (!Array.isArray(rows) || rows.length === 0) {
        return null;
    }
    const user = rows[0] as { password: string }; // Cast to the expected type
    console.log(user.password)
    return user.password;
},
 
//1126 commet out
async getLoginUser(userName: string, password: string) {
    //1124
    const userExists = await this.checkifUserExists(userName);
    if (!userExists) {
        return null;
    }
    const userPwd = await this.getUserPwd(userName);
    if (!userPwd || userPwd !== password) {
        return null;
    }
    const query = `SELECT * FROM user WHERE user_name = ? AND password = ?`;
    const [userPwdresult] = await connection.promise().query(query, [userName, password]);
    if (!Array.isArray(userPwdresult) || userPwdresult.length === 0) {
        return null;
    }
    //old code has error at controller
    //const query = `SELECT * FROM user WHERE user_name = ? AND password = ?`;
    //const result = await connection.promise().query(query, [userName, password]);
    //return result[0];
    return userPwdresult[0];
} 
};

export default signin_model;