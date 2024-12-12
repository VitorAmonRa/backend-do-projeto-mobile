import prismaClient from "../prisma";

class ListProductsService{
    async execute(){
        const products = await prismaClient.products.findMany();

        return products
    }
}

export { ListProductsService }