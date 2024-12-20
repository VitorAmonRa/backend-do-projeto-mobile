import { FastifyRequest, FastifyReply } from "fastify";
import { CreateProductsService } from "../services/CreateProductsService";

export interface DataProps {
    name: string;
    validate: string;
    amount: string;
    price: string;
}

// Função para converter a data para o formato ISO
function convertDateToISO(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `20${year}-${month}-${day}`;
}

class CreateProductsController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { name, validate, amount, price } = request.body as DataProps;

        // Converte a data para o formato ISO
        const formattedDate = convertDateToISO(validate);

        // Criação do serviço de produto
        const create = new CreateProductsService();

        // Passa os dados para o serviço, incluindo a data convertida
        const product = await create.execute({
            name,
            validate: formattedDate, // Data convertida
            amount,
            price,
        });

        reply.send(product);
    }
}

export { CreateProductsController };
