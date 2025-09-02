import cors from '@koa/cors';
import Koa from 'koa';
import { koaBody } from 'koa-body';
import { corsOrigin, port } from './config.ts';
import { authRouter, searchRouter, stateRouter, userRouter } from './routes/index.ts';

const app = new Koa();

app.use(
  cors({
    allowMethods: ['GET', 'PUT', 'DELETE', 'POST', 'OPTIONS'],
    origin: corsOrigin,
  }),
);
app.use(koaBody());

// Setup api routes
app.use(authRouter.routes());
app.use(userRouter.routes());
app.use(stateRouter.routes());
app.use(stateRouter.routes());
app.use(searchRouter.routes());

app.listen(port, () => console.log(`🚀 Server ready at: http://localhost:${port}`));
