import { getUser, getUsers } from '#app/controllers/users.js';
import Router from '@koa/router';

const router = new Router();

router.get('/users', getUsers);
router.get('/users/:username', getUser);

export default router;
