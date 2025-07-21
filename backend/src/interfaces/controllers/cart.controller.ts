import { Request, Response } from 'express';
import { CartRepository } from '../../infrestructure/repositories/cartRepoImpl'; 
import { AddToCartDTO } from '../../domain/dto/cart.dto';
import { Cart } from '../../infrestructure/orm/models/cart.model';

export const addCart = async (req: Request, res: Response) => {
  const { cart_id, user_id, product_id, model, height,width, quantity, precio_total } = req.body;
  if (!cart_id || !user_id || !product_id ||!model || !height || !width || !quantity || precio_total == null) {
    res.status(400).json({ message: 'Faltan datos' });
    return;
  }

  try {
    const newCart = await CartRepository.create({ 
      cart_id,user_id, product_id, model, height,width, quantity, precio_total
    });
    res.status(201).json({ message: 'Producto agregado', product: newCart }) 
    return;
  } catch (error) {
    console.error('Error al agregar pedido:', error);
    res.status(500).json({ message: 'Error al agregar pedido' });
    return;
  }
  
};
export const updateCart = async (req: Request, res: Response) => {
  const { id } = req.params; // id del registro del carrito
  const { product_id, model, height, width, quantity, precio_total } = req.body;

  try {
    const cartItem = await Cart.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Item no encontrado en el carrito' });
    }

    const updateData = { product_id, model, height, width, quantity, precio_total };

    await cartItem.update(updateData);

    return res.json({ message: 'Carrito actualizado', cartItem });
  } catch (error) {
    console.error('Error al actualizar carrito:', error);
    return res.status(500).json({ message: 'Error interno' });
  }
};


export const deleteCart = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Cart.findByPk(id);

    if (!product) {
      res.status(404).json({ message: 'Producto no encontrado' });
      return;
    }

    await product.destroy();
    res.json({ message: 'Producto eliminado' });
    return;

  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error al eliminar producto' });
    return;
  }
};

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Cart.findAll();
    res.json(products);
    return;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos' });
    return;
  }
};

