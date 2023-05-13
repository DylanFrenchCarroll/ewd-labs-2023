import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './src/movies/index.js';
import genreRouter from './src/genres/index.js';
import createAccountsRouter from './src/accounts/routes/index.js';
import buildDependencies from "./src/config/dependencies.js";

dotenv.config();

const app = express();

const port = process.env.PORT;
app.use(express.json());
const dependencies = buildDependencies();

app.use('/api/accounts', createAccountsRouter(dependencies));

app.use('/api/movies', moviesRouter);

app.use('/api/genres', genreRouter);
app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
