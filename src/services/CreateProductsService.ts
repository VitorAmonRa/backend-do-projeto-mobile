import PrismaClient from "../prisma";
import { DataProps } from "../controllers/CreateProductsController";
import prisma from "../prisma";
import cron from 'node-cron';

const calculateDiscount = (expiryDate: string, originalPrice: string): string => {
    const today = new Date();
    const [day, month, year] = expiryDate.split('/');
    
    if (!day || !month || !year) {
        throw new Error("Invalid expiry date format");
    }

    const productExpiry = new Date(Number(`20${year}`), Number(month) - 1, Number(day));
    
    console.log(`Today: ${today}`);
    console.log(`Expiry Date: ${productExpiry}`);
    
    const timeDifference = productExpiry.getTime() - today.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);
    
    console.log(`Day Difference: ${dayDifference}`);
    
    // Remove "R$" and replace comma with dot
    const cleanedPrice = originalPrice.replace('R$', '').replace(',', '.').trim();
    const priceNumber = parseFloat(cleanedPrice);
    console.log(`Original Price: ${originalPrice}`);
    console.log(`Cleaned Price: ${cleanedPrice}`);
    console.log(`Parsed Price: ${priceNumber}`);
    
    if (isNaN(priceNumber)) {
        throw new Error("Invalid price format");
    }

    // Calculate discount percentage based on days remaining
    let discountPercentage = 0;
    if (dayDifference <= 15) {
        discountPercentage = 10 + (15 - dayDifference) * 2; // Example: 10% base + 2% per day closer to expiry
    }

    const discountedPrice = priceNumber * (1 - discountPercentage / 100);
    return discountedPrice.toFixed(2);
};

class CreateProductsService {
    async execute({ name, validate, amount, price, category }: DataProps) {
        console.log(`Name: ${name}`);
        console.log(`Validate: ${validate}`);
        console.log(`Amount: ${amount}`);
        console.log(`Price: ${price}`);

        const discountedPrice = calculateDiscount(validate, price);

        const product = await prisma.products.create({
            data: {
                name,
                validate,
                amount,
                price,
                discountedPrice,
                category
            }
        });

        return {
            ...product,
            discountedPrice,
        };
    }

    // Método para atualizar preços com desconto
    async updateDiscountedPrices() {
        console.log('Atualizando preços com desconto...');

        const products = await prisma.products.findMany();

        for (const product of products) {
            const discountedPrice = calculateDiscount(product.validate, product.price);
            await prisma.products.update({
                where: { id: product.id },
                data: { discountedPrice },
            });
        }

        console.log('Preços com desconto atualizados.');
    }
}

// Agendar a tarefa para rodar todos os dias à meia-noite
const createProductsService = new CreateProductsService();
cron.schedule('0 0 * * *', () => {
    createProductsService.updateDiscountedPrices();
});

export { CreateProductsService };