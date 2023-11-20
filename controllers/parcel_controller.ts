import express from 'express';
import parcel from '../models/parcel_model';

const router = express.Router();


// Get parcels sent by the logged in user
router.get('/sent/:id', async (req, res) => {
    const userid = parseInt(req.params.id);
    
    try {
        const sentParcels = await parcel.getSentParcels(userid);
        res.status(200).json(sentParcels);
    }
    catch (e: any) {
        console.error(e.message);
        res.status(500).send("Server error from parcel controller");
    }
});

// Get parcels received by the logged in user
router.get('/received/:id', async (req, res) => {
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

// Post information of a new parcel to the database
router.post('/parcel', async (req, res) => {
    const newParcel = req.body;
    try {
        const result = await parcel.postParcel(newParcel);
        res.status(200).json(result);
    }
    catch (e: any) {
        console.error(e.message);
        res.status(500).send("Server error from parcel controller");
    }
});

export default router;