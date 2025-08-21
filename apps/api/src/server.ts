import Koa from 'koa';
import { koaBody } from 'koa-body';
import { port } from './config.ts';
import {
  authRouter,
  userRouter,
} from './routes/index.ts';

const app = new Koa();

// Setup api routes
app.use(authRouter.routes());
app.use(userRouter.routes());

app.use(koaBody());

app.listen(port, () => console.log(`🚀 Server ready at: http://localhost:${port}`));
