import { FastifyRequest, FastifyReply } from "fastify";
import { PriceMarkdownService } from "../services/PriceMarkdownService";

class PriceMarkdownController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const service = new PriceMarkdownService();

    try {
      const result = await service.execute();
      return reply.send(result);
    } catch (error) {
      console.error("Erro ao executar markdown de preços:", error);
      return reply.status(500).send({ error: "Erro ao executar markdown de preços." });
    }
  }
}

export { PriceMarkdownController } 
