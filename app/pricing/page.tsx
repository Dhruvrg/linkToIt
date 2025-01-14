"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Check, ChevronLeft, LinkIcon, Zap, Star } from "lucide-react";
import { plans } from "@/constants";
import Link from "next/link";
import { motion } from "framer-motion";
import RazorpayButton from "@/components/RazorpayButton";

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#9b7bf7]/10 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-[#9b7bf7] p-1 rounded-full">
              <LinkIcon className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#9b7bf7]">LinkToIt</span>
          </Link>
          <Link href="/">
            <Button
              variant="outline"
              className="text-[#9b7bf7] font-semibold border-[#9b7bf7] hover:bg-[#9b7bf7] hover:text-white transition-colors duration-300"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Return to Home
            </Button>
          </Link>
        </div>

        <div className="text-center pt-6" ref={targetRef}>
          <h2 className="text-4xl font-extrabold text-[#9b7bf7] sm:text-5xl mb-4">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock the full potential of your links with our flexible pricing
            options
          </p>
        </div>

        <div className="mt-12 flex justify-center items-center space-x-4">
          <span className="text-sm font-medium text-muted-foreground">
            Monthly
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="bg-[#9b7bf7]"
          />
          <span className="text-sm font-medium text-muted-foreground">
            Yearly
          </span>
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#9b7bf7] text-white">
            Save 20%
          </span>
        </div>

        <div className="mt-16 space-y-4 sm:mt-20 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`flex flex-col h-full ${
                  plan.popular
                    ? "border-[#9b7bf7] shadow-lg shadow-[#9b7bf7]/20 scale-105 relative overflow-visible"
                    : "hover:border-[#9b7bf7] hover:shadow-md"
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#9b7bf7] text-white px-4 py-1 rounded-bl-lg font-semibold text-sm shadow-md transform translate-x-2 -translate-y-2">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-[#9b7bf7] flex items-center">
                    {plan.popular && (
                      <Star className="h-5 w-5 mr-2 text-yellow-400" />
                    )}
                    {plan.name}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mt-4 flex items-baseline text-6xl font-extrabold text-[#9b7bf7]">
                    ₹{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    <span className="ml-1 text-2xl font-medium text-muted-foreground">
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>
                  {isYearly && (
                    <p className="mt-2 text-sm text-[#9b7bf7] font-medium">
                      Save 20% with annual billing
                    </p>
                  )}
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <div className="flex-shrink-0">
                          <Check className="h-5 w-5 text-[#9b7bf7]" />
                        </div>
                        <p className="ml-3 text-sm text-muted-foreground">
                          {feature}
                        </p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <RazorpayButton
                    currency={"INR"}
                    amount={isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    popular={plan.popular}
                  />
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-[#9b7bf7] mb-4">
            All Plans Include
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: <Zap className="h-6 w-6 text-[#9b7bf7]" />,
                text: "Real-time Analytics",
              },
              {
                icon: <Zap className="h-6 w-6 text-[#9b7bf7]" />,
                text: "Custom Short Links",
              },
              {
                icon: <Zap className="h-6 w-6 text-[#9b7bf7]" />,
                text: "24/7 Customer Support",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {item.icon}
                <p className="mt-4 text-sm font-medium text-muted-foreground">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
