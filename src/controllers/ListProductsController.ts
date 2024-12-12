import { FastifyRequest, FastifyReply } from "fastify";
import { ListProductsService } from "../services/ListProductsService"


class ListProductsController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const listProductsService = new ListProductsService();

        const products = await listProductsService.execute();

        reply.send(products)
    }
}

export { ListProductsController }