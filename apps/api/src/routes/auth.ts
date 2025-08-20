import {
  signin,
  signout,
} from '#app/controllers/auth.js';
import Router from '@koa/router';

const router = new Router();

router.post('/signin', signin);
router.post('/signout', signout);

export default router;
