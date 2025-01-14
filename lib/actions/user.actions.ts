"use server";

import { prisma } from "@/prisma";
import getCurrentUser from "./getCurrentUser";
import { subscriptionService } from "../subscriptionService";

type Plan = "Basic" | "Professional" | "Business";
type SubscriptionPeriod = "monthly" | "yearly";

type SubscriptionData = {
  plan: Plan;
  period: SubscriptionPeriod;
  startDate: Date;
  endDate: Date;
};

export async function updateUserOnSubscription(amount: number) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const data: SubscriptionData = await subscriptionService(amount);
    if (!data) return null;

    const userId = currentUser.id;

    await prisma.user.update({
      where: { id: userId },
      data: { planType: data.plan, plan: true },
    });

    await prisma.subscription.upsert({
      where: { userId },
      create: {
        userId,
        ...data,
      },
      update: { ...data },
    });

    return { isOk: true };
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new Error("User not found");
    }
    throw new Error(`Failed to update user details: ${error.message}`);
  }
}
