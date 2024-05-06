"use server"

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  await db.order.create({ data });
  revalidatePath("/orders");
}