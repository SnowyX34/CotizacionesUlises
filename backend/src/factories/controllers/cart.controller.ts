import { Request, Response } from 'express';
import { CartRepository } from '../../infrestructure/repositories/cartRepoImpl';
import { AddToCartDTO } from '../../domain/dto/cart.dto';

const cartRepo = new CartRepository();

export const addToCart = async (req: Request, res: Response) => {
  const data: AddToCartDTO = req.body;
  const { user_id, product_id, quantity } = data;

  try {
    await cartRepo.addToCart(user_id, product_id, quantity);
    res.json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
};
