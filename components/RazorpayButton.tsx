import React from "react";
import { Button } from "./ui/button";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { updateUserOnSubscription } from "@/lib/actions/user.actions";
import { subscriptionService } from "@/lib/subscriptionService";

interface RazorpayButtonProps {
  amount: number;
  currency: string;
  popular: boolean;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayButton: React.FC<RazorpayButtonProps> = ({
  amount,
  currency,
  popular,
}) => {
  const router = useRouter();

  const createOrderId = async () => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.orderId;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  const processPayment = async () => {
    try {
      const orderId: string = await createOrderId();
      const options = {
        key: "rzp_test_JKtb9Hmc2f3zXh",
        amount: amount,
        currency: currency,
        name: "LINKTOIT",
        description: "Link Engagement Tool",
        order_id: orderId,
        handler: async function (response: any) {
          try {
            const data = {
              orderCreationId: orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };

            const verifyResult = await fetch("/api/verify", {
              method: "POST",
              body: JSON.stringify(data),
              headers: { "Content-Type": "application/json" },
            });
            const verifyRes = await verifyResult.json();

            if (verifyRes.isOk) {
              const response = await updateUserOnSubscription(amount);

              if (response?.isOk) {
                router.push("/dashboard");
              } else {
                alert("Failed to update user details.");
              }
            } else {
              alert(verifyRes.message);
            }
          } catch (error) {
            console.error("Error in payment handler:", error);
            alert("There was an error processing your payment.");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        alert(response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Button
        onClick={processPayment}
        className={`w-full ${
          popular
            ? "bg-[#9b7bf7] hover:bg-[#8a6ae6] text-white"
            : "bg-white text-[#9b7bf7] border-[#9b7bf7] hover:bg-[#9b7bf7] hover:text-white"
        } transition-colors duration-300`}
        variant={popular ? "default" : "outline"}
      >
        Get started
      </Button>
    </>
  );
};

export default RazorpayButton;
