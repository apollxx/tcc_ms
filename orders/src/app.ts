import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler } from '@apollxx_tcc/common';

import { newOrderRouter } from './routes/new';
import { indexOrderUserRouter } from './routes/indexUser';
import { updateOrderRouter } from './routes/update';
import { showOrderUserRouter } from './routes/showProvider';
import { orderUpdateCompleted } from './routes/updateCompleted';

const app = express();
app.set('trust proxy', true)
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false
    })
)

app.use([newOrderRouter, indexOrderUserRouter, updateOrderRouter, showOrderUserRouter, orderUpdateCompleted])

app.all("*", async () => {
    throw new NotFoundError;
});

app.use(errorHandler);

export { app }