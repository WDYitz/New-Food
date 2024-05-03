import { useCart } from "../_context/cart";
import { formatCurrency } from "../_helpers/price";
import CartItem from "./cart-item";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const Cart = () => {
  const { products, subtotalPrice, totalDiscount, totalPrice } = useCart();
  return (
    <div className="flex h-full flex-col justify-between py-5">
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

              {Number(products[0].restaurant.deliveryFee) === 0 ? (
                <span className="uppercase text-primary">
                  Grátis
                </span>
              ) : (
                formatCurrency(Number(products[0].restaurant.deliveryFee))
              )}
            </div>

            <div className="flex items-center justify-between border-b pb-2 pt-2 text-xs">
              <span className="text-muted-foreground">Descontos</span>
              <span>{formatCurrency(totalDiscount)}</span>
            </div>

            <div className="flex items-center justify-between pb-2 pt-2 text-xs font-semibold">
              <span>Total</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          </CardContent>
        </Card>
        <Button className="mt-6 w-full font-semibold">Finalizar Pedido</Button>
      </div>
    </div>
  );
};

export default Cart;
