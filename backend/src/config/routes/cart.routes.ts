import { Router } from 'express';
import { addToCart } from '../../factories/controllers/cart.controller';

const router = Router();

router.post('/cotizar', addToCart);

export default router;
