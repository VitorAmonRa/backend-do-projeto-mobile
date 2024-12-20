import PrismaClient from "../prisma";
import { DataProps } from "../controllers/CreateProductsController";
import prisma from "../prisma";


const calculateDiscount = (expiryDate: string, originalPrice: string): string => {
    const today = new Date();
    const [day, month, year] = expiryDate.split('/');
    const productExpiry = new Date(Number(`20${year}`), Number(month) - 1, Number(day));
    const timeDifference = productExpiry.getTime() - today.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);
  
    if (dayDifference <= 15) {
      return (parseFloat(originalPrice) * 0.9).toFixed(2); // 10% de desconto
    }
    return originalPrice
  };
  
  class CreateProductsService {
      async execute({ name, validate, amount, price }: DataProps) {
          const discountedPrice = calculateDiscount(validate, price);
  
          const product = await prisma.products.create({
              data: {
                  name,
                  validate,
                  amount,
                  price,
                  discountedPrice,
              }
          });
  
          return product;
      }
  }
  
  export { CreateProductsService };
