import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import ProductList from "./_components/products-list";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Search from "./_components/search";
import { Button } from "./_components/ui/button";
import { db } from "./_lib/prisma";

const fetch = async () => {
  const getProducts = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  const getBurguerCategory = await db.category.findFirst({
    where: {
      name: "Hambúrgueres",
    },
  });

  const getPizzaCategory = await db.category.findFirst({
    where: {
      name: "Pizzas",
    },
  });

  const [products, burguerCategory, pizzaCategory] = await Promise.all([
    getProducts,
    getBurguerCategory,
    getPizzaCategory,
  ]);

  return { products, burguerCategory, pizzaCategory };
};

const Home = async () => {
  const { products, burguerCategory, pizzaCategory } = await fetch();

  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Link href={`/categories/${pizzaCategory?.id}/products`}>
          <PromoBanner
            src="/promo-banner.png"
            alt="até 30% de Desconto em pizzas"
          />
        </Link>
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/products/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6">
        <Link href={`/categories/${burguerCategory?.id}/products`}>
          <PromoBanner
            src="/promo-banner2.png"
            alt="a partir de R$ 17,90 em lanches"
          />
        </Link>
      </div>

      <div className="space-y-4 py-6 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurants/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
};

export default Home;
