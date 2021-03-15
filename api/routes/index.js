import { Router } from 'express';
import { wrapAsync } from '../middleware';
import auth from './auth';

const router = Router();

router.use('/auth', auth);

router.get(
  '/',
  wrapAsync((_, response) => {
    response.send('ok');
  })
);

export default router;
