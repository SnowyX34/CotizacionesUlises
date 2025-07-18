"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRepository = void 0;
const connection_1 = __importDefault(require("../../config/connection"));
const sequelize_1 = require("sequelize");
class CartRepository {
    async addToCart(user_id, product_id, quantity) {
        const sql = `
      INSERT INTO cart (user_id, product_id, quantity)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE quantity = quantity + ?
    `;
        await connection_1.default.query(sql, {
            replacements: [user_id, product_id, quantity, quantity],
            type: sequelize_1.QueryTypes.INSERT,
        });
    }
}
exports.CartRepository = CartRepository;
