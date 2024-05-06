"use client";
import { Button } from "@/app/_components/ui/button";
import { isRestaurantFavorite } from "@/app/_helpers/restaurant";
import { useFavoriteRestaurant } from "@/app/_hooks/useFavoriteRestaurant";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type RestaurantImageProps = {
  restaurant: Pick<Restaurant, "id" | "name" | "imageUrl">;
  userFavoriteRestaurants: UserFavoriteRestaurant[];
};

const RestaurantImage = ({
  restaurant,
  userFavoriteRestaurants,
}: RestaurantImageProps) => {
  const { data } = useSession();

  const router = useRouter();

  const isFavorite = isRestaurantFavorite(
    restaurant.id,
    userFavoriteRestaurants,
  );

  const { handleFavoriteClick } = useFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId: data?.user.id,
    restaurantIsFavorite: isFavorite,
  });

  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[368px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        sizes="100%"
        className="object-cover"
      />

      <Button
        className="absolute left-2 top-2 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        className={`absolute right-4 top-4 rounded-full bg-gray-700 ${isFavorite && "bg-primary"}`}
        onClick={handleFavoriteClick}
      >
        <HeartIcon size={16} className="fill-white" />
      </Button>
    </div>
  );
};

export default RestaurantImage;
