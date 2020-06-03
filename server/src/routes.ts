'use-strict'

import express from 'express';

import PoinstController from './controllers/PoinstController';
import ItemsController from './controllers/ItemsController';

const pointsController = new PoinstController();
const itemsController = new ItemsController();

const routes = express.Router();

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create)
routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)

export default routes;