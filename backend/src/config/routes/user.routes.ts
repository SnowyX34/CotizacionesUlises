import { Router } from 'express';
import { loginUser } from '../../factories/controllers/login.controller';
import { registerUser } from '../../factories/controllers/register.controller';
import { validateLogin, validateUserInput } from '../../middlewares/validateUser';
import { upload } from '../../middlewares/upload.middleware';

const router = Router();

router.post('/login', validateLogin, loginUser);
router.post('/register',upload.single('avatar'),  validateUserInput, registerUser);

export default router;
