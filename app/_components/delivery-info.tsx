import { Restaurant } from "@prisma/client";
import { BikeIcon, TimerIcon } from "lucide-react";
import { formatCurrency } from "../_helpers/price";
import { Card } from "./ui/card";

type DeliveryInfoProsp = {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
};

const DeliveryInfo = ({ restaurant }: DeliveryInfoProsp) => {
  return (
    <Card className="mt-6 flex justify-around py-4">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span>Entrega</span>
          <BikeIcon size={14} />
        </div>
        {Number(restaurant.deliveryFee) > 0 ? (
          <p className="text-xs font-semibold">
            {formatCurrency(Number(restaurant.deliveryFee))}
          </p>
        ) : (
          <p className="text-sm font-semibold">Grátis</p>
        )}
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span>Entrega</span>
          <TimerIcon size={14} />
        </div>

        <p className="text-xs font-semibold">
          {restaurant.deliveryTimeMinutes} min
        </p>
      </div>
    </Card>
  );
};

export default DeliveryInfo;
