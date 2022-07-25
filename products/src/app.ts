import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler } from '@apollxx_tcc/common';

import { newProductRouter } from './routes/new';
import { indexProductProviderRouter } from './routes/indexProvider';
import { showProductRouter } from './routes/show';

const app = express();
app.set('trust proxy', true)
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false
    })
)

app.use([newProductRouter, indexProductProviderRouter, showProductRouter])

app.all("*", async () => {
    throw new NotFoundError;
});

app.use(errorHandler);

export { app }