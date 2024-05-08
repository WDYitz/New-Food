import DeliveryInfo from "@/app/_components/delivery-info";
import Header from "@/app/_components/header";
import ProductList from "@/app/_components/products-list";
import { db } from "@/app/_lib/prisma";
import { StarIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";
import CartBanner from "./_components/cart-banner";
import RestaurantImage from "./_components/restaurant-image";

type RestaurantPageProps = {
  params: { id: string };
};

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  const session = await getServerSession();
  const userFavoriteRestaurant = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <>
      <Header />
      <div className="md:grid md:grid-cols-4 md:grid-rows-6 md:gap-4 md:px-20">
        <RestaurantImage
          restaurant={restaurant}
          userFavoriteRestaurants={userFavoriteRestaurant}
          className="md:col-span-2 md:row-span-2"
        />

        {/* TITULO E PREÇO */}
        <div className="md:col-span-2 md:row-span-2 md:flex md:flex-col">
          <div className="relative z-50 mt-[-1.5rem] flex items-center justify-between rounded-tl-[25px] rounded-tr-[25px] bg-white px-5 pt-5 md:rounded-none">
            <div className="flex items-center gap-[0.735rem]">
              <div className="relative h-8 w-8">
                <Image
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  fill
                  sizes="100%"
                  className="rounded-full object-cover"
                />
              </div>
              <h1 className="text-xl font-semibold">{restaurant.name}</h1>
            </div>

            <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
              <StarIcon size={12} className="fill-yellow-500 text-yellow-400" />
              <span className="text-sm font-semibold">5.0</span>
            </div>
          </div>

          <div className="px-5">
            <DeliveryInfo restaurant={restaurant} />
          </div>

          <div className="mt-3 flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden md:flex-wrap">
            {restaurant.categories.map((category) => (
              <div
                key={category.id}
                className="min-w-[167px] rounded-lg bg-[#f4f4f4] text-center"
              >
                <span className="text-xs text-muted-foreground">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-4 md:col-span-4 md:row-span-1">
          {/* TODO!! MOSTRAR PRODUTOS MAIS PEDIDOS*/}
          <h2 className="px-5 font-semibold md:px-0">Mais Pedidos</h2>
          <ProductList products={restaurant.products} />
        </div>

        {restaurant.categories.map((category) => (
          <div className="mt-6 space-y-4 md:col-span-4 md:row-span-1" key={category.id}>
            {/* TODO!! MOSTRAR PRODUCTOS MAIS PEDIDOS*/}
            <h2 className="px-5 font-semibold md:px-0">{category.name}</h2>
            <ProductList products={category.products} />
          </div>
        ))}

        <CartBanner restaurant={restaurant} />
      </div>
    </>
  );
};

export default RestaurantPage;
