import { UserFavoriteRestaurant } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";

type useFavoriteRestaurantProps = {
  userId?: string;
  restaurantId: string;
  userFavoriteRestaurants?: UserFavoriteRestaurant[];
  restaurantIsFavorite?: boolean;
};

export const useFavoriteRestaurant = ({
  userId,
  restaurantId,
  restaurantIsFavorite,
}: useFavoriteRestaurantProps) => {
  const { push } = useRouter();

  const handleFavoriteClick = async () => {
    if (!userId) return;
    try {
      await toggleFavoriteRestaurant(userId, restaurantId);
      toast.success(
        restaurantIsFavorite
          ? "Restaurante removido dos favoritos"
          : "Restaurante favoritado!",
        {
          action: {
            label: "Ver Favoritos",
            onClick: () => push("/favorite-restaurant"),
          },
        },
      );
    } catch (error) {
      toast.error("Restaurante já foi favoritado ou ocorre um erro");
    }
  };

  return { handleFavoriteClick };
};
