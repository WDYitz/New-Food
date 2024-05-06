import { OrderStatus } from "@prisma/client";

export const getOrderStatus = (status: OrderStatus) => {
  switch (status) {
    case "CONFIRMED":
      return { label: "Confirmado", color: "bg-green-500 text-white" };
    case "CANCELED":
      return { label: "Cancelado", color: "bg-red-600 text-white" };
    case "PREPARING":
      return { label: "Preparando", color: "bg-amber-500 text-white" };
    case "DELIVERING":
      return { label: "Em Transporte", color: "bg-amber-500 text-white" };
    case "COMPLETED":
      return { label: "Finalizado", color: "bg-gren-600 text-white" };
  }
};
