import PrismaClient from "../prisma";
import { DataProps } from "../controllers/CreateProductsController";


class CreateProductsService {
    async execute({ name, validate, amount, price }: DataProps) {

        // Criação do produto no banco de dados
        const product = await PrismaClient.products.create({
            data: {
                name,
                validate,
                amount,
                price,
            }
        });

        return product;
    }
}

export { CreateProductsService };
