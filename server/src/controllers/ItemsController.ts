import { Request, Response } from 'express';
import knex from '../database/connection'

class ItemsController {
    async index(request: Request, response: Response){
        try{
            const items = await knex('items').select('*');

            const serializedItems = items.map(item => {
                return {
                    id: item.id,
                    name: item.title,
                    image_url: `http://localhost:3333/uploads/${item.image}`
                }
            })
        
            return response.json(serializedItems);
        } catch (err) {
            return response.status(401).send({ error: err.message });
        }
    }
}

export default ItemsController;