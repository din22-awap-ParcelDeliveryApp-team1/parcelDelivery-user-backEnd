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
const parcel_model_1 = __importDefault(require("../models/parcel_model"));
const router = express_1.default.Router();
// Get parcels sent by the logged in user
router.get('/sent/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userid = parseInt(req.params.id);
    try {
        const sentParcels = yield parcel_model_1.default.getSentParcels(userid);
        res.status(200).json(sentParcels);
    }
    catch (e) {
        console.error(e.message);
        res.status(500).send("Server error from parcel controller");
    }
}));
// Get parcels received by the logged in user
router.get('/received/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userid = parseInt(req.params.id);
    try {
        const receivedParcels = yield parcel_model_1.default.getRecievedParcels(userid);
        res.status(200).json(receivedParcels);
    }
    catch (e) {
        console.error(e.message);
        res.status(500).send("Server error from parcel controller");
    }
}));
exports.default = router;
