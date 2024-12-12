import { FastifyRequest, FastifyReply } from "fastify";
import { CreateProductsService } from "../services/CreateProductsService"

export interface DataProps{
    name: string,
    validate: string,
    amount: string,
    price: string,
}

class CreateProductsController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { name, validate, amount, price } = request.body as DataProps

        const create = new CreateProductsService()

        const products = await create.execute({name, validate, amount, price})

        reply.send(products)
    }
}

export { CreateProductsController }