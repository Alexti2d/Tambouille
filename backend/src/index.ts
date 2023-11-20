import cors from 'cors';
import express from 'express';
import { ExceptionsHandler } from '~/middlewares/exceptions.handler';
import { UnknownRoutesHandler } from '~/middlewares/unknownRoutes.handler';
import { config } from "dotenv";
import { AuthenticationController } from "~/resources/security/authentication.controller";
import { ArticlesController } from './resources/articles/articles.controller';
config();

/**
 * Create new express app
 */
const app = express();

/**
 * Tell express we want to parse the request body to JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(express.json());

/**
 * Tell express that we want all DNS to access the API
 */
app.use(cors());

/**
 * Authentication stuff
 */
app.use('/login', AuthenticationController);

/**
 * CRUD for articles handled by '/articles'
 */
app.use('/articles', ArticlesController);

/**
 * Return an error for all other routes not supported
 */
app.all('*', UnknownRoutesHandler);

/**
 * Manage errors
 * /!\ this must be the last `app.use`
 */
app.use(ExceptionsHandler);

app.listen(process.env.API_PORT, () => console.log(`Application running on port : ${process.env.API_PORT}`));

export { app };