import {
  signin,
  signout,
} from '#app/controllers/auth.js';
import Router from '@koa/router';

const router = new Router();

router.post('/auth/signin', signin);
router.post('/auth/signout', signout);

export default router;
