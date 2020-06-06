'use-strict'

import express from 'express';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const pointsController = new PointsController();
const itemsController = new ItemsController();

import multerConfig from './config/multer'

const routes = express.Router();

const upload = multer(multerConfig);

routes.get('/items', itemsController.index);

routes.post(
    '/points', 
    upload.single('image'), 
    pointsController.create,
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.number().required().max(2),
            uf: Joi.number().required(),
            items: Joi.number().required(),
        })
    }, {
        abortEarly: false
    })
);

routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)

export default routes;