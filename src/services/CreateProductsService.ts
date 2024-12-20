import PrismaClient from "../prisma";
import { DataProps } from "../controllers/CreateProductsController";

// Função para converter a data para o formato ISO
function convertDateToISO(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `20${year}-${month}-${day}`;
}

class CreateProductsService {
    async execute({ name, validate, amount, price }: DataProps) {
        // Converte a data de validade para o formato ISO
        const formattedDate = convertDateToISO(validate);

        // Criação do produto no banco de dados
        const product = await PrismaClient.products.create({
            data: {
                name,
                validate: formattedDate,  // Data convertida para o formato ISO
                amount,
                price,
            }
        });

        return product;
    }
}

export { CreateProductsService };
