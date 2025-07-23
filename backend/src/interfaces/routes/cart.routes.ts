import { Router } from 'express';
import { addCart, deleteCart, getAllProducts, updateCart } from '../controllers/cart.controller';

const router = Router();

router.post('/addCart', addCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);
router.get('/', getAllProducts);
export default router;
