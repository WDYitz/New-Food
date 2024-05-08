import { Prisma } from "@prisma/client";
import { cn } from "../_lib/utils";
import ProductItem from "./product-item";

type ProductListProps = {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
  className?: string;
};

const ProductList = ({ products, className }: ProductListProps) => {
  return (
    <div
      className={cn(
        "flex gap-4 overflow-x-auto px-5 md:px-0 [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
