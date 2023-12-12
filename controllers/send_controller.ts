import express from 'express';
import sendParcel from '../models/send_model';

const router = express.Router();

// Post information of a new parcel to the database
router.post('/newParcel', async (req, res) => {
    const newParcel = req.body;
    // Convert date strings to Date objects
        newParcel.parcel_dropoff_date = new Date(newParcel.parcel_dropoff_date);
        newParcel.parcel_readyforpickup_date = new Date(newParcel.parcel_readyforpickup_date);
        newParcel.parcel_pickup_date = new Date(newParcel.parcel_pickup_date);
        newParcel.parcel_last_pickup_date = new Date(newParcel.parcel_last_pickup_date);
    try {
        const result = await sendParcel.postParcel(newParcel);
        res.status(200).json(result);
    }
    catch (e: any) {
        console.error(e.message);
        res.status(500).send("Server error from parcel controller");
    }
});

export default router;