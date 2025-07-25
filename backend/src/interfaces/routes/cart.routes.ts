import { Router } from 'express';
import { addCart } from '../controllers/cart.controller';

const router = Router();

router.post('/cart', addCart);

export default router;
