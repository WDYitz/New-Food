import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Header from "../_components/header";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import OrderItem from "./_components/order-item";

const MyOrdersPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: true,
    },
  });

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="font-semibold">Meus Pedidos</h2>
        
        <div className="space-y-3">
          {orders.map((order) => {
            return <OrderItem key={order.id} order={order} />;
          })}
        </div>
      </div>
    </>
  );
};

export default MyOrdersPage;