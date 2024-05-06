import { UserFavoriteRestaurant } from "@prisma/client";

export const isRestaurantFavorite = (
  restaurantId: string,
  userFavoriteRestaurants: UserFavoriteRestaurant[],
) => {
  return userFavoriteRestaurants?.some((fav) => fav.restaurantId === restaurantId);
};
