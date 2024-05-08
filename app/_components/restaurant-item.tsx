"use client";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";
import { formatCurrency } from "../_helpers/price";
import { cn } from "../_lib/utils";
import { Button } from "./ui/button";

type RestaurantItemProps = {
  restaurant: Restaurant;
  className?: string;
  userFavoriteRestaurant: UserFavoriteRestaurant[];
};

const RestaurantItem = ({
  restaurant,
  className,
  userFavoriteRestaurant,
}: RestaurantItemProps) => {
  const { data } = useSession();

  const isFavorite = userFavoriteRestaurant.some(
    (fav) => fav.restaurantId === restaurant.id,
  );

  const handleFavoriteClick = async () => {
    if (!data?.user.id) return;
    try {
      await toggleFavoriteRestaurant(data.user.id, restaurant.id);
      toast.success(
        isFavorite
          ? "Restaurante removido dos favoritos"
          : "Restaurante favoritado!",
      );
    } catch (error) {
      toast.error("Restaurante já foi favoritado ou ocorre um erro");
    }
  };

  return (
    <div className={cn("min-w-[266px] max-w-[266px]", className)}>
      <div className="space-y-3">
        <div className="relative h-[136px] w-full">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              sizes="100%"
              className="rounded-lg object-cover"
            />
          </Link>

          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary bg-white px-2 py-[2px]">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">5,0</span>
          </div>

          {data?.user.id && (
            <Button
              size="icon"
              className={`absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 ${isFavorite && "bg-primary"} hover:bg-gray-700 lg:h-10 lg:w-10`}
              onClick={handleFavoriteClick}
            >
              <HeartIcon size={16} />
            </Button>
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>
          <div className="flex gap-3">
            <div className="flex gap-1">
              <BikeIcon size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega Gratis"
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <TimerIcon size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground">
                {restaurant?.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
