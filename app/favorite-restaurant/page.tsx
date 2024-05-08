import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";

const MyFavoriteRestaurant = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <Header />
      <div className="px-5 py-6 md:px-20">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>
        <div className="flex flex-col gap-6 md:grid md:grid-cols-3">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="w-full min-w-full"
                userFavoriteRestaurant={userFavoriteRestaurants}
              />
            ))
          ) : (
            <h3 className="font-mmedium">
              Você ainda não marcou nenhum restaurante como favorito.
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavoriteRestaurant;
