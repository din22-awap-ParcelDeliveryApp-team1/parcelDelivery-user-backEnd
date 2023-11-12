import express from 'express';
import parcel from '../models/parcel_model';

const router = express.Router();

// Get parcels sent by the logged in user
router.get('/sent/:id', async (req, res) => {
    const userid = parseInt(req.params.id);
    try {
        const sentParcels = await parcel.getSentParcels(userid);
        res.status(200).json(sentParcels);
        console.log(sentParcels[0]);
    }
    catch (e: any) {
        console.error(e.message);
        res.status(500).send("Server error from parcel controller");
    }
});

// Get parcels received by the logged in user
router.get('/recieved/:id', async (req, res) => {
    const userid = parseInt(req.params.id);
    try {
        const receivedParcels = await parcel.getRecievedParcels(userid);
        res.status(200).json(receivedParcels);
    }
    catch (e: any) {
        console.error(e.message);
        res.status(500).send("Server error from parcel controller");
    }
});

export default router;