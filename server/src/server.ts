'use-strict'

import express from 'express';
import path from 'path';

import routes from './routes';

const PORT = 3333 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));