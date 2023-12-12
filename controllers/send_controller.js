"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const send_model_1 = __importDefault(require("../models/send_model"));
const router = express_1.default.Router();
// Post information of a new parcel to the database
router.post('/newParcel', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newParcel = req.body;
    // Convert date strings to Date objects
    newParcel.parcel_dropoff_date = new Date(newParcel.parcel_dropoff_date);
    newParcel.parcel_readyforpickup_date = new Date(newParcel.parcel_readyforpickup_date);
    newParcel.parcel_pickup_date = new Date(newParcel.parcel_pickup_date);
    newParcel.parcel_last_pickup_date = new Date(newParcel.parcel_last_pickup_date);
    try {
        const result = yield send_model_1.default.postParcel(newParcel);
        res.status(200).json(result);
    }
    catch (e) {
        console.error(e.message);
        res.status(500).send("Server error from parcel controller");
    }
}));
exports.default = router;
