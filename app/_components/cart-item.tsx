import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { CartProduct, useCart } from "../_context/cart";
import {
  calculateProductsWithDiscount,
  formatCurrency,
} from "../_helpers/price";
import { Button } from "./ui/button";

type CartItemProps = {
  cartProduct: CartProduct;
};

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useCart();

  const handleDecreaseQuantityClick = () =>
    decreaseProductQuantity(cartProduct.id);

  const handleIncreaseQuantityClick = () =>
    increaseProductQuantity(cartProduct.id);

  const handleRemovelick = () => removeProductFromCart(cartProduct.id);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h4>
              {formatCurrency(
                calculateProductsWithDiscount(cartProduct) *
                  cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon size={18} />
            </Button>
            <span className="w-4 text-sm">{cartProduct.quantity}</span>
            <Button
              size="icon"
              className="h-8 w-8"
              onClick={handleIncreaseQuantityClick}
            >
              <ChevronRightIcon size={18} />
            </Button>
          </div>
        </div>
      </div>
      <Button
        className="h-8 w-8 border border-solid border-muted-foreground"
        size="icon"
        variant="ghost"
        onClick={handleRemovelick}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
