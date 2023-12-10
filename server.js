"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const parcel_controller_1 = __importDefault(require("./controllers/parcel_controller"));
const user_controller_1 = __importDefault(require("./controllers/user_controller"));
const signin_controller_1 = __importDefault(require("./controllers/signin_controller"));
const passportMiddleware_1 = __importDefault(require("./passportMiddleware"));
dotenv_1.default.config();
const PORT = 3001;
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use('/parcel', passportMiddleware_1.default, parcel_controller_1.default);
exports.app.use('/user', user_controller_1.default);
exports.app.use('/signin', signin_controller_1.default);
exports.app.post('/parcel', passportMiddleware_1.default, parcel_controller_1.default);
let serverInstance = null;
module.exports = {
    start: function () {
        serverInstance = exports.app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    },
    close: function () {
        serverInstance.close();
    }
};
