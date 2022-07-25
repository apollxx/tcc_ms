import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler } from '@apollxx_tcc/common';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { indexProviderRouter } from './routes/indexProvider';
import { showProviderRouter } from './routes/show-provider';

const app = express();
app.set('trust proxy', true)
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false
    })
)

app.use([currentUserRouter, signinRouter, signinRouter, signoutRouter, signupRouter, indexProviderRouter, showProviderRouter]);

app.all("*", async () => {
    throw new NotFoundError;
});

app.use(errorHandler);

export { app }