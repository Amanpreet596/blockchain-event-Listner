import { Router } from 'express';
import { setWallet } from '../controller/AppController.js';
import { wallet_validator } from '../middleware/validator.js';

const router = Router();

router.post('/set-wallet', wallet_validator, setWallet);

export default router;