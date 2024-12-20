import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateProductsController } from './controllers/CreateProductsController'
import { ListProductsController } from './controllers/ListProductsController'
import { DeleteProductsController } from './controllers/DeleteProductsController'
import { AuthUserController } from "./controllers/AuthUserController";
import { PriceMarkdownController } from "./controllers/PriceMarkdownController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    
    fastify.get("/teste", (request: FastifyRequest, reply: FastifyReply) => {
        console.log("ROTA CHAMADA")

        reply.send({ ok: true })
    })

    fastify.get("/products", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListProductsController().handle( request, reply)
    })
    fastify.post("/product", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateProductsController().handle( request, reply)
    })
    fastify.delete("/product", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteProductsController().handle( request, reply)
    })
    fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
        return new AuthUserController().login( request, reply)
    })
    fastify.get("/product/markdown", async (request: FastifyRequest, reply: FastifyReply) => {
        return new PriceMarkdownController().handle( request, reply)
    })
} 
