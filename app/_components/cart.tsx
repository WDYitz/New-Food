import { OrderStatus } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { createOrder } from "../_actions/order";
import { useCart } from "../_context/cart";
import { formatCurrency } from "../_helpers/price";
import CartItem from "./cart-item";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const Cart = () => {
  const { data } = useSession();
  const [isSubmitingLoading, setIsSubmitingLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { products, subtotalPrice, totalDiscounts, totalPrice, clearCart } =
    useCart();

  const handleFinishOrderClick = async () => {
    if (!data?.user) return;

    const restaurant = products[0].restaurant;

    try {
      setIsSubmitingLoading(true);
      await createOrder({
        subtotalPrice,
        totalDiscounts,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data?.user.id },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      
      });
      clearCart();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitingLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-full flex-col justify-between py-5">
        {products.length > 0 ? (
          <>
            <div className="space-y-2">
              {products.map((product) => (
                <CartItem key={product.id} cartProduct={product} />
              ))}
            </div>
            <div className="mt-6">
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between pb-2 text-xs">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(subtotalPrice)}</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-t pb-2 pt-2 text-xs">
                    <span className="text-muted-foreground">Entrega</span>

                    {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                      <span className="uppercase text-primary">Grátis</span>
                    ) : (
                      formatCurrency(
                        Number(products?.[0].restaurant.deliveryFee),
                      )
                    )}
                  </div>

                  <div className="flex items-center justify-between border-b pb-2 pt-2 text-xs">
                    <span className="text-muted-foreground">Descontos</span>
                    <span>{formatCurrency(totalDiscounts)}</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 pt-2 text-xs font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                </CardContent>
              </Card>
              <Button
                className="mt-6 w-full font-semibold"
                disabled={isSubmitingLoading}
                onClick={() => setIsConfirmDialogOpen(true)}
              >
                Finalizar Pedido
              </Button>
            </div>
          </>
        ) : (
          <h2 className="text-center font-medium">Sua sacola está vazia.</h2>
        )}
      </div>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar seu pedido. você concorda com os termos e condições
              da nossa plataforma.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isConfirmDialogOpen}>
              {isSubmitingLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleFinishOrderClick}>
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Cart;
