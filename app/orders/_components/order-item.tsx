"use client";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";

type OrderItemProps = {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: true;
    };
  }>;
};

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "CONFIRMED":
      return "Confirmado";
    case "CANCELED":
      return "Cancelado";
    case "PREPARING":
      return "Preparando";
    case "DELIVERING":
      return "Em Transporte";
    case "COMPLETED":
      return "Entregue";
    default:
      break;
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <div className="w-fit rounded-full bg-[#EEEEEE] px-2 py-1 text-muted-foreground">
          <span className="block text-xs font-semibold">
            {getOrderStatusLabel(order.status)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>
            <span className="text-xs font-semibold">
              {order.restaurant.name}
            </span>
          </div>

          <Button variant="ghost" size="icon" className="h-5 w-5">
            <ChevronRightIcon />
          </Button>
        </div>
        
        <div className="py-3">
          <Separator />
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
