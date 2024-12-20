import { Router } from 'express';
import { use } from '../shared/utils/errors';
import { login, registerUser } from '../modules/users/user.controller';
const router = Router();

router.post('/register', use(registerUser));
router.post('/login', use(login));

export default router;
