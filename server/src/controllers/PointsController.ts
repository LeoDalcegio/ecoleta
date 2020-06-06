import { Request, Response } from "express";
import knex from "../database/connection";

class PointsController {
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        try{
            const parsedItems = String(items)
                .split(",")
                .map((item) => Number(item.trim()));

            const points = await knex("points")
                .join("point_items", "points.id", "=", "point_items.point_id")
                .whereIn("point_items.item_id", parsedItems)
                .where("city", String(city))
                .where("uf", String(uf))
                .distinct()
                .select("points.*");

            const serializedPoints = points.map(point => {
                return {
                    ...point,
                    image_url: `http://192.168.0.9:3333/uploads/${point.image}`
                }
            })

            return response.json(serializedPoints);
        } catch (err) {
            return response.status(400).send({ error: err.message });
        }
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        try{
            const point = await knex("points").where("id", id).first();

            if (!point) {
                return response.status(400).send({ error: "Point not found" });
            }

            const items = await knex("items")
                .join("point_items", "items.id", "=", "point_items.item_id")
                .where("point_items.point_id", id)
                .select("items.title");

            const serializedPoint = {
                    ...point,
                    image_url: `http://192.168.0.9:3333/uploads/${point.image}`
            }

            console.log(serializedPoint)
            
            return response.json({ point: serializedPoint, items });
        } catch (err) {
            return response.status(400).send({ error: err.message });
        }
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items,
        } = request.body;

        try {
            const trx = await knex.transaction();

            const point = {
                image: request.file.filename,
                name,
                email,
                whatsapp,
                latitude,
                longitude,
                city,
                uf,
            };

            const insertedIds = await trx("points").insert(point);

            const point_id = insertedIds[0];

            const pointItems = items
                .split(',')
                .map((item: string) => Number(item.trim()))
                .map((item_id: number) => {
                return {
                    item_id,
                    point_id: point_id,
                };
            });

            await trx("point_items").insert(pointItems);

            await trx.commit();

            response.json({
                point_id,
                ...point,
            });
        } catch (err) {
            return response.status(400).send({ error: err.message });
        }
    }
}

export default PointsController;