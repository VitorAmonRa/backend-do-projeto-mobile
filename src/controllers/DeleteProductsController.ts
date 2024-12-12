import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteProductsService } from "../services/DeleteProductsService"


class DeleteProductsController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { id } = request.query as {id: string}
        const deleteProduct = new DeleteProductsService();

        const products = await deleteProduct.execute({id});

        reply.send(products)
    }
}

export { DeleteProductsController }