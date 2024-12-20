import { FastifyRequest, FastifyReply } from "fastify";
import { CreateProductsService } from "../services/CreateProductsService";

export interface DataProps {
    name: string;
    validate: string;
    amount: string;
    price: string;
}

class CreateProductsController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { name, validate, amount, price } = request.body as DataProps;

        console.log("Dados recebidos no backend:", { name, validate, amount, price });

        const create = new CreateProductsService();
        try {
            const products = await create.execute({ name, validate, amount, price });
            reply.send(products);
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            reply.status(400).send({ error: "Erro ao criar produto" });
        }
    }
}

export { CreateProductsController };
