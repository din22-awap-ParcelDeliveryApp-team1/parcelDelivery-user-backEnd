import connection from '../dataBase';
import { RowDataPacket } from 'mysql2';
import Parcel from '../types/parcel';

const parcel = {
    // Get parcels where sender is the logged in user
    getSentParcels: async (userid: number) => {
        try {
            const query = `SELECT * FROM parcel JOIN user ON parcel.id_user=user.id_user WHERE user.id_user = ?`;
            const result = await connection.promise().query<RowDataPacket[]>(query, [userid]);

            return result[0];
        }
        catch (e: any) {
            console.error(e.message);
            return `Error from parcel model: ${e.message}`;
        }
    },
    // Get parcels where receiver is the logged in user
    getRecievedParcels: async (userid: number) => {
        try {
            // first get the user telephonenumber from the user table
            const numberQuery = `SELECT telephone FROM user WHERE id_user = ?`;
            const resultNumber: any = await connection.promise().query(numberQuery, [userid]);          
            
            // then get the parcels where the reciever has the user telephonenumber
            const query = `SELECT * FROM parcel WHERE reciever_telephone = ?`;
            const result = await connection.promise().query<RowDataPacket[]>(query, [resultNumber[0][0].telephone]);
            
            return result[0];
        }
        catch (e: any) {
            console.error(e.message);
            return `Error from parcel model: ${e.message}`;
        }
    },
//Post information of a new parcel to the database
    postParcel: async (parcel: Parcel) => {
        try {
            // Generate a random 4 digit pin code
            const code = Math.floor(1000 + Math.random() * 9000); 
            parcel.pin_code = code; 
            parcel.status = 'ready_to_deliver';
            const query = `INSERT INTO parcel SET ?`;
            const result = await connection.promise().query(query, [parcel]);
            return result
        }
        catch (e: any) {
            console.error(e.message);
            return `Error from parcel model: ${e.message}`;
        }
    },

}

export default parcel;
