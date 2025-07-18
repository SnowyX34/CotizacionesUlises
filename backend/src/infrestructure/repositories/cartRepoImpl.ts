import connect from '../../config/connection';
import { QueryTypes } from 'sequelize';

export class CartRepository {
  async addToCart(user_id: number, product_id: number, quantity: number) {
    const sql = `
      INSERT INTO cart (user_id, product_id, quantity)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE quantity = quantity + ?
    `;

    await connect.query(sql, {
      replacements: [user_id, product_id, quantity, quantity],
      type: QueryTypes.INSERT,
    });
  }
}
