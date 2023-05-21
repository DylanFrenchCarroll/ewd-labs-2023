import dotenv from 'dotenv';
import express from 'express';
import createAccountsRouter from './src/accounts/routes/index.js';
import buildDependencies from "./src/config/dependencies.js";
import createMoviesRouter from './src/movies/routes/index.js';
import createPersonsRouter from './src/persons/routes/index.js';
import createShowsRouter from './src/shows/routes/index.js';
import db from './src/config/db.js';
import errorHandler from './src/utils/ErrorHandler.js';

dotenv.config();
db.init();

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT;
const dependencies = buildDependencies();

app.use(errorHandler);
app.use(express.json());

app.use('/api/accounts', createAccountsRouter(dependencies));
app.use('/api/movies', createMoviesRouter(dependencies));
app.use('/api/persons', createPersonsRouter(dependencies));
app.use('/api/shows', createShowsRouter(dependencies));

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
