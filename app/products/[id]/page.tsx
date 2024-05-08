import Header from "@/app/_components/header";
import ProductList from "@/app/_components/products-list";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductDetails from "./_components/product-details";
import ProductImage from "./_components/product-image";

type ProductPageProps = {
  params: {
    id: string;
  };
};

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <>
      <Header className="hidden md:flex" />
      <div className="md:grid-row-3 xlg:px-48 md:grid md:grid-cols-4 md:grid-rows-3 md:gap-6 md:px-20 lg:px-36 lg:grid-cols-5">
        <ProductImage
          product={product}
          className="md:col-span-2 md:row-span-2 md:min-h-full lg:col-span-3"
        />
        <ProductDetails
          product={product}
          complementaryProducts={juices}
          className="md:col-span-2 md:row-span-2 lg:col-span-2"
        />
        <div className="mt-6 hidden space-y-3 px-5 md:col-span-4 md:block md:px-0 lg:grid-cols-subgrid lg:cols-span-3">
          <h3 className="px-5 font-semibold md:px-0">Sucos</h3>
          <ProductList products={juices} />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
