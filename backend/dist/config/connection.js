"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize((_a = process.env.DB_NAME) !== null && _a !== void 0 ? _a : 'sqldb', (_b = process.env.DB_USER) !== null && _b !== void 0 ? _b : 'root', (_c = process.env.DB_PASSWORD) !== null && _c !== void 0 ? _c : '120704', {
    host: (_d = process.env.DB_HOST) !== null && _d !== void 0 ? _d : 'localhost',
    dialect: 'mysql',
    logging: false,
});
exports.default = sequelize;
