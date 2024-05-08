"use client";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { getOrderStatus } from "@/app/_helpers/order";
import { formatCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type OrderItemProps = {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: true;
    };
  }>;
};

const OrderItem = ({ order }: OrderItemProps) => {
  const { push } = useRouter();

  return (
    <Card className="md:m-0 ">
      <CardContent className="space-y-3 p-5 md:min-h-full">
        <div
          className={`w-fit rounded-full bg-[#EEEEEE] px-2 py-1 text-muted-foreground ${getOrderStatus(order.status).color}`}
        >
          <span className="block text-xs font-semibold">
            {getOrderStatus(order.status).label}
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

          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5"
            onClick={() => push(`/restaurants/${order.restaurant.id}`)}
          >
            <ChevronRightIcon />
          </Button>
        </div>

        <div className="py-1">
          <Separator />
        </div>

        <div className="flex">
          {order.products.map((product) => (
            <div className="flex space-x-2" key={product.id}>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground text-xs text-white">
                {product.quantity}
              </span>
              <span className="text-xs text-muted-foreground">
                {product.id}
              </span>
            </div>
          ))}
        </div>

        <div className="py-1">
          <Separator />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            {formatCurrency(Number(order.totalPrice))}
          </span>
          <Button variant="ghost" className="font-bold text-primary" disabled>
            Adicionar à Sacola
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
