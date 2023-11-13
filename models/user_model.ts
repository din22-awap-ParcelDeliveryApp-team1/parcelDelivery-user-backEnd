import connection from "../dataBase";

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
            return result[0] as any;
        }
        catch (e: any) {
            console.error(e.message);
            return `Error from user model: ${e.message}`;
        }
    },
    // Create user
    createUser: async (name: string, email: string, password: string, phone: string, address: string) => {
        try {
            const query = `INSERT INTO user (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)`;
            const result = await connection.promise().query(query, [name, email, password, phone, address]);
            return result[0] as any;
        }
        catch (e: any) {
            console.error(e.message);
            return `Error from user model: ${e.message}`;
        }
    },
    // Update user
    updateUser: async (userid: number, name: string, email: string, password: string, phone: string, address: string) => {
        try {
            const query = `UPDATE user SET name = ?, email = ?, password = ?, phone = ?, address = ? WHERE id_user = ?`;
            const result = await connection.promise().query(query, [name, email, password, phone, address, userid]);
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

