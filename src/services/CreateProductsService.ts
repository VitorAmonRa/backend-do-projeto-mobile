import PrismaClient from "../prisma";
import { DataProps } from "../controllers/CreateProductsController";
import prisma from "../prisma";

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

    if (dayDifference <= 15) {
        return (priceNumber * 0.9).toFixed(2); // 10% de desconto
    }
    return cleanedPrice;
};

class CreateProductsService {
    async execute({ name, validate, amount, price }: DataProps) {
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
            }
        });

        return {
            ...product,
            discountedPrice,
        };
    }
}

export { CreateProductsService };