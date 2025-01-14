import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Plan = "Basic" | "Professional" | "Business";
type SubscriptionPeriod = "monthly" | "yearly";

export async function subscriptionService(amount: number) {
  let endDate = new Date();
  let plan: Plan = "Basic";
  let period: SubscriptionPeriod = "monthly";

  if (amount === 399) {
    endDate.setMonth(endDate.getMonth() + 1);
  } else if (amount === 3999) {
    period = "yearly";
    endDate.setFullYear(endDate.getFullYear() + 1);
  } else if (amount === 799) {
    plan = "Professional";
    period = "monthly";
    endDate.setMonth(endDate.getMonth() + 1);
  } else if (amount === 7999) {
    plan = "Professional";
    period = "yearly";
    endDate.setFullYear(endDate.getFullYear() + 1);
  } else if (amount === 1199) {
    plan = "Business";
    period = "monthly";
    endDate.setMonth(endDate.getMonth() + 1);
  } else if (amount === 11999) {
    plan = "Business";
    period = "yearly";
    endDate.setFullYear(endDate.getFullYear() + 1);
  } else {
    throw new Error("Invalid amount");
  }

  return {
    plan: plan as Plan,
    period: period as SubscriptionPeriod,
    startDate: new Date(),
    endDate: endDate,
  };
}
