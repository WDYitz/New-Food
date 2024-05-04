"use client";
import { Prisma } from "@prisma/client";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { calculateProductsWithDiscount } from "../_helpers/price";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          id: true;
          deliveryFee: true;
          deliveryTimeMinutes: true;
        };
      };
    };
  }> {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  subtotalPrice: number;
  totalPrice: number;
  totalDiscount: number;
  totalQuantity: number;
  addProductToCart: ({
    product,
    quantity,
    emptyCart,
  }: {
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: {
            deliveryFee: true;
          };
        };
      };
    }>;
    quantity: number;
    emptyCart?: boolean;
  }) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

const CartContext = createContext<ICartContext>({
  products: [],
  subtotalPrice: 0,
  totalPrice: 0,
  totalDiscount: 0,
  totalQuantity: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const subtotalPrice = useMemo(() => {
    return (
      products.reduce((acc, product) => {
        return acc + Number(product.price) * product.quantity;
      }, 0) + Number(products?.[0]?.restaurant.deliveryFee)
    );
  }, [products]);

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + calculateProductsWithDiscount(product) * product.quantity;
    }, 0);
  }, [products]);

  const totalQuantity = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
  }, [products]);

  const totalDiscount = subtotalPrice - totalPrice;

  const decreaseProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          if (cartProduct.quantity === 1) {
            return cartProduct;
          }
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }
        return cartProduct;
      }),
    );
  };

  const increaseProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }
        return cartProduct;
      }),
    );
  };

  const addProductToCart = ({
    product,
    quantity,
    emptyCart,
  }: {
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: {
            deliveryFee: true;
          };
        };
      };
    }>;
    quantity: number;
    emptyCart?: boolean;
  }) => {
    if (emptyCart) {
      setProducts([]);
    }

    // VERIFICAR SE O PRODUTA JA ESTA NO CARRINHO
    const isProductAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );
    // SE ELE ESTIVER, AUMENTAR A SUA QUANTIDADE
    if (isProductAlreadyOnCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          }
          return cartProduct;
        }),
      );
    }
    // SE NAO, ADICIONA-LO COM QUANTIDADE RECEBIDA
    setProducts((prev) => [...prev, { ...product, quantity: quantity }]);
  };

  const removeProductFromCart = (productId: string) => {
    return setProducts((prev) =>
      prev.filter((product) => product.id !== productId),
    );
  };

  return (
    <CartContext.Provider
      value={{
        products,
        subtotalPrice,
        totalPrice,
        totalDiscount,
        totalQuantity,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
