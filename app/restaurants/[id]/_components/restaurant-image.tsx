"use client";
import { Button } from "@/app/_components/ui/button";
import { isRestaurantFavorite } from "@/app/_helpers/restaurant";
import { useFavoriteRestaurant } from "@/app/_hooks/useFavoriteRestaurant";
import { cn } from "@/app/_lib/utils";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type RestaurantImageProps = {
  restaurant: Pick<Restaurant, "id" | "name" | "imageUrl">;
  userFavoriteRestaurants: UserFavoriteRestaurant[];
  className?: string;
};

const RestaurantImage = ({
  restaurant,
  userFavoriteRestaurants,
  className,
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
    <div className={cn("relative h-[368px] w-full md:min-h-full", className)}>
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        sizes="100%"
        className="object-cover md:rounded-lg"
      />

      <Button
        className="absolute left-2 top-2 rounded-full bg-white text-foreground hover:text-white md:hidden"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        className={`absolute right-4 top-4 rounded-full bg-gray-700 ${isFavorite && "bg-primary"} lg:h-12 lg:w-12`}
        onClick={handleFavoriteClick}
      >
        <HeartIcon size={16} className="fill-white" />
      </Button>
    </div>
  );
};

export default RestaurantImage;
