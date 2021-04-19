import { Router } from 'express';
import { wrapAsync } from '../middleware/index.js';
import auth from './auth/index.js';

const router = Router();

router.use('/auth', auth);

router.get(
  '/',
  wrapAsync((request, response) => {
    response.send('ok');
  })
);

export default router;
