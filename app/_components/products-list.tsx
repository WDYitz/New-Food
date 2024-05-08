import { Prisma } from "@prisma/client";
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
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto px-5 md:px-0 [&::-webkit-scrollbar]:hidden lg:flex-wrap">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
