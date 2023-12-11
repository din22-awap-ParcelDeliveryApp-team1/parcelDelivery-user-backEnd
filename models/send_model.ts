import connection from '../dataBase';
import Parcel from '../types/parcel';

const sendParcel = {
    //Post information of a new parcel to the database
    postParcel: async (parcel: Parcel) => {
        try {
            // Generate a random 4 digit pin code
            const code = Math.floor(1000 + Math.random() * 9000); 
            parcel.pin_code = code; 
            parcel.status = 'ready_to_deliver';
            const query = `INSERT INTO parcel SET ?`;
            const result = await connection.promise().query(query, [parcel]);
            // Return an object containing the pin code along with other data
            return {
            pin_code: code, 
            };
            }
        catch (e: any) {
            console.error(e.message);
            return `Error from parcel model: ${e.message}`;
        }
    },
};

export default sendParcel;