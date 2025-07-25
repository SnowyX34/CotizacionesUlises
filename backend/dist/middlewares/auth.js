"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Acceso denegado." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'ulisesfloresmtz');
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Ocurrio un error" });
        return;
    }
};
exports.verifyToken = verifyToken;
