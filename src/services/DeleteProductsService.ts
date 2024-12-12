import prismaClient from "../prisma";

interface DeleteProdutcs{
    id:string
}

class DeleteProductsService{
    async execute({id}: DeleteProdutcs){

        if(!id){
            throw new Error("Solicitação invalida")
        }

        const findProduct = await prismaClient.products.findFirst({
            where:{
                id: id
            }
        });

        if(!findProduct){
            throw new Error(" Produto não encontrado ")
        }

        await prismaClient.products.delete({
            where: {
                id: findProduct.id
            }
        })

        return { message: " Deletado com sucesso "}
    }
}

export { DeleteProductsService }