import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './src/movies/index.js';
import genreRouter from './src/genres/index.js';
dotenv.config();

const app = express();

const port = process.env.PORT;
app.use(express.json());


app.use('/api/movies', moviesRouter);

app.use('/api/genres', genreRouter);
app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
