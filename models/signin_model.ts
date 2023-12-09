import connection from "../dataBase";
import { RowDataPacket } from "mysql2";
interface User {
    id_user: number;
    user_name: string;
    password: string;
}

const signin_model = {
    //check if user exists
    checkifUserExists: async (user_name: string) => {
        try {
            const exist_userName_query = `SELECT * FROM user WHERE user_name = ?`;
            const [exist_userName_result] = await connection.promise().query<RowDataPacket[]>(exist_userName_query, [user_name]);

            if (exist_userName_result.length > 0) {
                return exist_userName_result[0];// Return the user object
            }
            return null;
        }
        catch (error) {
            console.error(`Error in checkUsernameExists: ${error as Error}.message`);
            return null;
        }
    },
}

export default signin_model;