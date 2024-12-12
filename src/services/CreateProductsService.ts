import PrismaClient from "../prisma"
import { DataProps } from "../controllers/CreateProductsController"

class CreateProductsService{
    async execute({ name, validate, amount, price }: DataProps){

        const products = await PrismaClient.products.create({
            data: {
                name,
                validate,
                amount,
                price
            }
        })

        return products
    }
}

export { CreateProductsService } 