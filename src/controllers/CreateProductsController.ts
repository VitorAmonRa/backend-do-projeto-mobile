import { FastifyRequest, FastifyReply } from "fastify";
import { CreateProductsService } from "../services/CreateProductsService";

export interface DataProps {
    name: string;
    validate: string;
    amount: string;
    price: string;
    category: string
}

class CreateProductsController {
    async handle(request, reply) {
        const { name, validate, amount, price, category } = request.body;

        const createProductsService = new CreateProductsService();
        const product = await createProductsService.execute({ name, validate, amount, price, category });

        return reply.status(201).send(product);
    }
}

export { CreateProductsController };
