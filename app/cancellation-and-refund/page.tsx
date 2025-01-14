import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Cancellation and Refund Policy
        </h1>
        <h2 className="text-lg font-semibold text-gray-800 mt-6">
          Refund Policy
        </h2>
        <p className="text-gray-600">
          Subscriptions are non-refundable after payment. Refunds may be
          processed in case of unresolved technical issues.
        </p>
        <h2 className="text-lg font-semibold text-gray-800 mt-6">
          Cancellation Policy
        </h2>
        <p className="text-gray-600">
          You can cancel your subscription at any time, but no refunds will be
          provided for unused portions.
        </p>
      </div>
    </div>
  );
};

export default page;
