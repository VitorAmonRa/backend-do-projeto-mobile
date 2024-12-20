// src/services/PriceMarkdownService.ts
import PrismaClient from "../prisma";

class PriceMarkdownService {
  async execute() {
    const prisma = PrismaClient;

    // Busca todos os produtos cuja validade está próxima (ex: 7 dias antes)
    const products = await prisma.products.findMany({
      where: {
        validate: {
          lte: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 dias antes do vencimento
        },
      },
    });

    for (const product of products) {
      // Simula a lógica de alto volume de vendas
      const salesCount = await prisma.sales.count({
        where: { productId: product.id },
      });

      // Se houver alto volume de vendas, pula a redução de preço
      if (salesCount > 50) continue;

      // Reduz o preço gradativamente (ex: 10% a cada execução)
      const reducedPrice = Number(product.price) * 0.9;

      // Atualiza o preço do produto no banco
      await prisma.products.update({
        where: { id: product.id },
        data: { price: reducedPrice.toFixed(2) },
      });
    }
  }
}

export { PriceMarkdownService } 
