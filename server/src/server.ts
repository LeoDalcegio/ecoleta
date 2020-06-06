'use-strict'

import express from 'express';
import path from 'path';
import cors from 'cors';
import { errors } from 'celebrate';

import routes from './routes';

const PORT = 3333 || process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(errors());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));