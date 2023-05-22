/* eslint-disable no-undef */
import dotenv from 'dotenv';
import express from 'express';
import createAccountsRouter from './src/accounts/routes/index.js';
import buildDependencies from "./src/config/dependencies.js";
import createMoviesRouter from './src/movies/routes/index.js';
import createPersonsRouter from './src/persons/routes/index.js';
import createShowsRouter from './src/shows/routes/index.js';
import db from './src/config/db.js';
import errorHandler from './src/utils/ErrorHandler.js';
// import logger from './src/utils/Logger.js';
import rateLimit from 'express-rate-limit';
import helmet from "helmet";

dotenv.config();
db.init();

// Express rate limiting
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 300, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const app = express();
const port = process.env.PORT;
const dependencies = buildDependencies();

app.use(helmet());
app.use(limiter);
app.use(errorHandler);
app.use(express.json());
app.use((req, res, next) => {
//   logger.info(`Received a ${req.method} request for`);
  next();
});


app.use('/api/accounts', createAccountsRouter(dependencies));
app.use('/api/movies', createMoviesRouter(dependencies));
app.use('/api/persons', createPersonsRouter(dependencies));
app.use('/api/shows', createShowsRouter(dependencies));

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
