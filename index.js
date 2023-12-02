"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const parcel_controller_1 = __importDefault(require("./controllers/parcel_controller"));
const user_controller_1 = __importDefault(require("./controllers/user_controller"));
dotenv_1.default.config();
const PORT = 3001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/parcel', parcel_controller_1.default);
app.use('/user', user_controller_1.default);
app.post('/parcel', parcel_controller_1.default);
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
